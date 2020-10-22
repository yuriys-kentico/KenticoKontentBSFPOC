import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class Page extends ContentItem {
  static codeName = 'page';
  name!: Elements.TextElement;
  hero_image!: Elements.AssetsElement;
  heading!: Elements.TextElement;
  content!: Elements.RichTextElement;
}
