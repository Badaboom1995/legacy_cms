import React from 'react';
import { connect } from 'react-redux';
import Answers from 'components/Answers/Answers';
import './multiple-answers.scss';

class MultipleAnswers extends React.Component {
  render() {
    return <React.Fragment>multy</React.Fragment>;
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(MultipleAnswers);
