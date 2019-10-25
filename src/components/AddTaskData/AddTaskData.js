import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Structure from 'helpers/Structure';
import TaskPreview from 'components/TaskPreview/TaskPreview';
import Button from 'components/Button/Button';

import { addOption } from 'actions/tasks';
import { getChapters } from 'actions/general';
import SelectElement from 'components/SelectElement/SelectElement';

class AddTaskInfo extends React.Component {
  difficulty = ['A', 'B'];
  subjects = { Математика: 1, Русский: 2 };
  grade = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

  state = {
    elements: [],
    popupVisible: false,
  };

  getSubjectNames = subjects => {
    return Object.keys(subjects);
  };
  addPicture = async () => {
    // const response = await fetch('http://localhost:3001/b2t/api/v1/teachers/check_generations/1', {
    //   headers: {
    //     'Content-type': 'application/json',
    //     'Uchi-User-Id': '12',
    //   },
    // });

    // const data = await response.json();
    // console.log(data);

    const body = new FormData();
    body.append('check_generation[images][a]', '@/Users/aleksey/Desktop/goal.svg');
    body.append('check_generation[images][b]', '@/Users/aleksey/Desktop/goal.svg');
    body.append('check_generation[name]', '123');
    body.append('check_generation[kind]', 'inputs');

    fetch('http://localhost:3001/b2t/api/v1/teachers/check_generations/1', {
      body,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data',
        'Uchi-User-Id': '12',
        'Uchi-User-Type': 'Teacher',
      },
      method: 'PUT',
    });

    // const body = new FormData();
    // body.append('check_generation[images][a]', '@/Users/aleksey/Desktop/goal.svg');
    // body.append('check_generation[images][b]', '@/Users/aleksey/Desktop/goal.svg');
    // body.append('check_generation[name]', '123');
    // body.append('check_generation[kind]', 'inputs');
    // body.append('check_generation[kind]', 'inputs');

    // fetch('http://localhost:3001/b2t/api/v1/teachers/check_generations/21', {
    //   body,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Uchi-User-Id': '12',
    //     'Uchi-User-Type': 'Teacher',
    //   },
    //   method: 'PUT',
    // });
  };
  onSubjectChange = (value, name) => {
    const subjectObj = { name: value, id: this.subjects[value] };
    this.props.dispatch(addOption(name, subjectObj));
  };
  onChange = (value, name) => {
    this.props.dispatch(addOption(name, value));
  };
  getSubjects = () => {
    const Request = new Structure();
    Request.getSubjects();
  };
  getChapters = () => {
    this.props.dispatch(getChapters());
    const Request = new Structure();
    return Request.getChapters().then(response => {
      const topicNames = response.map(item => item.name);
      return topicNames;
    });
  };
  render() {
    return (
      <div className="content__wrapper">
        <div className="content__fragment content__main">
          <TextInput
            name="name"
            placeholder="Например: Найди значение функции по графику"
            onChange={this.onChange}
            label="Название задания"
            mathMode
          />
          <Select
            name="difficulty"
            modificators="select--in-row"
            options={this.difficulty}
            onChange={this.onChange}
            label="Сложность"
          />
          <Select
            name="subject"
            modificators="select--in-row"
            options={this.getSubjectNames(this.subjects)}
            onChange={this.onSubjectChange}
            label="Предмет"
          />
          <Select
            name="grade"
            modificators="select--in-row"
            options={this.props.learning_levels}
            onChange={this.onChange}
            label="Класс"
          />
          <SelectElement
            name="Выбрать тему"
            type="chapter"
            elements={this.props.general.chaptersNames}
            reduxStore="tasks"
            chooseElement={(name, value) => {
              this.props.dispatch(addOption(name, value));
            }}
          />
          <button onClick={this.addPicture}>add picture</button>
        </div>
        <TaskPreview
          task={this.props.tasks}
          generations={this.props.general.generations}
          className="content__secondary"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  general: state.general,
  learning_levels: state.general.learning_levels.map(item => item.value),
});

export default connect(mapStateToProps)(AddTaskInfo);
