import React from 'react';
import { connect } from 'react-redux';
import './expression.scss';
import { removeExpression } from 'actions/general';
import TextUtilit from 'components/TextUtilit/TextUtilit';

class Expression extends React.Component {
  removeExpression = () => {
    this.props.dispatch(removeExpression(this.props.expression));
  };

  render() {
    const { index, expression } = this.props;
    const { value } = expression;

    return (
      <li
        className={`expression__item`}
        key={index}
        data-key={index}
        onDoubleClick={this.removeExpression}
      >
        {TextUtilit.handleText(value)}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Expression);
