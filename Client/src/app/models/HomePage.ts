import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { NavigationItem } from './NavigationItem';

export class HomePage extends ContentItem {
  static codeName = 'home_page';
  banner!: Elements.RichTextElement;
  hero_image!: Elements.AssetsElement;
  cta_link!: Elements.LinkedItemsElement<NavigationItem>;
  content!: Elements.RichTextElement;
}
