import React from "react";
import { connect } from "react-redux";

class TextInput extends React.Component {
  state = {
    value: ""
  };
  onInputChange = () => {
    this.props.onChange(this.text.value, this.props.name);
    this.setState(() => ({ value: this.text.value }));
  };
  render() {
    const modificators = this.props.modificators;
    const wrapperExtraClasses = this.props.className;
    return (
      <div
        className={`text-input ${this.props.fullWidth &&
          "text-input--full-width"} ${wrapperExtraClasses}`}
      >
        {this.props.label && (
          <label className="text-input__label" htmlFor={this.props.name}>
            {this.props.label}
          </label>
        )}
        <input
          className={`text-input__field ${modificators}`}
          type="text"
          placeholder={this.props.placeholder}
          onChange={this.onInputChange}
          name={this.props.name}
          value={this.props.value ? this.props.value : this.state.value}
          ref={text => (this.text = text)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general
});

export default connect(mapStateToProps)(TextInput);
