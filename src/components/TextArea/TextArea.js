import React from 'react';
import { connect } from 'react-redux';
import './text-area.scss';
import KaTex from 'components/KaTex/KaTex';
import TextUtilit from 'components/TextUtilit/TextUtilit';

class TextArea extends React.Component {
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
      <div className={`textarea ${fullWidth && 'textarea--full-width'} ${wrapperExtraClasses}`}>
        {label && (
          <label className="textarea__label" htmlFor={name}>
            {label}
          </label>
        )}
        <textarea
          className={`textarea__field ${modificators}`}
          placeholder={placeholder}
          onChange={this.onInputChange}
          name={name}
          value={value}
          rows="1"
          ref={text => (this.text = text)}
        />
        {this.props.mathMode && (
          <button
            style={
              this.state.mathMode ? { backgroundColor: '#696773' } : { backgroundColor: '#C9C7C3' }
            }
            className="textarea__switch-mode"
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

export default connect(mapStateToProps)(TextArea);
