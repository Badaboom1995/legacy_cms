import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';

class AddTaskInfo extends React.Component {
  types = ['Уравнение', 'Пример', 'Задача'];
  difficulty = ['Просто', 'Средне', 'Сложно'];
  subjects = ['Математика'];
  grade = ['1', '2', '3'];

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
          name="type"
          modificators="select--in-row"
          options={this.types}
          onChange={this.props.onChange}
          label="Тип задания"
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
          options={this.subjects}
          onChange={this.props.onChange}
          label="Предмет"
        />
        <Select
          name="grade"
          modificators="select--in-row"
          options={this.grade}
          onChange={this.props.onChange}
          label="Класс"
        />
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   general: state.general,
// });

export default connect()(AddTaskInfo);
