import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';

class AddTaskInfo extends React.Component {
  difficulty = ['A', 'B', 'C'];
  subjects = { Математика: 1, Русский: 2 };
  grade = ['1', '2', '3'];

  getSubjectNames = subjects => {
    return Object.keys(subjects);
  };

  onChange = (value, name) => {
    const subjectObj = { name: value, id: this.subjects[value] };
    this.props.onChange(subjectObj, name);
    // console.log(subjectObj, name);
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
          onChange={this.onChange}
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
