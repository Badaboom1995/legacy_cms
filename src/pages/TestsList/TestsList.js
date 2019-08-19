import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getChecks } from 'actions/checks';

class TestsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getChecks());
  }
  render() {
    return <div className="content">TESTS</div>;
  }
}

TestsList.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(TestsList);
