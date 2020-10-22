import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class VimeoVideoSection extends ContentItem {
  static codeName = 'vimeo_video_section';
  vimeo_video!: Elements.TextElement;
  preview!: Elements.AssetsElement;
}
