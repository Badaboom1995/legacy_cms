import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { InlineMath, BlockMath } from 'react-katex';

class TextUtilit {
  RegExps = {
    markdown: /%m\{(.+?)\}%/g,
    latex: /%l\{(.+?)\}%/g,
    bold: /(?:\*\*|__)(.+)(?:\*\*|__)/g,
    italic: /(?:\*|_)(.+)(?:\*|_)/g,
  };

  handleText(text) {
    const { markdown, latex } = this.RegExps;
    let result = text;
    let needParse = false;
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

  createMarkdownText(text) {
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

  createLatexText(text, needParse = false) {
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
        <React.Fragment>
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

  styleText(text) {
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
}

export default new TextUtilit();
