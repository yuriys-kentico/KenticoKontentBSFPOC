import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { NavigationItem } from './NavigationItem';

export class NavigationColumn extends ContentItem {
  static codeName = 'navigation_column';
  navigation_items!: Elements.LinkedItemsElement<NavigationItem>;
}
