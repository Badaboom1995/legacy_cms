import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Answers from 'components/Answers/Answers';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';
import Button from '@material-ui/core/Button';
import Stepper from 'components/Stepper/Stepper';

import Request from 'helpers/createTask';
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
    if (kind === 'Перетаскивание') {
      return (
        <React.Fragment>
          {mechanicOptions.filter(item => item.name === kind)[0].component}
        </React.Fragment>
      );
    }
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
  createTask = () => {
    const Req = new Request();
    if (Req.getChecks()) {
      this.setState(() => ({
        isAuth: true,
      }));
    }
  };

  render() {
    const { kind, types, difficulty } = this.state;
    const mechanicInterface = kind && this.getActiveMechanic();

    const firstStep = (
      <div className="content__fragment">
        <TextInput
          name="name"
          placeholder="Например: Найди значение функции по графику"
          onChange={this.onChange}
          label="Название задания"
        />
        <Select
          modificators="select--in-row"
          options={types}
          onChange={this.onChange}
          label="Тип задания"
        />
        <Select
          modificators="select--in-row"
          options={difficulty}
          onChange={this.onChange}
          label="Сложность"
        />
        <Select
          modificators="select--in-row"
          options={difficulty}
          onChange={this.onChange}
          label="Предмет"
        />
        <Select
          modificators="select--in-row"
          options={difficulty}
          onChange={this.onChange}
          label="Класс"
        />
        <Select
          modificators="select--in-row"
          options={this.getOptions()}
          onChange={this.onTypeChange}
          label="Механика"
        />
      </div>
    );

    const secondStep = (
      <div className="content__fragment">
        <TextInput name="text" onChange={this.onChange} label="Текст задания" />
        {mechanicInterface}
        <Button
          variant="contained"
          color="primary"
          classes={{ root: 'button button--primary' }}
          onClick={this.createTask}
        >
          Добавить генерацию
        </Button>
      </div>
    );

    return (
      <div className="content">
        <Stepper
          settings={[
            { name: 'Базовые параметры', component: firstStep },
            { name: 'Параметры генераций', component: secondStep },
            { name: 'Завершение', component: <p>Посмотрел на результат, отправил.</p> },
          ]}
          title="Конструктор заданий"
        />

        {/* <TextInput
          name="name"
          placeholder="Например: Найди значение функции по графику"
          onChange={this.onChange}
          label="Название задания"
        /> */}
        {/* <TextInput name="text" onChange={this.onChange} label="Текст задания" />
        <Select options={this.getOptions()} onChange={this.onTypeChange} label="Механика" />
        {mechanicInterface} */}
        {/* <Select options={types} onChange={this.onChange} label="Тип задания" />
        <Select options={difficulty} onChange={this.onChange} label="Сложность" /> */}
        {/* <Button
          variant="contained"
          color="primary"
          classes={{ root: 'button button--primary' }}
          onClick={this.createTask}
        >
          Создать задание
        </Button> */}
      </div>
    );
  }
}

export default connect()(Home);
