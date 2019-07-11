import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Answers from 'components/Answers/Answers';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import DragAndDrop from 'components/DragAndDrop/DragAndDrop';
import Button from '@material-ui/core/Button';
import Stepper from 'components/Stepper/Stepper';
import AddTaskData from 'components/AddTaskData/AddTaskData';
import AddGenerationData from 'components/AddGenerationData/AddGenerationData';

import Request from 'helpers/createTask';
import './content.scss';

class Home extends React.Component {
  mechanicOptions = [
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
  ];

  state = {
    kind: '',
    generations: [],
  };

  getOptions = () => {
    const { mechanicOptions } = this;
    return mechanicOptions.map(item => item.name);
  };

  getActiveMechanic = () => {
    const { kind } = this.state;
    const { mechanicOptions } = this;
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
  // saveGeneration = () => {
  //   const { kind, answers, generations } = this.state;
  //   this.setState(state => ({
  //     generations: [
  //       ...generations,
  //       {
  //         answers: this.props.general.answers,
  //         kind,
  //         difficulty: this.difficulty,
  //         types: this.types,
  //       },
  //     ],
  //   }));
  //   console.log(this.state);
  // };

  onChange = (value, name) => {
    this.setState(
      () => ({ [name]: value }),
      () => {
        console.log(this.state);
      },
    );
  };

  // onTypeChange = value => {
  //   this.setState(() => ({ kind: value }));
  // };
  createTask = () => {
    const Req = new Request();
    if (Req.getChecks()) {
      this.setState(() => ({
        isAuth: true,
      }));
    }
  };

  render() {
    const { kind } = this.state;
    const mechanicInterface = kind && this.getActiveMechanic();

    // const firstStep = (
    //   <div className="content__fragment">
    //     <TextInput
    //       name="name"
    //       placeholder="Например: Найди значение функции по графику"
    //       onChange={this.onChange}
    //       label="Название задания"
    //     />
    //     <Select
    //       name="type"
    //       modificators="select--in-row"
    //       options={this.types}
    //       onChange={this.onChange}
    //       label="Тип задания"
    //     />
    //     <Select
    //       name="difficulty"
    //       modificators="select--in-row"
    //       options={this.difficulty}
    //       onChange={this.onChange}
    //       label="Сложность"
    //     />
    //     <Select
    //       name="subject"
    //       modificators="select--in-row"
    //       options={this.subjects}
    //       onChange={this.onChange}
    //       label="Предмет"
    //     />
    //     <Select
    //       name="grade"
    //       modificators="select--in-row"
    //       options={this.grade}
    //       onChange={this.onChange}
    //       label="Класс"
    //     />
    //   </div>
    // );

    // const secondStep = (
    //   <div className="content__fragment">
    //     <TextInput name="text" onChange={this.onChange} label="Текст задания" />
    //     <Select
    //       modificators="select--in-row"
    //       options={this.getOptions()}
    //       onChange={this.onTypeChange}
    //       label="Механика"
    //     />
    //     {mechanicInterface}
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       classes={{ root: 'button button--primary' }}
    //       onClick={this.saveGeneration}
    //     >
    //       Добавить генерацию
    //     </Button>
    //   </div>
    // );

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Home);
