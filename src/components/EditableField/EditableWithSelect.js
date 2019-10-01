import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import Tasks from 'helpers/Tasks';
import Select from 'components/Select/Select';

class EditableWithSelect extends React.Component {
  state = {
    editing: false,
    value: '',
  };
  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    this.setState(() => ({ editing: false }));
    const Request = new Tasks();
    // Request.updateCheckJob(this.props.task.id, {
    //   [this.props.param_name]: this.props.getId(this.props.options, this.state.value).id,
    // });
    Request.updateGeneration();
  };
  onValueChange = value => {
    this.setState(() => ({ value: value }));
  };
  render() {
    const { className, getNames, options } = this.props;
    return (
      <React.Fragment>
        {this.state.editing ? (
          <div className="editable-element">
            <Select
              name={this.props.name}
              modificators="select--in-row"
              options={getNames(options)}
              onChange={this.onValueChange}
              label={this.props.label}
              value={this.state.value || this.props.children}
              ref={select => (this.select = select)}
            />
            <button onClick={this.editingOff}>submit</button>
          </div>
        ) : (
          <span onClick={this.editingOn} className={className}>
            {this.state.value || this.props.children}
          </span>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  checks: state.checks,
});

export default connect(mapStateToProps)(EditableWithSelect);
