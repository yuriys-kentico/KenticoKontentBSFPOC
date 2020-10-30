import React, { useContext, useLayoutEffect } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { nameof } from '../../../utilities/objects';
import { useObservable } from '../../../utilities/observables';
import { RoutedFC } from '../../../utilities/routing';
import { Loading } from '../../Loading';
import { CtaCard as CtaCardModel } from '../../models/components/CtaCard';
import { CtaCardRowSection as CtaCardRowSectionModel } from '../../models/components/CtaCardRowSection';
import { CtaRowSection as CtaRowSectionModel } from '../../models/components/CtaRowSection';
import { VimeoVideoSection as VimeoVideoSectionModel } from '../../models/components/VimeoVideoSection';
import { HomePage as HomePageModel } from '../../models/HomePage';
import { SiteContext } from '../../shared/SiteContext';
import { NavigationItem } from '../header/NavigationItem';
import { useComponents } from '../useComponents';
import { CtaCard } from './components/CtaCard';
import { CtaCardRowSection } from './components/CtaCardRowSection';
import { CtaRowSection } from './components/CtaRowSection';
import { VimeoVideoSection } from './components/VimeoVideoSection';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: '0 auto 20px auto',
      textAlign: 'center',
    },
    content: {
      '& > p': {
        maxWidth: 800,
        padding: '0 80px',
        margin: '0 120px 40px',
      },

      '& > h2': {
        maxWidth: 1200,
        margin: '50px auto',
      },
    },
    banner: {
      padding: '10px 0',
      backgroundImage: 'linear-gradient(180deg, #ffffff 85%, #d3d3d3 100%) !important',
      '&  p': {
        margin: '0',
        maxWidth: 'initial',
      },
    },
    heroImage: {
      height: 460,
      overflow: 'hidden',
      position: 'relative',
      maxWidth: 1440,
      margin: '0 auto 60px auto',
    },
    heroImageImage: { transform: 'translate(0, -25%)', width: '100%' },
    ctaLink: {
      color: '#fff',
      borderRadius: 15,
      border: '1px solid #fff !important',
      position: 'absolute',
      bottom: 30,
      zIndex: 5,
      transform: 'translate(-50%, 0)',
      padding: '.3em 1em',

      '&:hover': {
        color: '#fff',
        marginBottom: 5,
      },
    },
  })
);

export const HomePage: RoutedFC = () => {
  const styles = useStyles();

  const { deliveryClient, preview, updateSmartLinks } = useContext(SiteContext);

  const [richTextResolver, parse] = useComponents((item, parse) => {
    switch (item.system.type) {
      case CtaCardRowSectionModel.codeName:
        return <CtaCardRowSection ctaCardRowSection={item as CtaCardRowSectionModel} parse={parse} />;
      case CtaRowSectionModel.codeName:
        return <CtaRowSection ctaRowSection={item as CtaRowSectionModel} />;
      case CtaCardModel.codeName:
        return <CtaCard ctaCard={item as CtaCardModel} />;
      case VimeoVideoSectionModel.codeName:
        return <VimeoVideoSection vimeoVideoSection={item as VimeoVideoSectionModel} />;
    }
  });

  const page = useObservable(
    deliveryClient
      .items<HomePageModel>()
      .type(HomePageModel.codeName)
      .depthParameter(6)
      .queryConfig({
        richTextResolver,
      })
      .toObservable(),
    []
  )?.items[0];

  useLayoutEffect(() => page && updateSmartLinks(), [page, updateSmartLinks]);

  return (
    <>
      {!page && <Loading />}
      {page && (
        <>
          {preview && (
            <main className={styles.root}>
              {page.banner.value !== '<p><br></p>' && (
                <div
                  className={styles.banner}
                  data-kontent-item-id={page.system.id}
                  data-kontent-element-codename={nameof(page).banner}
                >
                  {parse(page.banner.value)}
                </div>
              )}
              <div
                className={styles.heroImage}
                data-kontent-item-id={page.system.id}
                data-kontent-element-codename={nameof(page).hero_image}
              >
                <img
                  className={styles.heroImageImage}
                  src={page.hero_image.value[0].url}
                  alt={page.hero_image.value[0].name}
                />
                <NavigationItem className={styles.ctaLink} navigationItem={page.cta_link.value[0]} />
              </div>

              <div
                className={styles.content}
                data-kontent-item-id={page.system.id}
                data-kontent-element-codename={nameof(page).content}
              >
                {parse(page.content.resolveHtml())}
              </div>
            </main>
          )}
          {!preview && (
            <main className={styles.root}>
              {page.banner.value && <div className={styles.banner}>{parse(page.banner.value)}</div>}
              <div className={styles.heroImage}>
                <img
                  className={styles.heroImageImage}
                  src={page.hero_image.value[0].url}
                  alt={page.hero_image.value[0].name}
                />
                <NavigationItem className={styles.ctaLink} navigationItem={page.cta_link.value[0]} />
              </div>
              <div className={styles.content}>{parse(page.content.resolveHtml())}</div>
            </main>
          )}
        </>
      )}
    </>
  );
};
