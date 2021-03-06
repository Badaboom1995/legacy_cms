import TextUtilit from 'utilits/TextUtilit/TextUtilit';

const FIRST_CHAR_CODE = 97;

class DataCreator {
  DropdownTypes = {
    h: 'horizontal',
    v: 'vertical',
  }

  createData = (string, kind) => {
    if (!TextUtilit.validateExpression(string, kind)) {
      console.warn('Expression string is not valid!');
      return false;
    }

    switch (kind) {
      case 'inputs': return this.createInputsData(string);
      case 'dropdown': return this.createDropdownData(string);
      default: return null;
    }
  }

  createInputsData = (string) => {
    const { RegExps } = TextUtilit;
    const data = {
      question: '',
      answers: {},
    };

    let rawValue = string;
    let charCode = FIRST_CHAR_CODE;
    data.question = string.replace(RegExps.b2t, (b2tPlace, b2texp) => {
      const question = b2texp.replace(RegExps.inputs, (str, match) => {
        const char = String.fromCharCode(charCode);
        const inputType = (match.search(RegExps.number) !== -1) ? 'numeric' : 'text';
        const inputValue = (inputType === 'numeric' ? TextUtilit.handleNumber(match) : match);

        rawValue = rawValue.replace(match, inputValue);
        data.answers[char] = inputValue;

        charCode++;
        return `%\{${char}}`;
      });

      return question;
    });

    rawValue = rawValue.replace(RegExps.b2t, (b2tPlace) => {
      return TextUtilit.convertB2tToText(b2tPlace);
    });
    data.value = this._replaceNonReadableForKatex(rawValue);

    return data;
  }

  createDropdownData = (string) => {
    const { RegExps } = TextUtilit;
    const data = {
      question: '',
      answers: {},
    };

    let rawValue = string;
    let charCode = FIRST_CHAR_CODE;
    data.question = string.replace(RegExps.b2t, (b2tPlace, b2texp) => {
      const question = b2texp.replace(RegExps.dropdown, (str, typeLetter, match) => {
        const char = String.fromCharCode(charCode);
        data.answers[char] = {
          values: [],
          expected: null,
          type: this.DropdownTypes[typeLetter],
        };

        str.replace(RegExps.dropdownInner, (raw, variant) => {
          let ddValue = variant;
          if (variant.slice(-1) === '*') {
            ddValue = variant.slice(0, -1);
            data.answers[char].expected = ddValue;
          }
          data.answers[char].values.push(ddValue);
        });

        charCode++;
        return `%\{${char}}`;
      });

      return question;
    });

    rawValue = rawValue.replace(RegExps.b2t, (b2tPlace) => {
      return TextUtilit.convertB2tToText(b2tPlace);
    });
    data.value = this._replaceNonReadableForKatex(rawValue);

    return data;
  }

  getWarningText = (kind) => {
    let warningText = '"%b2t{%{значение}}%"';
    switch (kind) {
      case 'inputs':
        warningText = '"%b2t{%{значение}}%"';
        break;

      case 'dropdown':
        warningText = '"%b2t{%(h/v){значение|правильное*|значение}}%"';
        break;
    }

    return warningText;
  }

  _replaceNonReadableForKatex = (string) => {
    const result = string.replace(/(–|−)/g, '-');
    return result;
  }
}

export default new DataCreator();
