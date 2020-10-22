import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class GoodbyeMessage extends ContentItem {
  static codeName = 'goodbye_message';
  heading_override!: Elements.TextElement;
  message!: Elements.TextElement;
}
