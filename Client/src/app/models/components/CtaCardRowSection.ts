import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class CtaCardRowSection extends ContentItem {
  static codeName = 'cta_card_row_section';
  cards!: Elements.RichTextElement;
}
