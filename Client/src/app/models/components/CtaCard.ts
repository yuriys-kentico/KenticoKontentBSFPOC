import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { NavigationItem } from '../NavigationItem';

export class CtaCard extends ContentItem {
  static codeName = 'cta_card';
  hero_image!: Elements.AssetsElement;
  heading!: Elements.TextElement;
  content!: Elements.RichTextElement;
  cta_link!: Elements.LinkedItemsElement<NavigationItem>;
}
