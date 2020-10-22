import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { Color } from './elements/Color';
import { NavigationColumn } from './NavigationColumn';
import { NavigationItem } from './NavigationItem';

export class NavigationSection extends ContentItem {
  static codeName = 'navigation_section';
  heading!: Elements.LinkedItemsElement<NavigationItem>;
  theme!: Color;
  flex!: Elements.NumberElement;
  navigation_columns!: Elements.LinkedItemsElement<NavigationColumn>;
}
