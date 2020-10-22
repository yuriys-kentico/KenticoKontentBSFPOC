import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class ImageLink extends ContentItem {
  static codeName = 'image_link';
  image!: Elements.AssetsElement;
  width!: Elements.NumberElement;
  name_override!: Elements.TextElement;
  url!: Elements.UrlSlugElement;
}
