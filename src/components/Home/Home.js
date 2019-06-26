import React from 'react';
import { connect } from 'react-redux';
import TextInput from '../Forms/TextInput';
import Select from '../Forms/Select';
import Answers from '../Answers';
import AddAnswer from '../AddAnswer';
import './index.scss';

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
        component: <Answers multipleChoise={true} />,
      },
      {
        name: 'Перетаскивание',
        component: <Answers multipleChoise={true} />,
      },
      {
        name: 'Графики',
        component: <Answers multipleChoise={true} />,
      },
    ],
    answerToAdd: '',
    answers: [],
    rightAnswer: '',
    name: '',
    kind: '',
  };
  getOptions = () => {
    return this.state.mechanicOptions.map(item => item.name);
  };
  getActiveMechanic = () => {
    return (
      <React.Fragment>
        <AddAnswer />
        {this.state.mechanicOptions.filter(item => item.name === this.state.kind)[0].component}
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
        {this.state.kind && this.getActiveMechanic()}
        <button className="button button--primary" onClick={this.onSubmit}>
          Создать задание
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Home);
