import React from 'react';
import { connect } from 'react-redux';
import './text-input.scss';

class TextInput extends React.Component {
  state = {
    value: '',
  };

  onInputChange = () => {
    const { onChange, name } = this.props;
    onChange(this.text.value, name);
    this.setState(() => ({ value: this.text.value }));
  };

  render() {
    const { modificators, className, fullWidth, name, label, placeholder, value } = this.state;
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(TextInput);
