import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import { addOption } from 'actions/tasks';
import Button from 'components/Button/Button';
import './search-popup.scss';

class AddTaskInfo extends React.Component {
  state = {
    popupVisible: false,
    elements: [],
    filteredElements: [],
  };
  chooseElement = (name, value, e) => {
    this.props.dispatch(addOption(name, value));
    this.togglePopupVisibility(e);
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
  };
  getElements = e => {
    this.props.getElementsAsync().then(response => {
      this.setState(() => ({
        elements: response,
      }));
    });
    this.togglePopupVisibility(e);
  };
  filterSearchData = filter => {
    const filteredData = this.state.elements.filter(item => {
      return item.includes(filter);
    });
    this.setState(() => ({ filteredElements: filteredData }));
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
              : this.state.elements
            ).map((item, index) => {
              return (
                <div
                  onClick={e => {
                    this.chooseElement(this.props.type || 'chapter', item, e);
                  }}
                  className="search-popup__elements-item"
                  key={index}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <Button
          className={this.state.popupVisible && 'button--hidden'}
          onClick={e => {
            this.getElements(e);
          }}
        >
          {this.props.tasks[this.props.type] || this.props.name}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(AddTaskInfo);
