import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { Page } from './Page';
import { SimplePage } from './SimplePage';

export class PageLink extends ContentItem {
  static codeName = 'page_link';
  page!: Elements.LinkedItemsElement<Page | SimplePage | undefined>;
  name_override!: Elements.TextElement;
  url!: Elements.UrlSlugElement;

  constructor() {
    super({
      urlSlugResolver: (link, context) => {
        return { url: link.urlSlug };
      },
    });
  }
}
