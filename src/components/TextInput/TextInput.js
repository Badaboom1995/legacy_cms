import React from 'react';
import { connect } from 'react-redux';
import './text-input.scss';
import KaTex from 'components/KaTex/KaTex';
import TextUtilit from 'components/TextUtilit/TextUtilit';

class TextInput extends React.Component {
  state = {
    value: '',
    mathMode: false,
  };

  onInputChange = () => {
    const { onChange, name } = this.props;
    onChange(this.text.value, name);
    this.setState(() => ({ value: this.text.value }));
  };
  switchMode = () => {
    this.setState(state => ({
      mathMode: state.mathMode ? false : true,
    }));
  };
  render() {
    const { modificators, className, fullWidth, name, label, placeholder, value } = this.props;
    const wrapperExtraClasses = className;
    return (
      <div className={`text-input ${fullWidth && 'text-input--full-width'} ${wrapperExtraClasses}`}>
        {label && (
          <label className="text-input__label" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className={`text-input__field ${modificators}`}
          type="text"
          placeholder={placeholder}
          onChange={this.onInputChange}
          name={name}
          value={value}
          ref={text => (this.text = text)}
        />
        {this.props.mathMode && (
          <button
            style={
              this.state.mathMode ? { backgroundColor: '#696773' } : { backgroundColor: '#C9C7C3' }
            }
            className="text-input__switch-mode"
            onClick={this.switchMode}
          ></button>
        )}
        {this.props.mathMode && this.state.mathMode ? (
          <div className="math">{TextUtilit.handleText(this.state.value)}</div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(TextInput);
