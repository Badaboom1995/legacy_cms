import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import { addOption } from 'actions/tasks';
import Button from 'components/Button/Button';
import './search-popup.scss';

class AddTaskInfo extends React.Component {
  state = {
    popupVisible: true,
  };
  chooseElement = (name, value, e) => {
    console.log(name, value);
    this.props.onChange(value, name);
    this.props.toggleVisibility(e);
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ popupVisible: state.popupVisible ? false : true }));
    }
  };
  filterSearchData = filter => {
    const filteredData = this.props.elements.filter(item => {
      return item.includes(filter);
    });
    this.setState(() => ({ filteredElements: filteredData }));
  };
  onElementChange = (value, name) => {
    const element = this.state.elementsObj.filter((item, index) => {
      return item.name == value;
    })[0].id;
    this.props.dispatch(addOption(name, value));
  };
  render() {
    return (
      <div
        className={`search-popup ${!this.state.popupVisible && 'search-popup--hidden'}`}
        onClick={this.toggleVisibility}
      >
        <div className="search-popup__wrapper">
          <TextInput
            name="search"
            placeholder="Я умею искать темы"
            className="search-popup__search-input"
            onChange={this.filterSearchData}
          ></TextInput>
          <div className="search-popup__elements">
            {this.props.elements.map((item, index) => {
              return (
                <div
                  onClick={e => {
                    this.chooseElement('chapter', item, e);
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
        <Button onClick={this.getChapters}>{'Раздел'}</Button>
      </div>
    );
  }
}

export default connect()(AddTaskInfo);
