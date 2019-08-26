import React from 'react';
import ReactMarkdown from 'react-markdown';

class TextUtilit {
  RegExps = {
    bold: /%bf{([^}]+)}/g,
    italic: /%it{([^}]+)}/g,
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
    return <ReactMarkdown source={text} />
  }
}

export default new TextUtilit();
