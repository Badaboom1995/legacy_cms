import React from "react";
import { connect } from "react-redux";
import TextInput from "./TextInput";
import Select from "./Select";

class TextInputWithDefaults extends React.Component {
  state = {
    value: ""
  };
  onInputChange = value => {
    this.setState(() => ({ value }));
  };
  onSelectChange = value => {
    this.setState(() => ({ value }));
  };
  render() {
    return (
      <div className="input-with-defaults">
        <label className="label" htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <div className="input-with-defaults__controls">
          <TextInput
            fullWidth={true}
            name={this.props.name}
            value={this.state.value}
            modificators="text-input__field--defaults"
            placeholder={this.props.label}
            onChange={this.onInputChange}
          />
          <Select
            value={this.props.selectDefault}
            modificators="select--defaults"
            onChange={this.onSelectChange}
            options={this.props.options}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general
});

export default connect(mapStateToProps)(TextInputWithDefaults);
