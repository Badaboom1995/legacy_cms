import React from 'react';
import { connect } from 'react-redux';
import Checks from 'helpers/Checks';
import Tasks from 'helpers/Tasks';
import Structure from 'helpers/Structure';
import TextInput from 'components/TextInput/TextInput';
import TasksList from 'components/TasksList/TasksList';
import Select from 'components/Select/Select';
import { getTasks } from 'actions/tasks';
import { addTaskToTest, addOption } from 'actions/checks';
import TaskPreview from 'components/TaskPreview/TaskPreview';
import SelectElement from 'components/SelectElement/SelectElement';

import './create-test.scss';

class CreateTest extends React.Component {
  subjects = { Математика: 1, Русский: 2 };
  difficulty = { Базовый: 1, Продвинутый: 2 };
  type = { 'Самостоятельная работа': 3, 'Контрольная работа': 2 };
  grade = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  state = {
    tasks: [],
    choosedTasksIds: [],
    check: {},
    checkJobs: [],
  };

  componentDidMount() {
    this.getTasks();
    this.props.dispatch(getTasks());
  }

  getTopics = e => {
    const Request = new Structure();
    Request.getTopics().then(response => {
      const topicNames = response.map(item => item.name);
      this.setState(() => ({ elements: topicNames }));
    });
    this.togglePopupVisibility(e);
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
  };
  getTasks = () => {
    const Request = new Tasks();
    Request.getTasks().then(response => {
      this.setState(() => ({ tasks: response }));
      console.log(response);
    });
  };
  deleteTask = () => {
    const Request = new Tasks();
    Request.deleteTask();
  };
  onCustomChange = (value, name, list) => {
    console.log(list, value);
    const Obj = { name: value, id: list[value] };
    this.onChange(Obj, name);
  };
  getNames = obj => {
    return Object.keys(obj);
  };
  updateCheck = () => {
    console.log(this.state.check);
    const Request = new Checks();
    Request.getChecks(this.check_id).then(res => {
      this.setState(() => ({
        check: res[0],
      }));
    });
  };
  getChapters = () => {
    const Request = new Structure();
    return Request.getChapters().then(response => {
      this.props.dispatch(addOption('chapters', response));
      const topicNames = response.map(item => item.name);
      return topicNames;
    });
  };
  getTopics = () => {
    const Request = new Structure();
    console.log('get topics');
    return Request.getTopics().then(response => {
      console.log(response);
      this.props.dispatch(addOption('topics', response));
      const topicNames = response.map(item => item.name);
      return topicNames;
    });
  };
  getChapterId = () => {
    const chapter = this.props.checks.chapters.filter(item => {
      return item.name === this.props.tasks.chapter;
    });
    return chapter[0].id;
  };
  getTopicId = () => {
    const topic = this.props.checks.topics.filter(item => {
      return item.name === this.props.tasks.topic;
    });
    return topic[0].id;
  };

  createCheck = () => {
    const { test_name, subject, grade, difficulty, type } = this.props.checks;
    const Request = new Checks();
    console.log(
      test_name,
      subject,
      grade,
      difficulty,
      type,
      this.getChapterId(),
      this.getTopicId(),
    );
    Request.createCheck(
      test_name,
      subject.id,
      grade,
      difficulty,
      type,
      this.getChapterId(),
      this.getTopicId(),
    ).then(res => {
      this.props.dispatch(addOption('id', res.id));
      this.setState(() => ({
        check_id: res.id,
        check: res,
      }));
    });
  };
  onChange = (value, name) => {
    this.props.dispatch(addOption(name, value));
  };
  toggleTask = id => {
    if (this.state.choosedTasksIds.includes(id)) {
      this.setState(state => ({
        choosedTasksIds: state.choosedTasksIds.filter(item => {
          return item != id;
        }),
      }));
    } else {
      this.setState(state => ({
        choosedTasksIds: [...state.choosedTasksIds, id],
      }));
    }
  };
  deleteTask = id => {
    const Request = new Tasks();
    Request.deleteTask(id);
  };

  createCheckJob = () => {
    const { check_id, choosedTasksIds } = this.state;
    const Request = new Checks();
    Request.createCheckJobs(check_id, choosedTasksIds.toString()).then(() => {
      this.updateCheck();
      this.setState(() => ({
        choosedTasksIds: [],
      }));
    });
  };

  render() {
    return (
      <div className="content">
        <div className="content__main">
          <p className="content__title">Конструктор теста</p>

          <TasksList tasks={this.props.tasks.taskList} />
        </div>
        <div className="content__secondary">
          <TextInput
            name="test_name"
            placeholder="Контрольная для седьмого класса"
            onChange={this.onChange}
            label="Название теста"
          />
          <Select
            name="grade"
            modificators="select--in-row"
            options={this.grade}
            onChange={this.onChange}
            label="Класс"
          />
          <Select
            name="subject"
            modificators="select--in-row"
            options={this.getNames(this.subjects)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.subjects);
            }}
            label="Предмет"
          />
          <Select
            name="difficulty"
            modificators="select--in-row"
            options={this.getNames(this.difficulty)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.difficulty);
            }}
            label="Сложность"
          />
          <Select
            name="type"
            modificators="select--in-row"
            options={this.getNames(this.type)}
            onChange={(value, name) => {
              this.onCustomChange(value, name, this.type);
            }}
            label="Тип"
          />
          <SelectElement type="topic" name="Тема" getElementsAsync={this.getTopics} />
          <SelectElement type="chapter" name="Раздел" getElementsAsync={this.getChapters} />
          <button onClick={this.createCheck} className="button">
            Создать тест
          </button>
          {this.state.check.name && <h3 className="create-test__title">{this.state.check.name}</h3>}
          <div className="create-test create-test--preview">
            {this.props.checks.tasks.map((item, index) => {
              return (
                <TaskPreview
                  key={index}
                  task={item.task}
                  generations={item.generations}
                  generationsHidden
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
  checks: state.checks,
});

export default connect(mapStateToProps)(CreateTest);
