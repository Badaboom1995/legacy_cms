import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getChecks } from 'actions/checks';
import { deleteChecks } from 'actions/checks';
import './tests-list.scss';
import Checks from 'helpers/Checks';

class TestsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getChecks());
    console.log(this.props.checks.checks_list);
  }
  getList = () => {
    console.log(this.props.checks.checks_list);
  };

  deleteCheck = id => {
    this.props.dispatch(deleteChecks(id));
    // const Request = new Checks();
    // Request.deleteCheck(id);
  };
  render() {
    const { checks_list } = this.props.checks;
    return (
      <div className="content">
        <div className="tests-list">
          <p className="tests-list__title">Тесты</p>
          {checks_list.map((item, index) => {
            const { check_mode, check_scale } = item;
            return (
              <div key={index} className="task-preview task-preview__main tests-list__test">
                <p className="tests-list__test-title">{item.name}</p>
                <span className="task-preview__param">{check_mode.name}</span>
                <span className="task-preview__param">{check_scale.name}</span>
                <button
                  onClick={() => {
                    this.deleteCheck(item.id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <div className="content__secondary"></div>
      </div>
    );
  }
}

TestsList.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  general: state.general,
  checks: state.checks,
});

export default connect(mapStateToProps)(TestsList);
