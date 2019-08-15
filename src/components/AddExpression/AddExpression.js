import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
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

  addExpression = () => {
    const { value } = this.state;
    const regexp = /%\{([^{}]+)\}/g;
    const isUnique = this.props.general.expressions.every(exp => exp.value !== value);
    if (regexp.test(value) && isUnique) {
      const expression = {
        question: '',
        answers: {},
        value,
      };
      let charCode = 97;
      console.log(this.props);
      expression.question = value.replace(regexp, (str, match) => {
        const char = String.fromCharCode(charCode);
        console.log(char);
        expression.answers[char] = match;
        charCode++;
        return `%\{${char}}`;
      });

      console.log(expression);
      this.props.dispatch(addExpression(expression));
    } else if (isUnique) {
      this.setState({ wrongExpression: true });
    }
  };

  render() {
    const { wrongExpression } = this.state;
    return (
      <div className="add-expression">
        <TextInput
          name="expressionToAdd"
          value={this.state.value}
          onChange={this.onChange}
          label="Добавить выражение"
        />
        {wrongExpression &&
          <div className="expression-warning">
            {'Выражение должно содержать хотя бы одно место для инпута вида "%{значение}"'}
          </div>
        }
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
