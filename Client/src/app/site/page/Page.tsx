import React, { useContext, useMemo } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { useObservable, useObservableEffect } from '../../../utilities/observables';
import { RoutedFC } from '../../../utilities/routing';
import { Loading } from '../../Loading';
import { CtaSection as CtaSectionModel } from '../../models/components/CtaSection';
import { ImageSection as ImageSectionModel } from '../../models/components/ImageSection';
import { Page as PageModel } from '../../models/Page';
import { PageLink } from '../../models/PageLink';
import { SimplePage } from '../../models/SimplePage';
import { SiteContext } from '../../shared/SiteContext';
import { useComponents } from '../useComponents';
import { CtaSection } from './components/CtaSection';
import { ImageSection } from './components/ImageSection';

interface IPageProps {
  urlSlug: string;
  itemId: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '0 auto 20px auto',
      maxWidth: 1440,
      '& > p': {
        maxWidth: 800,
        padding: '0 80px',
        margin: '0 120px 40px',
      },
    },
    simpleRoot: {
      margin: '50px auto 20px auto',
      maxWidth: 1200,
      display: 'flex',
    },
    content: { margin: '100px 25px 0', flex: 1 },
    heroImage: {
      height: 400,
      overflow: 'hidden',
      position: 'relative',
      padding: 0,
    },
    simpleHeroImage: { flex: 2, height: 400, overflow: 'hidden', position: 'relative', padding: 0 },
    heroImageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,.05)',
      zIndex: 4,
    },
    heroImageImage: { transform: 'translate(0, -25%)' },
    heading: {
      margin: '-150px 120px 0',
      padding: '60px 80px 0',
      zIndex: 5,
      position: 'relative',
      backgroundColor: '#fff',
      maxWidth: 800,
    },
  })
);

export const Page: RoutedFC<IPageProps> = ({ urlSlug, itemId, navigate }) => {
  const styles = useStyles();

  const { deliveryClient } = useContext(SiteContext);

  const [richTextResolver, parse] = useComponents((item) => {
    switch (item.system.type) {
      case ImageSectionModel.codeName:
        return <ImageSection imageSection={item as ImageSectionModel} />;
      case CtaSectionModel.codeName:
        return <CtaSection ctaSection={item as CtaSectionModel} />;
    }
  });

  const pageLinks = useObservable(
    deliveryClient
      .items<PageLink>()
      .type(PageLink.codeName)
      .equalsFilter('elements.url', urlSlug ?? '')
      .depthParameter(6)
      .queryConfig({
        richTextResolver,
      })
      .toObservable(),
    [urlSlug]
  )?.items;

  const itemIdPage = useObservableEffect(() => {
    if (itemId) {
      return deliveryClient
        .items<PageModel>()
        .type(PageModel.codeName)
        .equalsFilter('system.id', itemId)
        .depthParameter(6)
        .queryConfig({
          richTextResolver,
        })
        .toObservable();
    }
  }, [itemId])?.items;

  const page = useMemo(() => {
    if ((pageLinks && itemId && itemIdPage) || (pageLinks && !itemId)) {
      if (pageLinks[0]?.page.value[0]) {
        return pageLinks[0].page.value[0];
      }

      if (itemIdPage?.[0]) {
        return itemIdPage[0];
      }

      navigate && navigate('/not-found', { replace: true });
    }
  }, [pageLinks, itemId, itemIdPage, navigate]);

  return (
    <>
      {!page && <Loading />}
      {page instanceof PageModel && (
        <main className={styles.root}>
          <div className={styles.heroImage}>
            <div className={styles.heroImageOverlay} />
            <img
              className={styles.heroImageImage}
              src={page.hero_image.value[0].url}
              alt={page.hero_image.value[0].name}
            />
          </div>
          <div className={styles.heading}>
            <h5>{page.name.value}</h5>
            <h2>{page.heading.value}</h2>
          </div>
          {parse(page.content.resolveHtml())}
        </main>
      )}
      {page instanceof SimplePage && (
        <main className={styles.simpleRoot}>
          <div className={styles.content}>
            <h5>{page.name.value}</h5>
            <h2>{page.heading.value}</h2>
            {parse(page.content.resolveHtml())}
          </div>
          <div className={styles.simpleHeroImage}>
            <img
              className={styles.heroImageImage}
              src={page.hero_image.value[0].url}
              alt={page.hero_image.value[0].name}
            />
          </div>
        </main>
      )}
    </>
  );
};
