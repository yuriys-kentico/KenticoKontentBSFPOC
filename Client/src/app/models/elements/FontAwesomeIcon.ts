import { ElementModels, Elements } from '@kentico/kontent-delivery';

export class FontAwesomeIcon extends Elements.CustomElement {
  icon: string;

  constructor(elementWrapper: ElementModels.IElementWrapper) {
    super(elementWrapper);

    const value = elementWrapper.rawElement.value;
    const parsed = JSON.parse(value) as { value: any[] } | null;

    if (parsed?.value.length) {
      this.icon = parsed.value[0].icon;
    } else {
      this.icon = '';
    }
  }
}
