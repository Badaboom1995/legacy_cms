import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { InlineMath, BlockMath } from 'react-katex';
import { array } from 'prop-types';

class TextUtilit {
  static get RegExps() {
    return {
      markdown: /%m\{((?:.|\n)+?)\}%/g,
      latex: /%l\{(.+?)\}%/g,
      b2t: /%b2t\{((?:.)*?(%\{.*?\})+(?:.)*?)\}%/g,
      customExp: /%(?:b2t|l|m)\{.+?\}%/g,
      bold: /(?:\*\*|__)((?:.|\n)+)(?:\*\*|__)/g,
      italic: /(?:\*|_)((?:.|\n)+)(?:\*|_)/g,
      inputs: /%\{([^|]*?)\}/g,
      dropdown: /%\{(([^|]+?\|?){2,7})\}/g,
      dropdownInner: /\{?([^|{}]+)(?:\}|\|)/g,
      numericOnly: /^[0-9,+−]+$/g,
      notNumeric: /[^0-9,+−]/g,
      text: /[^0-9]/g,
      number: /^[+-−]?\d+((,|\.)\d+)?$/,
      rawNumber: /((?:−|-)?\d+(?:\.|,)?(?:\d+)?)/g,
      textWrap: /\n/g,
    }
  };

  static get Kinds() {
    return ['inputs', 'dropdown'];
  }

  static handleText(text) {
    const { markdown, latex, b2t, rawNumber, textWrap } = this.RegExps;
    let result = text;
    let needParse = false;

    if (rawNumber.test(text)) {
      result = this.handleSymbolsToLatex(result);
    }

    if (b2t.test(text)) {
      result = this.createB2tText(result);
    }

    if (markdown.test(result)) {
      result = this.createMarkdownText(result);
      needParse = true;
    }

    if (textWrap.test(result)) {
      result = this.createWrapText(result);
      needParse = true;
    }

    if (latex.test(result)) {
      result = this.createLatexText(result, needParse);
    } else if (needParse) {
      result = ReactHtmlParser(result)
    }

    return result;
  }

  static createB2tText(text) {
    const { b2t } = this.RegExps;
    let result = text;
    result = result.replace(b2t, (b2tPlace, b2texp) => {
      let r = b2texp;
      this.Kinds.forEach((kind) => {
        const kindRegexp = this.RegExps[kind];
        if (kindRegexp.test(r)) {
          r = r.replace(kindRegexp, `${kind.substr(0,2)}($1)`);
        }
      });
      return r;
    });

    return result;
  }

  // Функция обработки текста из человеческого в b2t-формат
  static unhandleText(text) {
    let result = text;
    this.Kinds.forEach((kind) => {
      const regex = new RegExp(`${kind.substr(0,2)}\\((.*?)\\)`, 'g');
      if (regex.test(result)) {
        result = result.replace(regex, '%b2t{%{$1}}%');
      }
    });
    return result;
  }

  static createMarkdownText(text) {
    const { markdown, bold, italic } = this.RegExps;

    let result = text;
    result = result.replace(markdown, (markdownPlace, markdownExp) => {
      let r = markdownExp;
      if (bold.test(text)) {
        r = r.replace(bold, '<strong>$1</strong>');
      }

      if (italic.test(text)) {
        r = r.replace(italic, '<em>$1</em>');
      }
      return r;
    });

    return result;
  }

  static createWrapText(text) {
    const { textWrap } = this.RegExps;
    const handledText = text.replace(textWrap, '<br>');

    return handledText;
  }

  static createLatexText(text, needParse = false) {
    const { latex } = this.RegExps;
    const content = [];
    let prevOffset = 0;
    // const lastMatch = text.match(latex).pop();
    text.replace(latex, (str, latexExp, offset) => {
      // console.log(str, latexExp, offset, targetStr)
      // const stringParts = text.split(str);
      // if (prevOffset) {
      //   const subPart = stringParts[0].split(prevExp)[1];
      //   stringParts[0] = subPart;
      // }

      // let [beforeText, afterText] = stringParts;
      let beforeText = text.substring(prevOffset, offset);
      let afterText = text.substring(offset + str.length);
      const isLast = (afterText.search(latex) === -1);
      if (needParse) {
        beforeText = ReactHtmlParser(beforeText);
        afterText = ReactHtmlParser(afterText);
      }

      content.push(
        <React.Fragment key={latexExp + offset}>
          {beforeText}
          <InlineMath>{latexExp}</InlineMath>
          {isLast ? afterText : ''}
        </React.Fragment>,
      );

      prevOffset = offset + str.length;
    });
    return content;
  }

  static handleSymbolsToLatex(text) {
    const { rawNumber, customExp } = this.RegExps;
    let result = text;
    if (text.search(customExp) !== -1) {
      result = this.handleExclusions(text);
    } else {
      result = result.replace(rawNumber, '%l{$1}%');
    }

    return result;
  }

  static handleExclusions(text) {
    const { customExp, rawNumber } = this.RegExps;
    let result = text;
    if (text.search(customExp) !== -1) {
      const allExps = [];
      text.replace(customExp, (str) => {
        allExps.push(str);
      });
      const allRest = text.split(customExp).map(textPart => textPart.replace(rawNumber, '%l{$1}%'));
      result = allRest.map((txt1) => {
        const txt2 = allExps.shift();
        const res = (txt2 !== undefined) ? txt1+txt2 : txt1;
        return res;
      }).join('');
      if (allExps.length > 0) result += allExps.join('');
    }

    return result;
  }

  static handleNumber(text) {
    const result = text
      .replace('.', ',')
      .replace(/(-|–)/g, '−')
      .replace(/(,.*)(,|\.)/g, '$1');

    return result;
  }

  static validateExpression(expression, kind) {
    const mainRegexp = this.RegExps.b2t;
    const kindRegexp = this.RegExps[kind];
    if (!kindRegexp) {
      console.warn(`Wrong kind, expected one of: ${this.Kinds.join(', ')}`);
      return false;
    }

    const isValid = mainRegexp.test(expression) && kindRegexp.test(expression);
    return isValid;
  }
}

export default TextUtilit;
