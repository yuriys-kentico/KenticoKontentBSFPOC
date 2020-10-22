import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class ExternalLink extends ContentItem {
  static codeName = 'external_link';
  url!: Elements.TextElement;
}
