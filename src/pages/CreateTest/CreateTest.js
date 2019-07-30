import React from 'react';
import { connect } from 'react-redux';
import Request from 'helpers/request';
import Checks from 'helpers/Checks';
import Tasks from 'helpers/Tasks';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';

import './create-test.scss';

class CreateTest extends React.Component {
  subjects = { Математика: 1, Русский: 2 };
  grade = ['1', '2', '3'];
  state = {
    tasks: [],
    choosedTasksIds: [],
    check: {},
    checkJobs: [],
  };
  componentDidMount() {
    this.getTasks();
  }
  getTasks = () => {
    const CheckTask = new Request();
    CheckTask.send(`http://localhost:3001/b2t/api/v1/teachers/check_jobs`, 'GET').then(response => {
      this.setState(() => ({ tasks: response }));
      console.log(response);
    });
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
    const Request = new Checks();
    Request.createCheck(this.state.test_name, 1, 1).then(res => {
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
    const Request = new Checks();
    Request.createCheckJobs(this.state.check_id, this.state.choosedTasksIds.toString()).then(() => {
      this.updateCheck();
      this.setState(() => ({
        choosedTasksIds: [],
      }));
    });
  };

  render() {
    return (
      <div className="content content--create">
        <div className="content__test">
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
          <button onClick={this.createCheck}>Создать тест</button>
          <p>{this.state.check.name && this.state.check.name}</p>
          <ul>
            {this.state.check.check_jobs &&
              this.state.check.check_jobs.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
          </ul>
        </div>
        <p className="content__tile">Конструктор теста</p>
        <button onClick={this.createCheckJob}>Добавить задание в тест</button>
        <div className="create-test">
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
                    <b>{item.check_generations[0] && item.check_generations[0].name}</b>
                  </p>
                  <p>Тип: {item.check_generations[0] && item.check_generations[0].kind}</p>
                  <div>
                    {/* <p>Ответы</p>
                    {item.check_generations[0] &&
                      Object.keys(item.check_generations[0].data.variants).map((answer, index) => {
                        return (
                          <div key={index}>
                            <p>
                              <span>{answer}: </span>
                              <span>{item.check_generations[0].data.variants[answer].name}</span>
                            </p>
                          </div>
                        );
                      })} */}
                  </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(CreateTest);
