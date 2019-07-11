import React from 'react';
import { connect } from 'react-redux';
import Stepper from 'components/Stepper/Stepper';
import AddTaskData from 'components/AddTaskData/AddTaskData';
import AddGenerationData from 'components/AddGenerationData/AddGenerationData';

import Request from 'helpers/createTask';
import createGeneration from 'helpers/createTask';
import './content.scss';

class Home extends React.Component {
  state = {
    kind: '',
    generations: [],
  };

  onSubmit = () => {
    fetch('https://43047.shot-uchi.ru//b2t/api/v1/student_check_lessons/1')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
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

  createTask = () => {
    const Req = new Request();
    Req.postCheck();
  };
  createGeneration = () => {
    const Req = new createGeneration();
    Req.postGeneration();
  };

  render() {
    return (
      <div className="content">
        <Stepper
          settings={[
            { name: 'Базовые параметры', component: <AddTaskData onChange={this.onChange} /> },
            {
              name: 'Параметры генераций',
              component: <AddGenerationData kind={this.state.kind} onChange={this.onChange} />,
            },
            { name: 'Завершение', component: <p>Посмотрел на результат, отправил.</p> },
          ]}
          title="Конструктор заданий"
        />
        <div>
          <button onClick={this.createTask}>Create Task</button>
          <button onClick={this.createGeneration}>Create Generation</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Home);
