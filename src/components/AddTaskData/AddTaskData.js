import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';

class AddTaskInfo extends React.Component {
  difficulty = ['A', 'B'];
  subjects = { Математика: 1, Русский: 2 };
  grade = ['1', '2', '3'];

  getSubjectNames = subjects => {
    return Object.keys(subjects);
  };

  onSubjectChange = (value, name) => {
    const subjectObj = { name: value, id: this.subjects[value] };
    this.props.onChange(subjectObj, name);
  };
  onWeightChange = (value, name) => {
    const weight = parseInt(value);
    this.props.onChange(weight, name);
  };
  render() {
    return (
      <div className="content__fragment">
        <TextInput
          name="name"
          placeholder="Например: Найди значение функции по графику"
          onChange={this.props.onChange}
          label="Название задания"
        />
        <Select
          name="difficulty"
          modificators="select--in-row"
          options={this.difficulty}
          onChange={this.props.onChange}
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
          options={this.grade}
          onChange={this.props.onChange}
          label="Класс"
        />
        <TextInput
          name="difficulty_custom"
          placeholder="Вес задания"
          onChange={this.onWeightChange}
          label="Ввведите целое число"
        />
      </div>
    );
  }
}

export default connect()(AddTaskInfo);
