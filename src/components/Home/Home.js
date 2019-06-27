import React from 'react';
import { connect } from 'react-redux';
import TextInput from '../Forms/TextInput';
import Select from '../Forms/Select';
import Answers from '../Answers';
import AddAnswer from '../AddAnswer';
import './index.css';

class Home extends React.Component {
  state = {
    mechanicOptions: [
      {
        name: 'Ввод ответа',
        component: <Answers />,
      },
      {
        name: 'Выбор одного ответа',
        component: <Answers />,
      },
      {
        name: 'Выбор множества ответа',
        component: <Answers multipleChoise />,
      },
      {
        name: 'Перетаскивание',
        component: <Answers multipleChoise />,
      },
      {
        name: 'Графики',
        component: <Answers multipleChoise />,
      },
    ],
    answerToAdd: '',
    answers: [],
    kind: '',
  };

  getOptions = () => {
    const { mechanicOptions } = this.state;
    return mechanicOptions.map(item => item.name);
  };

  getActiveMechanic = () => {
    const { mechanicOptions, kind } = this.state;
    return (
      <React.Fragment>
        <AddAnswer />
        {mechanicOptions.filter(item => item.name === kind)[0].component}
      </React.Fragment>
    );
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
    this.setState(() => ({ [name]: value }));
  };

  onTypeChange = value => {
    this.setState(() => ({ kind: value }));
  };

  addAnswer = () => {
    this.setState(state => ({
      answers: [...state.answers, state.answerToAdd],
    }));
  };

  render() {
    const { kind } = this.state;
    return (
      <div className="content">
        <p className="content__title">Конструктор заданий</p>
        <TextInput
          name="name"
          placeholder="Например: Найди значение функции по графику"
          onChange={this.onChange}
          label="Название задания"
        />
        <TextInput name="text" onChange={this.onChange} label="Текст задания" />
        <Select options={this.getOptions()} onChange={this.onTypeChange} label="Механика" />
        {kind && this.getActiveMechanic()}
        <button type="button" className="button button--primary" onClick={this.onSubmit}>
          Создать задание
        </button>
      </div>
    );
  }
}

export default connect()(Home);
