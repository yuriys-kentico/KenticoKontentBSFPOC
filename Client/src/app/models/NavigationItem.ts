import { ContentItem, Elements } from '@kentico/kontent-delivery';

import { FontAwesomeIcon } from './elements/FontAwesomeIcon';
import { ExternalLink } from './ExternalLink';
import { ImageLink } from './ImageLink';
import { PageLink } from './PageLink';

export enum NavigationItemMode {
  spacer = 'spacer',
  link = 'link',
  label = 'label',
}

export enum NavigationItemOptions {
  all_caps = 'all_caps',
  bold = 'bold',
  highlight = 'highlight',
  open_in_new_window = 'open_in_new_window',
}

export class NavigationItem extends ContentItem {
  static codeName = 'navigation_item';
  link!: Elements.LinkedItemsElement<ExternalLink | PageLink | ImageLink | undefined>;
  name_override!: Elements.TextElement;
  icon!: FontAwesomeIcon;
  mode!: Elements.MultipleChoiceElement;
  options!: Elements.MultipleChoiceElement;
}
