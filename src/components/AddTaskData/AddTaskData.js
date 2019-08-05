import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Structure from 'helpers/Structure';
import Button from 'components/Button/Button';
import SearchPopup from 'components/SearchPopup/SearchPopup';

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

  onSubjectChange = (value, name) => {
    const subjectObj = { name: value, id: this.subjects[value] };
    this.props.onChange(subjectObj, name);
  };
  onWeightChange = (value, name) => {
    const weight = parseInt(value);
    this.props.onChange(weight, name);
  };
  onChapterChange = (value, name) => {
    const chapter = this.state.elementsObj.filter((item, index) => {
      return item.name == value;
    })[0].id;
    this.props.onChange(chapter, name);
  };
  getSubjects = () => {
    const Request = new Structure();
    Request.getSubjects();
  };
  getTopics = e => {
    const Request = new Structure();
    Request.getTopics().then(response => {
      const topicNames = response.map(item => item.name);
      this.setState(() => ({ elements: topicNames }));
    });
    this.togglePopupVisibility(e);
  };
  getChapters = e => {
    const Request = new Structure();
    Request.getChapters().then(response => {
      const topicNames = response.map(item => item.name);
      this.setState(() => ({ elements: topicNames, elementsObj: response }));
    });
    this.togglePopupVisibility(e);
  };
  filterSearchData = filter => {
    const filteredData = this.state.elements.filter(item => {
      return item.includes(filter);
    });
    this.setState(() => ({ filteredElements: filteredData }));
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
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
        <SearchPopup
          onChange={this.onChapterChange}
          visible={this.state.popupVisible}
          toggleVisibility={this.togglePopupVisibility}
          filterSearchData={this.filterSearchData}
        >
          {this.state.filteredElements || this.state.elements}
        </SearchPopup>
        <Button onClick={this.getChapters}>Раздел</Button>
      </div>
    );
  }
}

export default connect()(AddTaskInfo);
