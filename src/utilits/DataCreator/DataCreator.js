import TextUtilit from 'utilits/TextUtilit/TextUtilit';

const FIRST_CHAR_CODE = 97;

class DataCreator {
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

    data.value = rawValue.replace(RegExps.b2t, (b2tPlace, b2texp) => {
      return b2texp.replace(RegExps.inputs, `in($1)`);
    }).replace(/−/g, '-');  // - Katex от минуса падает :/

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
      const question = b2texp.replace(RegExps.dropdown, (str, match) => {
        const char = String.fromCharCode(charCode);
        data.answers[char] = {
          values: [],
          expected: null,
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

    data.value = rawValue.replace(RegExps.b2t, (b2tPlace, b2texp) => {
      return b2texp.replace(RegExps.dropdown, `dr($1)`);
    }).replace(/−/g, '-');  // - Katex от минуса падает :/

    return data;
  }
}

export default new DataCreator();
