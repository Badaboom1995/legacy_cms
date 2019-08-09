import React from 'react';
import { connect } from 'react-redux';
import Checks from 'helpers/Checks';
import Tasks from 'helpers/Tasks';
import Structure from 'helpers/Structure';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';

import './create-test.scss';

class CreateTest extends React.Component {
  subjects = { Математика: 1, Русский: 2 };
  grade = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  state = {
    tasks: [],
    choosedTasksIds: [],
    check: {},
    checkJobs: [],
  };
  componentDidMount() {
    this.getTasks();
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
  getChecks = () => {
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
  onSubjectChange = (value, name) => {
    const subjectObj = { name: value, id: this.subjects[value] };
    this.onChange(subjectObj, name);
  };
  getSubjectNames = subjects => {
    return Object.keys(subjects);
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

  createCheck = () => {
    const { test_name, subject, grade } = this.state;
    const Request = new Checks();
    Request.createCheck(test_name, subject.id, grade).then(res => {
      this.setState(() => ({
        check_id: res.id,
        check: res,
      }));
    });
  };
  onChange = (value, name) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        console.log(this.state);
      },
    );
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
      <div className="content content--create">
        <div className="create-test">
          <p className="content__title">Конструктор теста</p>
          <button style={{ height: '30px' }} onClick={this.createCheckJob}>
            Добавить задания в тест
          </button>
          {this.state.tasks.map((item, index) => {
            return (
              <div
                className={`create-test__item ${this.state.choosedTasksIds.includes(item.id) &&
                  'create-test__item--choosed'}`}
                onClick={() => {
                  this.toggleTask(item.id);
                }}
                key={index}
              >
                <div className="create-test__item-gens">
                  <p>
                    {this.state.choosedTasksIds.includes(item.id) && <span></span>}
                    <b className="create-test__name">{item.name && item.name}</b>
                    <b className="create-test__text">
                      {item.check_generations[0] && item.check_generations[0].name}
                    </b>
                    <b>{item.chapter && item.chapter}</b>
                  </p>
                  <p>Тип: {item.check_generations[0] && item.check_generations[0].kind}</p>
                  <p>Раздел: {item.chapter_id && item.chapter_id}</p>
                </div>
                <button
                  onClick={() => {
                    this.deleteTask(item.id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="create-test__preview">
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
            options={this.getSubjectNames(this.subjects)}
            onChange={this.onSubjectChange}
            label="Предмет"
          />
          <button onClick={this.createCheck} className="button">
            Создать тест
          </button>
          {this.state.check.name && <h3 className="create-test__title">{this.state.check.name}</h3>}
          <div className="create-test create-test--preview">
            {this.state.check.check_jobs &&
              this.state.check.check_jobs.map((item, index) => {
                return (
                  <div className={'create-test__item'} key={index}>
                    <div className="create-test__item-gens">
                      <p>
                        {this.state.choosedTasksIds.includes(item.id) && <span></span>}
                        <b className="create-test__name create-test__name--preview">
                          {item.name && item.name}
                        </b>
                        <b className="create-test__text">
                          {item.check_generations[0] && item.check_generations[0].name}
                        </b>
                      </p>
                      <p>Тип: {item.check_generations[0] && item.check_generations[0].kind}</p>
                    </div>
                  </div>
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
});

export default connect(mapStateToProps)(CreateTest);
