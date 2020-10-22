import '../../styles/site.scss';
import '@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css';

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { DeliveryClient, IDeliveryClient, TypeResolver } from '@kentico/kontent-delivery';
import KontentSmartLinks from '@kentico/kontent-smart-link';
import { createStyles, makeStyles } from '@material-ui/styles';
import { useLocalStorage } from '@rehooks/local-storage/lib/use-localstorage';

import { useObservableEffect } from '../../utilities/observables';
import { RoutedFC } from '../../utilities/routing';
import { Loading } from '../Loading';
import { Color } from '../models/elements/Color';
import { FontAwesomeIcon } from '../models/elements/FontAwesomeIcon';
import { ExternalLink } from '../models/ExternalLink';
import { ImageLink } from '../models/ImageLink';
import { NavigationColumn } from '../models/NavigationColumn';
import { NavigationItem } from '../models/NavigationItem';
import { NavigationSection } from '../models/NavigationSection';
import { Page } from '../models/Page';
import { PageLink } from '../models/PageLink';
import { SimplePage } from '../models/SimplePage';
import { Site as SiteModel } from '../models/Site';
import { LocalStorageKeys } from '../shared/LocalStorageKeys';
import { ISiteContext, SiteContext } from '../shared/SiteContext';
import { Footer } from './header/Footer';
import { Header } from './header/Header';
import { SetPreviewApiKey } from './SetPreviewApiKey';

interface ISiteProps {
  preview: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    headerBuffer: { width: '100%', height: 75 },
  })
);

export const Site: RoutedFC<ISiteProps> = ({ preview, children }) => {
  const styles = useStyles();

  const [deliveryClient, setDeliveryClient] = useState<IDeliveryClient>();
  const [previewApiKey] = useLocalStorage<string | undefined>(LocalStorageKeys.PreviewApiKey, undefined);

  const projectId = process.env.REACT_APP_PROJECTID;

  useEffect(() => {
    if (preview && !previewApiKey) {
      return;
    }

    if (projectId) {
      setDeliveryClient(
        new DeliveryClient({
          projectId,
          previewApiKey,
          globalQueryConfig: {
            usePreviewMode: preview,
          },
          typeResolvers: [
            new TypeResolver(SiteModel.codeName, () => new SiteModel()),
            new TypeResolver(NavigationSection.codeName, () => new NavigationSection()),
            new TypeResolver(NavigationColumn.codeName, () => new NavigationColumn()),
            new TypeResolver(NavigationItem.codeName, () => new NavigationItem()),
            new TypeResolver(ImageLink.codeName, () => new ImageLink()),
            new TypeResolver(PageLink.codeName, () => new PageLink()),
            new TypeResolver(ExternalLink.codeName, () => new ExternalLink()),
            new TypeResolver(Page.codeName, () => new Page()),
            new TypeResolver(SimplePage.codeName, () => new SimplePage()),
          ],
          elementResolver: (elementWrapper) => {
            switch (elementWrapper.contentItemSystem.type) {
              case NavigationItem.codeName:
                switch (elementWrapper.propertyName) {
                  case 'icon':
                    return new FontAwesomeIcon(elementWrapper);
                }
                break;
              case NavigationSection.codeName:
                switch (elementWrapper.propertyName) {
                  case 'theme':
                    return new Color(elementWrapper);
                }
                break;
            }

            return undefined;
          },
        })
      );
    }
  }, [projectId, preview, previewApiKey]);

  const site = useObservableEffect(() => {
    if (deliveryClient) {
      return deliveryClient.items<SiteModel>().type(SiteModel.codeName).depthParameter(6).toObservable();
    }
  }, [deliveryClient])?.items[0];

  const updateSmartLinks = useCallback(() => {
    if (projectId) {
      setTimeout(() => {
        KontentSmartLinks.initialize({ projectId, languageCodename: 'default' });
      }, 300);
    }
  }, [projectId]);

  useLayoutEffect(() => site && updateSmartLinks(), [site, updateSmartLinks]);

  if (preview && !previewApiKey) {
    return <SetPreviewApiKey />;
  }

  if (!(deliveryClient && site)) {
    return <Loading />;
  }

  const siteContext: ISiteContext = {
    deliveryClient,
    site,
    preview: preview ?? false,
    updateSmartLinks,
  };

  return (
    <SiteContext.Provider value={siteContext}>
      <Header />
      <div className={styles.headerBuffer} />
      {children}
      <Footer />
    </SiteContext.Provider>
  );
};
