import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import './search-popup.scss';

class AddTaskInfo extends React.Component {
  state = {
    popupVisible: false,
    elements: [],
    filteredElements: [],
  };
  chooseElement = (name, value, e) => {
    this.props.chooseElement(name, value, this.props.toFunction);
    this.togglePopupVisibility(e);
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
  };
  filterSearchData = filter => {
    const filteredData = this.props.elements.filter(item => {
      return item.name.includes(filter);
    });
    this.setState(() => ({ filteredElements: filteredData }));
  };
  getCurrentElement = () => {
    if (this.props.reduxStore === 'tasks') {
      return this.props.tasks[this.props.type]
        ? this.props.tasks[this.props.type].name
        : this.props.name;
    } else {
      return this.props.checks[this.props.type]
        ? this.props.checks[this.props.type].name
        : this.props.name;
    }
  };
  render() {
    return (
      <div
        className={`search-popup ${!this.state.popupVisible && 'search-popup--hidden'}`}
        onClick={this.togglePopupVisibility}
      >
        <div
          className={`search-popup__wrapper ${!this.state.popupVisible &&
            'search-popup__wrapper--hidden'}`}
        >
          <TextInput
            name="search"
            placeholder="Я умею искать темы"
            className="search-popup__search-input"
            onChange={this.filterSearchData}
          ></TextInput>
          <div className="search-popup__elements">
            {(this.state.filteredElements.length
              ? this.state.filteredElements
              : this.props.elements || []
            ).map((item, index) => {
              return (
                <div
                  onClick={e => {
                    this.chooseElement(this.props.type, item, e);
                  }}
                  className="search-popup__elements-item"
                  key={index}
                >
                  {`${item.name} ${
                    item.subject_id ? `(${item.subject_id == 1 ? 'math' : 'rus'})` : ''
                  }`}
                </div>
              );
            })}
          </div>
        </div>
        <Button
          className={`${this.state.popupVisible && 'button--hidden'} button--select-element`}
          onClick={e => {
            this.togglePopupVisibility(e);
          }}
        >
          {this.getCurrentElement()}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tasks: state.tasks,
  checks: state.checks,
});

export default connect(mapStateToProps)(AddTaskInfo);
