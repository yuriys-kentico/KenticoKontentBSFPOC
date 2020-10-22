import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { NavigationItem } from '../NavigationItem';

export class CtaSection extends ContentItem {
  static codeName = 'cta_section';
  hero_image!: Elements.AssetsElement;
  heading!: Elements.TextElement;
  cta_link!: Elements.LinkedItemsElement<NavigationItem>;
}
