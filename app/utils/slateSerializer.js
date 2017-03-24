import { Html } from 'slate';
import React from 'react';

import Type from './htmlConstants';

/**
 * This module exports a serializer for translating Slate State
 * to and from HTML.
 */

const BLOCK_TAGS = {
  p: Type.HTML_PARAGRAPH,
  li: Type.HTML_LIST_ITEM,
  ul: Type.HTML_UNORDERED_LIST,
  ol: Type.HTML_ORDERED_LIST,
  blockquote: Type.HTML_BLOCKQUOTE,
  pre: Type.HTML_CODE,
  h1: Type.HTML_H1,
  h2: Type.HTML_H2,
  h3: Type.HTML_H3,
  h4: Type.HTML_H4,
  h5: Type.HTML_H5,
  h6: Type.HTML_H6,
};

const MARK_TAGS = {
  strong: Type.HTML_BOLD,
  b: Type.HTML_BOLD,
  em: Type.HTML_ITALIC,
  i: Type.HTML_ITALIC,
  u: Type.HTML_UNDERLINE,
  s: Type.HTML_STRIKETHROUGH,
  code: Type.HTML_CODE,
  sup: Type.HTML_SUPERSCRIPT,
  sub: Type.HTML_SUBSCRIPT,
};

const SerializationError = (message) => ({ message });

/* eslint-disable consistent-return */
const RULES = [
  // block rules
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName];
      if (!block) return;
      return {
        kind: 'block',
        type: block,
        nodes: next(el.children),
      };
    },
    serialize(object, children) {
      if (object.kind !== 'block') return;
      switch (object.type) {
        case Type.HTML_PARAGRAPH: return <p>{children}</p>;
        case Type.HTML_LIST_ITEM: return <li>{children}</li>;
        case Type.HTML_UNORDERED_LIST: return <ul>{children}</ul>;
        case Type.HTML_ORDERED_LIST: return <ol>{children}</ol>;
        case Type.HTML_BLOCKQUOTE: return <blockquote>{children}</blockquote>;
        case Type.HTML_CODE: return <pre><code>{children}</code></pre>;
        case Type.HTML_H1: return <h1>{children}</h1>;
        case Type.HTML_H2: return <h2>{children}</h2>;
        case Type.HTML_H3: return <h3>{children}</h3>;
        case Type.HTML_H4: return <h4>{children}</h4>;
        case Type.HTML_H5: return <h5>{children}</h5>;
        case Type.HTML_H6: return <h6>{children}</h6>;
        default: throw new SerializationError(`Unknown block type: ${object.type}`);
      }
    },
  },
  // mark rules
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName];
      if (!mark) return;
      return {
        kind: 'mark',
        type: mark,
        nodes: next(el.children),
      };
    },
    serialize(object, children) {
      if (object.kind !== 'mark') return;
      switch (object.type) {
        case Type.HTML_BOLD: return <strong>{children}</strong>;
        case Type.HTML_ITALIC: return <em>{children}</em>;
        case Type.HTML_UNDERLINE: return <u>{children}</u>;
        case Type.HTML_STRIKETHROUGH: return <s>{children}</s>;
        case Type.HTML_CODE: return <code>{children}</code>;
        case Type.HTML_SUPERSCRIPT: return <sup>{children}</sup>;
        case Type.HTML_SUBSCRIPT: return <sub>{children}</sub>;
        default: throw new SerializationError(`Unknown mark type: ${object.type}`);
      }
    },
  },
  // inline rules
  {
    deserialize(el, next) {
      if (el.tagName !== 'a') return;
      return {
        kind: 'inline',
        type: Type.HTML_LINK,
        nodes: next(el.children),
        data: {
          href: el.attribs.href,
        },
      };
    },
    serialize(object, children) {
      if (object.kind !== 'inline') return;
      switch (object.type) {
        case Type.HTML_LINK: return <a href={object.data.get('href')}>{children}</a>;
        default: throw new SerializationError(`Unknown block type: ${object.type}`);
      }
    },
  },
  // Special case for code blocks, which need to grab the nested children.
  {
    deserialize(el, next) {
      if (el.tagName !== 'pre') return;
      const code = el.children[0];
      const children = code && code.tagName === 'code' ?
        code.children :
        el.children;

      return {
        kind: 'block',
        type: Type.HTML_CODE,
        nodes: next(children),
      };
    },
  },
];
/* eslint-enable consistent-return */


const serializer = new Html({
  rules: RULES,
  defaultBlockType: Type.HTML_PARAGRAPH,
});

export default serializer;
