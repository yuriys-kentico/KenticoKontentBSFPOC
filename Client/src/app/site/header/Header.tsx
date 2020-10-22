import clsx from 'clsx';
import React, { useContext, useLayoutEffect, useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { nameof } from '../../../utilities/objects';
import { RoutedFC } from '../../../utilities/routing';
import { SiteContext } from '../../shared/SiteContext';
import { NavigationItem } from './NavigationItem';

const useStyles = makeStyles(() =>
  createStyles({
    logo: {
      margin: 0,
      padding: '23px 0 20px 0',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    cover: {
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99,
      opacity: 0.9,
      display: 'none',
    },
    topLinks: {
      position: 'absolute',
      top: '1.4em',
      right: '2em',
      margin: '0 0 40px',
      color: '#5f6062',
      fontSize: 17,
      fontWeight: 300,
      lineHeight: 1.7,
      paddingTop: 0,

      '& div': {
        position: 'relative',
        display: 'inline-block',
        margin: 0,
        padding: 0,

        '&::after': {
          content: '"•"',
          position: 'absolute',
          top: '0.1em',
          right: '-1.3em',
          padding: '0 1em',
          color: '#4a4a4a',
          fontWeight: 400,
          opacity: 0.66,
          pointerEvents: 'none',
        },
      },
    },
    topLink: {
      padding: '0 1em',
      color: '#4a4a4a',
      letterSpacing: 0.5,

      '&:hover': {
        color: '$brand-orange;',
      },
    },
    menuOpen: { display: 'block !important' },
    menu: {
      maxWidth: '1320px',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 'calc(50% - 660px)',
      backgroundColor: '#ffffff',
      zIndex: 1,
      display: 'none',
    },
    navigationSections: { display: 'flex', margin: '90px calc(4.1666% - 5px) 0 calc(4.1666% + 5px)' },
    navigationSection: { '& + &': { marginLeft: 30 } },
    navigationSectionColumns: { paddingTop: 12, display: 'flex', fontSize: 15 },
    navigationSectionColumn: { flex: 1 },
    navigationSectionHeading: { paddingBottom: 15, color: '#56606d' },
    navigationCtas: { display: 'flex', marginTop: 20 },
    navigationCta: {
      '& + &': {
        borderLeft: '1px solid rgba(255,255,255,.5)',
      },
    },
    navigationCtaItem: {
      padding: '20px 0 20px 20px',
      width: '100%',
      color: '#fff !important',
      fontWeight: 500,
    },
  })
);

export const Header: RoutedFC = () => {
  const styles = useStyles();

  const { site, preview, updateSmartLinks } = useContext(SiteContext);

  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => site && updateSmartLinks(), [site, updateSmartLinks]);

  return (
    <>
      <div className={clsx(styles.cover, menuOpen && styles.menuOpen)} onClick={() => setMenuOpen(!menuOpen)} />
      <header>
        <div className='container'>
          <div id='menu-icon' className={clsx(menuOpen && 'active')} onClick={() => setMenuOpen(!menuOpen)}>
            <span className='line line-1'></span>
            <span className='line line-2'></span>
            <span className='line line-3'></span>
          </div>
          <div className={styles.topLinks}>
            {site.hero_navigation_items.value.map((heroNavigationItem) => (
              <NavigationItem
                key={heroNavigationItem.system.id}
                className={styles.topLink}
                navigationItem={heroNavigationItem}
              />
            ))}
          </div>
          <a href={preview ? '/preview' : '/'}>
            {preview && (
              <img
                className={styles.logo}
                src={site.logo.value[0].image.value[0].url}
                alt={site.logo.value[0].image.value[0].name}
                width={site.logo.value[0].width.value || undefined}
                data-kontent-item-id={site.logo.value[0].system.id}
                data-kontent-element-codename={nameof(site.logo.value[0]).image}
              />
            )}
            {!preview && (
              <img
                className={styles.logo}
                src={site.logo.value[0].image.value[0].url}
                alt={site.logo.value[0].image.value[0].name}
                width={site.logo.value[0].width.value || undefined}
              />
            )}
          </a>
        </div>
        <div className={clsx(styles.menu, menuOpen && styles.menuOpen)}>
          <div className={styles.navigationSections}>
            {site.navigation_sections.value.map((navigationSection) => (
              <div
                key={navigationSection.system.id}
                className={styles.navigationSection}
                style={{ flex: navigationSection.flex.value ?? undefined }}
              >
                <div
                  className={styles.navigationSectionHeading}
                  style={{ borderBottom: `2px solid ${navigationSection.theme.hex}` }}
                >
                  <NavigationItem navigationItem={navigationSection.heading.value[0]} />
                </div>
                <div className={styles.navigationSectionColumns}>
                  {navigationSection.navigation_columns.value.map((navigationColumn) => (
                    <nav key={navigationColumn.system.id} className={styles.navigationSectionColumn} role='navigation'>
                      {navigationColumn.navigation_items.value.map((navigationItem) => (
                        <NavigationItem key={navigationItem.system.id} navigationItem={navigationItem} />
                      ))}
                    </nav>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='clear' />
          <div id='bottom' className={styles.navigationCtas}>
            {site.navigation_ctas.value.map(
              (navigationCta) =>
                navigationCta.heading.value[0].link.value[0] && (
                  <div
                    key={navigationCta.system.id}
                    className={styles.navigationCta}
                    style={{ flex: navigationCta.flex.value ?? undefined }}
                  >
                    <NavigationItem
                      className={styles.navigationCtaItem}
                      navigationItem={navigationCta.heading.value[0]}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </header>
    </>
  );
};
