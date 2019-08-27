import React from 'react';
import ReactHtmlParser from 'react-html-parser';

class TextUtilit {
  RegExps = {
    bold: /(?:\*\*|__)(.+)(?:\*\*|__)/g,
      italic: /(?:\*|_)(.+)(?:\*|_)/g,
  };

  createMarkdownText(text) {
    let handledText = text;
    const { bold, italic } = this.RegExps;
    if (text.search(bold) !== -1) {
      handledText = handledText.replace(bold, '**$1**');
    }
    if (text.search(italic) !== -1) {
      handledText = handledText.replace(italic, '_$1_');
    }

    return handledText;
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
