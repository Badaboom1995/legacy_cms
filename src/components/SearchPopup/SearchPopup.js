import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import './search-popup.scss';

class AddTaskInfo extends React.Component {
  chooseElement = (name, value, e) => {
    this.props.onChange(value, name);
    this.props.toggleVisibility(e);
  };
  render() {
    return (
      <div
        className={`search-popup ${!this.props.visible && 'search-popup--hidden'}`}
        onClick={this.props.toggleVisibility}
      >
        <div className="search-popup__wrapper">
          <TextInput
            name="search"
            placeholder="Я умею искать темы и пропавших родственников"
            className="search-popup__search-input"
            onChange={this.props.filterSearchData}
          ></TextInput>
          <div className="search-popup__elements">
            {this.props.children.map((item, index) => {
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
      </div>
    );
  }
}

export default connect()(AddTaskInfo);
