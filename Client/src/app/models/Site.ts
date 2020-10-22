import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { ImageLink } from './ImageLink';
import { NavigationItem } from './NavigationItem';
import { NavigationSection } from './NavigationSection';

export class Site extends ContentItem {
  static codeName = 'site';
  name!: Elements.TextElement;
  logo!: Elements.LinkedItemsElement<ImageLink>;
  hero_navigation_items!: Elements.LinkedItemsElement<NavigationItem>;
  navigation_sections!: Elements.LinkedItemsElement<NavigationSection>;
  navigation_ctas!: Elements.LinkedItemsElement<NavigationSection>;
  footer_navigation_items!: Elements.LinkedItemsElement<NavigationItem>;
  goodbye_links!: Elements.LinkedItemsElement<NavigationItem>;
  social_links!: Elements.LinkedItemsElement<NavigationItem>;
  goodbye_heading!: Elements.TextElement;
  copyright!: Elements.TextElement;
}
