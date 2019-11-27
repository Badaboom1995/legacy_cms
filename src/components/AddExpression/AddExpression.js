import React from 'react';
import { connect } from 'react-redux';

import TextArea from 'components/TextArea/TextArea';
import DataCreator from 'utilits/DataCreator/DataCreator';
import { addExpression } from 'actions/general';
import './add-expression.scss';

class AddExpression extends React.Component {
  state = {
    value: '',
    wrongExpression: false,
  };

  onChange = value => {
    this.setState(() => ({ value, wrongExpression: false }));
  };

  addExpression = (e) => {
    e.persist();
    const { kind } = this.props;
    const value = String(this.state.value);
    const expressionData = DataCreator.createData(value, kind);

    if (expressionData) {
      this.props.dispatch(addExpression(expressionData));
      console.log(expressionData);
    } else if (expressionData === false) {
      this.setState({ wrongExpression: true });
    }
  };

  render() {
    const { kind } = this.props;
    const { wrongExpression, value } = this.state;
    const warningText = DataCreator.getWarningText(kind);

    return (
      <div className="add-expression">
        <TextArea
          name="expressionToAdd"
          value={value}
          onChange={this.onChange}
          label="Добавить выражение"
          mathMode
        />
        {wrongExpression && (
          <div className="expression-warning">
            {`Ожидаемое выражение: ${warningText}`}
          </div>
        )}
        <button className="button button--add" onClick={this.addExpression}>
          Добавить выражение
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(AddExpression);
