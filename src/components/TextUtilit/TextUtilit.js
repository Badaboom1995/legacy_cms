import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { InlineMath, BlockMath } from 'react-katex';
import { array } from 'prop-types';

class TextUtilit {
  static get RegExps() {
    return {
      markdown: /%m\{(.+?)\}%/g,
      latex: /%l\{(.+?)\}%/g,
      b2t: /%b2t\{((?:.)*?(%\{.+?\})+(?:.)*?)\}%/g,
      customExp: /%(?:b2t|l|m)\{.+?\}%/g,
      bold: /(?:\*\*|__)(.+)(?:\*\*|__)/g,
      italic: /(?:\*|_)(.+)(?:\*|_)/g,
      inputs: /%\{([^|]+?)\}/g,
      dropdown: /%\{(([^|]+?\|?){2,4})\}/g,
      dropdownInner: /\{?([^|{}]+)(?:\}|\|)/g,
      numericOnly: /^[0-9.,+−]+$/g,
      notNumeric: /[^0-9.,+−]/g,
      text: /[^0-9]/g,
      number: /(−?\d+(\.|,)?(\d+)?)/g,
      rawNumber: /(−?\d+(?:\.|,)?(?:\d+)?)/g,
    }
  };

  static get Kinds() {
    return ['inputs', 'dropdown'];
  }

  static handleText(text) {
    const { markdown, latex, b2t, rawNumber } = this.RegExps;
    let result = text;
    let needParse = false;

    if (rawNumber.test(text)) {
      result = this.handleSymbolsToLatex(result);
    }

    if (b2t.test(text)) {
      result = this.createB2tText(result);
    }

    if (markdown.test(result)) {
      result = this.createMarkdownText(text);
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

  static createMarkdownText(text) {
    const { markdown, bold, italic } = this.RegExps;

    let handledText = text.replace(markdown, '$1');
    if (bold.test(text)) {
      handledText = handledText.replace(bold, '<strong>$1</strong>');
    }

    if (italic.test(text)) {
      handledText = handledText.replace(italic, '<em>$1</em>');
    }

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

  static styleText(text) {
    const { bold, italic } = this.RegExps;

    let handledText = text;
    if (bold.test(text)) {
      handledText = handledText.replace(bold, '<strong>$1</strong>');
    }

    if (italic.test(text)) {
      handledText = handledText.replace(italic, '<em>$1</em>');
    }
    const result = (handledText === text) ? text : ReactHtmlParser(handledText);
    return result;
  }

  static handleSymbolsToLatex(text) {
    const { rawNumber, customExp } = this.RegExps;
    let result = text;
    if (text.search(customExp) !== -1) {
      result = this.handleExclusions(text);
    } else {
      result = result.replace(rawNumber, '%l{$1}%');
    }

    console.log(result)
    return result;
  }

  static handleExclusions(text) {
    const { customExp, rawNumber } = this.RegExps;
    let result = text;
    if (text.search(customExp) !== -1) {
      const offsets = [];
      const allExps = [];
      console.log(text.split(customExp));
      text.replace(customExp, (str, m, offset) => {
        offsets.push(offset);
        allExps.push(str);
      });

      const allRest = text.split(customExp).map(textPart => textPart.replace(rawNumber, '%l{$1}%'));
      const firstArr = (offsets[0] === 0) ? allExps : allRest;
      const secondArr = (offsets[0] === 0) ? allRest : allExps;
      console.log(firstArr, secondArr, offsets);
      result = firstArr.map((txt1, id) => {
        const txt2 = secondArr.shift()
        const res = (txt2 !== undefined) ? txt1+txt2 : txt1;
        return res;
      }).join('');
      if (secondArr.length > 0) result += secondArr.join('');
    }

    console.log(result);
    return result;
  }

  static handleDecimal(text) {
    const { numeric } = this.RegExps;
    let result = text;
    if (numeric.test(text)) {
      result = text
        .replace('.', ',')
        .replace(/(,.*)(,|\.)/g, '$1');
    }
    return result;
  }
}

export default TextUtilit;
