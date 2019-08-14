import React from 'react';
import { connect } from 'react-redux';
import Expression from 'components/Expression/Expression';
import './expressions-list.scss';

class ExpressionsList extends React.Component {
  render() {
    const className = "expressions";

    return (
      <React.Fragment>
        {this.props.general.expressions.length > 0 && (
          <div className={className}>
            <h2 className={`${className}__title`}>Выражения</h2>
            <ul className={`${className}__list`}>
              {this.props.general.expressions.map((exp, index) => {
                return (
                  <Expression
                    expression={exp}
                    key={index}
                    index={index}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(ExpressionsList);
