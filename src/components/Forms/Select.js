import React from 'react';

export default class Select extends React.Component {
  state = {
    value: 'Выбрать',
    listOpened: false,
    listHovered: false,
  };

  onChange = e => {
    this.props.onChange(e.target.innerHTML);
    e.persist();
    this.setState(() => ({
      value: e.target.innerHTML,
      listOpened: false,
    }));
  };

  listHovered = () => {
    this.setState(() => ({ listHovered: true }));
  };

  listUnhovered = () => {
    this.setState(() => ({ listHovered: false }));
  };

  toggleList = () => {
    this.setState(state => ({ listOpened: !state.listOpened }));
  };

  hideList = () => {
    this.setState(() => ({
      listOpened: !!this.state.listHovered,
    }));
  };

  showList = () => {
    this.setState(() => ({ listOpened: true }));
  };

  setDefaultValue = () => {
    if (this.state.value) {
      return this.state.value;
    } if (this.props.value) {
      return this.props.value;
    } 
      return this.props.options[0];
    
  };

  render() {
    const enabled = this.state.listOpened && 'select__list--enabled';
    const {modificators} = this.props;
    return (
      <div className={`select ${modificators}`} onBlur={this.hideList}>
        {this.props.label && <label className="label">{this.props.label}</label>}
        <div className="select__controls">
          <button onClick={this.toggleList} className="button button--select">
            {this.setDefaultValue()}
          </button>
          <div
            onMouseEnter={this.listHovered}
            onMouseLeave={this.listUnhovered}
            className={`select__list ${enabled}`}
          >
            {this.props.options.map((option, index) => (
              <div key={index} onClick={this.onChange} className="select__list-item">
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
