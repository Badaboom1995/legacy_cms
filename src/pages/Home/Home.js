import React from 'react';
import { connect } from 'react-redux';
import Stepper from 'components/Stepper/Stepper';
import AddTaskData from 'components/AddTaskData/AddTaskData';
import AddGenerationData from 'components/AddGenerationData/AddGenerationData';
import Request from 'helpers/request';
import Tasks from 'helpers/Tasks';
import './content.scss';

class Home extends React.Component {
  state = {
    kind: '',
    generations: [],
  };
  onChange = (value, name) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        console.log(this.state);
      },
    );
  };

  getTaskObject = () => {
    const { difficulty, name, subject, grade } = this.state;
    const taskObject = {
      subject_id: subject.id,
      name: name,
      subject: subject.id.toString(),
      learning_level_id: grade,
      difficulty: difficulty,
    };

    return taskObject;
  };
  getGenerationObject = () => {
    const { answers, rightAnswers } = this.props.general;
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
    const Request = new Tasks();
    const response = Request.createTask(this.getTaskObject());
    response.then(response => {
      this.setState(() => ({
        task_id: response.id,
      }));
    });
  };

  createGeneration = () => {
    const generation = {
      id: this.state.task_id,
      name: this.state.text,
      kind: this.state.kind,
      active: true,
      check_job_id: this.state.task_id,
      data: this.getGenerationObject(),
    };
    console.log(generation);
    const Request = new Tasks();
    Request.createGeneration(generation);
  };

  checkTask = () => {
    const CheckTask = new Tasks();
    CheckTask.getTask(this.state.task_id);
  };
  checkTasks = () => {
    const CheckTask = new Request();
    CheckTask.send(`http://localhost:3001/b2t/api/v1/teachers/check_jobs`, 'GET');
  };

  render() {
    return (
      <div className="content">
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
            { name: 'Завершение', component: <p>Посмотрел на результат, отправил.</p> },
          ]}
          title="Конструктор заданий"
        />
        <div>
          <button onClick={this.createTask}>Create Task</button>
          <button onClick={this.createGeneration}>Create Generation</button>
          <button onClick={this.checkTask}>checkTask</button>
          <button onClick={this.checkTasks}>checkTasks</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Home);
