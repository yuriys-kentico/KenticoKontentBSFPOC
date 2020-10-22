import { createContext } from 'react';

import { IDeliveryClient } from '@kentico/kontent-delivery';

import { Site } from '../models/Site';

export interface ISiteContext {
  deliveryClient: IDeliveryClient;
  site: Site;
  preview: boolean;
  updateSmartLinks: () => void;
}

export const SiteContext = createContext<ISiteContext>({
  deliveryClient: {} as IDeliveryClient,
  site: {} as Site,
  preview: false,
  updateSmartLinks: () => {},
});
