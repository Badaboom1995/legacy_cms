import React from 'react';
import { connect } from 'react-redux';
import Request from 'helpers/request';
import Checks from 'helpers/Checks';

import './create-test.scss';

class CreateTest extends React.Component {
  state = {
    tasks: [],
    choosedTasksIds: [],
    check: {},
  };

  getTasks = () => {
    const CheckTask = new Request();
    CheckTask.send(`http://localhost:3001/b2t/api/v1/teachers/check_jobs`, 'GET').then(response => {
      this.setState(() => ({ tasks: response }));
    });
  };

  updateCheck = () => {
    const Request = new Checks();
    Request.getChecks(this.check_id).then(res => {
      this.setState(() => ({
        check: res[0],
      }));
    });
  };

  createCheck = () => {
    const Request = new Checks();
    Request.createCheck().then(res => {
      this.setState(() => ({
        check_id: res.id,
        check: res,
      }));
    });
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

  createCheckJob = () => {
    const Request = new Checks();
    const tasksToAdd = this.state.tasks.filter(item => {
      return this.state.choosedTasksIds.includes(item.id);
    });
    tasksToAdd.forEach(item => {
      Request.createCheckJob(this.state.check_id, item);
    });
  };

  render() {
    return (
      <div className="content content--create">
        <div className="content__test">
          <p>{this.state.check.name && this.state.check.name}</p>
          <ul>
            {this.state.check.check_jobs &&
              this.state.check.check_jobs.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
          </ul>
        </div>
        <p className="content__tile">Конструктор теста</p>
        <button onClick={this.createCheck}>Создать тест</button>
        <button onClick={this.getTasks}>Загрузить задания</button>
        <button onClick={this.updateCheck}>Обновить тест</button>
        <button onClick={this.createCheckJob}>Добавить задание в тест</button>
        <div className="create-test">
          {this.state.tasks.map((item, index) => {
            return (
              <div
                className={`create-test__item ${this.state.choosedTasksIds.includes(index + 1) &&
                  'create-test__item--choosed'}`}
                onClick={() => {
                  this.toggleTask(item.id);
                }}
                key={index}
              >
                <p>
                  Название задания: <b>{item.name}</b>
                </p>
                <div className="create-test__item-gens">
                  <p>
                    Текст задания:{' '}
                    <b>{item.check_generations[0] && item.check_generations[0].name}</b>
                  </p>
                  <p>Тип: {item.check_generations[0] && item.check_generations[0].kind}</p>
                  <div>
                    <p>Ответы</p>
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
                      })}
                  </div>
                </div>
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
