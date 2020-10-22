import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { NavigationItem } from '../NavigationItem';

export class CtaRowSection extends ContentItem {
  static codeName = 'cta_row_section';
  hero_image!: Elements.AssetsElement;
  name!: Elements.TextElement;
  heading!: Elements.TextElement;
  cta_link!: Elements.LinkedItemsElement<NavigationItem>;
}
