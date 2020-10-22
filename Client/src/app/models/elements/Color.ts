import { ElementModels, Elements } from '@kentico/kontent-delivery';

export class Color extends Elements.CustomElement {
  hex: string;

  constructor(elementWrapper: ElementModels.IElementWrapper) {
    super(elementWrapper);

    const value = elementWrapper.rawElement.value;
    const parsed = JSON.parse(value) as string | null;

    if (parsed) {
      this.hex = parsed;
    } else {
      this.hex = '';
    }
  }
}
