import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class SimplePage extends ContentItem {
  static codeName = 'simple_page';
  name!: Elements.TextElement;
  hero_image!: Elements.AssetsElement;
  heading!: Elements.TextElement;
  content!: Elements.RichTextElement;
}
