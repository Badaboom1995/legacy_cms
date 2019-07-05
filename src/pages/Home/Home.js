import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Answers from 'components/Answers/Answers';
import SelectButtons from 'components/SelectButtons/SelectButtons';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';
import './content.scss';

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
        component: <DragAndDrop />,
      },
      {
        name: 'Графики',
        component: <Answers multipleChoise />,
      },
    ],
    types: ['Уравнение', 'Пример', 'Задача'],
    difficulty: ['Просто', 'Средне', 'Сложно'],
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

  render() {
    const { kind, types, difficulty } = this.state;
    const mechanicInterface = kind && this.getActiveMechanic();
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
        <React.Fragment>
          <AddAnswer />
          <DragAndDrop></DragAndDrop>
        </React.Fragment>
        {mechanicInterface}
        <Select options={types} onChange={this.onChange} label="Тип задания" />
        <Select options={difficulty} onChange={this.onChange} label="Сложность" />
        <button type="button" className="button button--primary" onClick={this.onSubmit}>
          Создать задание
        </button>
      </div>
    );
  }
}

export default connect()(Home);
