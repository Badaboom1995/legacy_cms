import React from 'react';
import { connect } from 'react-redux';
import Stepper from 'components/Stepper/Stepper';
import AddTaskData from 'components/AddTaskData/AddTaskData';
import AddGenerationData from 'components/AddGenerationData/AddGenerationData';
import FinishAddingTask from 'components/FinishAddingTask/FinishAddingTask';

import { addOption } from 'actions/tasks';
import Request from 'helpers/request';
import Tasks from 'helpers/Tasks';
import './content.scss';

class Home extends React.Component {
  state = {
    kind: '',
    generations: [],
  };
  componentDidMount() {
    this.checkTask();
  }
  onChange = (value, name) => {
    this.setState(() => ({ [name]: value }));
    this.props.dispatch(addOption(name, value));
  };
  getTaskObject = () => {
    const { difficulty, name, subject, grade, chapter } = this.props.tasks;
    const taskObject = {
      subject_id: subject.id,
      name: name,
      subject: subject.id.toString(),
      learning_level_id: grade,
      difficulty: difficulty,
      chapter_id: this.props.tasks.chapters.filter(item => {
        return item.name == this.props.tasks.chapter;
      })[0].id,
    };
    console.log(taskObject);
    return taskObject;
  };
  getGenerationData = item => {
    const { answers, rightAnswers } = item;
    const newAnswers = answers.map(item => {
      if (rightAnswers.includes(item)) {
        return {
          name: item,
          value: item,
          right: true,
        };
      } else {
        return {
          name: item,
          value: item,
        };
      }
    });
    const newAnswersObject = newAnswers.reduce((accum, item, index) => {
      return { ...accum, [String.fromCharCode(97 + index)]: item };
    }, {});
    return { variants: newAnswersObject };
  };

  createTask = () => {
    return new Promise((resolve, reject) => {
      const Request = new Tasks();
      const response = Request.createTask(this.getTaskObject());
      response.then(response => {
        resolve(response);
        this.setState(() => ({
          task_id: response.id,
        }));
      });
    });
  };

  createJob = () => {
    // Соединяет задание с генерациями и отправляет на сервер
    this.createTask()
      .then(response => {
        this.props.general.generations.map(item => {
          this.createGeneration(item);
        });
      })
      .then(console.log('this.props.tasks'));
  };

  createGeneration = item => {
    const generation = {
      id: this.state.task_id,
      name: item.text,
      kind: item.kind,
      active: true,
      check_job_id: this.state.task_id,
      data: this.getGenerationData(item),
    };
    console.log(generation);
    const Request = new Tasks();
    Request.createGeneration(generation);
  };

  checkTask = () => {
    const CheckTask = new Tasks();
    CheckTask.getTasks();
    console.log('task state', this.props.tasks);
  };
  checkTasks = () => {
    const CheckTask = new Request();
    CheckTask.send(`http://localhost:3001/b2t/api/v1/teachers/check_jobs`, 'GET');
  };
  setStep = step => {
    this.setState(() => ({ step }));
  };

  render() {
    return (
      <div className="content">
        <div className="content__main">
          <Stepper
            settings={[
              { name: 'Базовые параметры', component: <AddTaskData onChange={this.onChange} /> },
              {
                name: 'Параметры генераций',
                component: (
                  <AddGenerationData
                    kind={this.state.kind}
                    onChange={this.onChange}
                    getGenerationObject={this.getGenerationObject}
                  />
                ),
              },
              { name: 'Завершение', component: <FinishAddingTask /> },
            ]}
            title="Конструктор заданий"
            createJob={this.createJob}
            setStep={this.setStep}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(Home);
