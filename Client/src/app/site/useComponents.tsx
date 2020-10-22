import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import React, { useMemo, useRef } from 'react';

import { IContentItem, ItemRichTextResolver } from '@kentico/kontent-delivery';

const itemid = 'itemid';

export const useComponents: (
  renderElement: (item: IContentItem, parse: (html: string) => JSX.Element | JSX.Element[]) => JSX.Element | undefined
) => [ItemRichTextResolver<IContentItem>, (html: string) => JSX.Element | JSX.Element[]] = (renderElement) => {
  const components = useRef<{ [key: string]: IContentItem }>({});

  // eslint-disable-next-line
  const parseWithOptions = (html: string): JSX.Element | JSX.Element[] => parse(html, options);

  const options: HTMLReactParserOptions = useMemo<HTMLReactParserOptions>(
    () => ({
      replace: ({ attribs, children }) => {
        if (attribs?.['class'] === 'kc-linked-item-wrapper' && children) {
          return <>{domToReact(children, options)}</>;
        }

        const itemId = attribs?.[itemid];

        if (itemId) {
          const item = components.current[itemId];

          components.current[item.system.id] = item;

          return renderElement(item, parseWithOptions);
        }
      },
    }),
    [renderElement, parseWithOptions]
  );

  return [
    (item: IContentItem) => {
      components.current[item.system.id] = item;

      return `<object ${itemid}="${item.system.id}"/>`;
    },
    parseWithOptions,
  ];
};
