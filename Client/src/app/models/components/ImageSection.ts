import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class ImageSection extends ContentItem {
  static codeName = 'image_section';
  hero_image!: Elements.AssetsElement;
  heading!: Elements.TextElement;
  content!: Elements.RichTextElement;
}
