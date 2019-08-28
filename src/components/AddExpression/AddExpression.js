import React from 'react';
import { connect } from 'react-redux';

import TextInput from 'components/TextInput/TextInput';
import TextUtilit from 'components/TextUtilit/TextUtilit';
import { addExpression } from 'actions/general';
import './add-expression.scss';

class AddExpression extends React.Component {
  state = {
    value: '',
    wrongExpression: false,
  };

  RegExps = {
    b2t: /%b2t\{((%\{.+?\})+)\}%/g,
    inputs: /%\{([^{}]+)\}/g,
    dropdown: /%\{(([^|{}]+\|?){2,4})\}/g, // От двух до четырех вариантов в дропдауне
  };

  onChange = value => {
    this.setState(() => ({ value, wrongExpression: false }));
  };

  addExpression = (e) => {
    e.persist();
    const { kind } = this.props;
    const value = String(this.state.value);
    const mainRegexp = this.RegExps.b2t;
    const kindRegexp = this.RegExps[kind];
    const isValid = mainRegexp.test(value) && kindRegexp.test(value);
    const isUnique = this.props.general.expressions.every(exp => exp.value !== value);
    console.log(isValid, isUnique, value)
    if (isValid && isUnique) {
      const expression = {
        question: '',
        answers: {},
      };

      let charCode = 97;
      expression.question = value.replace(mainRegexp, (b2tPlace, b2texp) => {
        const question = b2texp.replace(kindRegexp, (str, match) => {
          const char = String.fromCharCode(charCode);
          console.log(char, str, match);
          if (kind === 'inputs') {
            expression.answers[char] = match;
          } else if (kind === 'dropdown') {
            expression.answers[char] = {
              values: [],
              expected: null,
            };

            str.replace(/\{?([^|{}]+)(?:\}|\|)/g, (raw, variant) => {
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

        return question;
      });

      expression.value = value.replace(mainRegexp, (b2tPlace, b2texp) => {
        return b2texp.replace(kindRegexp, `${kind.substr(0,2)}($1)`);
      });
      this.props.dispatch(addExpression(expression));
      console.log(expression);
    } else if (isUnique) {
      this.setState({ wrongExpression: true });
    }
  };

  render() {
    const { kind } = this.props;
    const { wrongExpression, value } = this.state;

    let warningText = '"%b2t{%{значение}}%"';
    switch (kind) {
      case 'inputs':
        warningText = '"%b2t{%{значение}}%"';
        break;

      case 'dropdown':
        warningText = '"%b2t{%{значение|правильное*|значение}}%"';
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
            {`Ожидаемое выражение: ${warningText}`}
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
