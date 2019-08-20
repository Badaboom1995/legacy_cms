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

  RegExps = {
    inputs: /%\{([^{}]+)\}/g,
    dropdown: /%\{([^|{}]+\|?){2,5}\}/g, // От двух до пяти вариантов в дропдауне
  };

  onChange = value => {
    this.setState(() => ({ value, wrongExpression: false }));
  };

  addExpression = () => {
    const { kind } = this.props;
    const value = String(this.state.value);
    const regexp = this.RegExps[kind];
    const isValid = value.search(regexp) !== -1;
    const isUnique = this.props.general.expressions.every(exp => exp.value !== value);
    console.log(isValid, isUnique, regexp, value)
    if (isValid && isUnique) {
      const expression = {
        question: '',
        answers: {},
        value,
      };
      let charCode = 97;
      expression.question = value.replace(regexp, (str, match) => {
        const char = String.fromCharCode(charCode);
        console.log(char, match);
        if (kind === 'inputs') {
          expression.answers[char] = match;
        } else if (kind === 'dropdown') {
          expression.answers[char] = {
            values: [],
            expected: null,
          };
          // выражение с ретроспективной проверкой
          str.replace(/((?<=(?:{|\|))[^|{}]+)(?=(?:\||}))/g, (raw, variant) => {
            console.log(raw, variant);
            let ddValue = variant;
            if (variant.slice(-1) === '*') {
              ddValue = variant.slice(0, -1);
              expression.answers[char].expected = ddValue;
            }
            expression.answers[char].values.push(ddValue);
          });
        }

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
    const { kind } = this.props;
    const { wrongExpression, value } = this.state;

    let warningText = 'инпута вида "%{значение}';
    switch (kind) {
      case 'inputs':
        warningText = 'инпута вида "%{значение}';
        break;

      case 'dropdown':
        warningText = 'дропдауна вида "%{значение|правильное*|значение}"';
        break;
    }

    return (
      <div className="add-expression">
        <TextInput
          name="expressionToAdd"
          value={value}
          onChange={this.onChange}
          label="Добавить выражение"
        />
        {wrongExpression &&
          <div className="expression-warning">
            {`Выражение должно содержать хотя бы одно место для ${warningText}`}
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
