import React from 'react';
import { connect } from 'react-redux';
import './button.scss';

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={`${this.props.className} button`}>
        {this.props.children}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Button);
