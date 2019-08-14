import React from 'react';
import { connect } from 'react-redux';
import './expression.scss';
import { removeExpression } from 'actions/general';

class Expression extends React.Component {
  removeExpression = () => {
    this.props.dispatch(removeExpression(this.props.expression));
  };

  render() {
    const { index, expression } = this.props;
    const { question } = expression;
    return (
      <li
        className={`expression__item`}
        key={index}
        data-key={index}
        onDoubleClick={this.removeExpression}
      >
        {question}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Expression);
