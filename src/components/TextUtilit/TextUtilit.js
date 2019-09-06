import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { InlineMath, BlockMath } from 'react-katex';

class TextUtilit {
  static get RegExps() {
    return {
      markdown: /%m\{(.+?)\}%/g,
      latex: /%l\{(.+?)\}%/g,
      b2t: /%b2t\{((?:.)*?(%\{.+?\})+(?:.)*?)\}%/g,
      bold: /(?:\*\*|__)(.+)(?:\*\*|__)/g,
      italic: /(?:\*|_)(.+)(?:\*|_)/g,
      inputs: /%\{([^|]+?)\}/g,
      dropdown: /%\{(([^|]+?\|?){2,4})\}/g,
      dropdownInner: /\{?([^|{}]+)(?:\}|\|)/g,
      numeric: /^[0-9.,+−]+$/g,
      notNumeric: /[^0-9.,+−]/g,
      text: /[^0-9]/g,
      notText: /^[0-9]+$/g,
      decimal: /\d+(\.|,)(\d+)?/,
    }
  };

  static get Kinds() {
    return ['inputs', 'dropdown'];
  }

  static handleText(text) {
    const { markdown, latex, b2t } = this.RegExps;
    let result = text;
    let needParse = false;

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
    let prevExp;
    const lastMatch = text.match(latex).pop();
    text.replace(new RegExp(latex), (str, latexExp) => {
      const stringParts = text.split(str);
      if (prevExp) {
        const subPart = stringParts[0].split(prevExp)[1];
        stringParts[0] = subPart;
      }

      const [beforeText, afterText] = stringParts;
      content.push(
        <React.Fragment key={latexExp}>
          {needParse ? ReactHtmlParser(beforeText) : beforeText}
          <InlineMath>{latexExp}</InlineMath>
          {(str === lastMatch)
          ? (needParse ? ReactHtmlParser(afterText) : afterText)
          : ''}
        </React.Fragment>,
      );

      prevExp = str;
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

  static handleDecimal(text) {
    const { numeric, decimal } = this.RegExps;
    let result = text;
    if (numeric.test(text) && decimal.test(text)) {
      result = text
        .replace('.', ',')
        .replace(/(,.*)(,|\.)/g, '$1');
    }
    return result;
  }
}

export default TextUtilit;
