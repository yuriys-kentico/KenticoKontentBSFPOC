import React, { useContext } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { RoutedFC } from '../../../utilities/routing';
import { SiteContext } from '../../shared/SiteContext';
import { Goodbye } from './Goodbye';
import { NavigationItem } from './NavigationItem';

const useStyles = makeStyles(() =>
  createStyles({
    links: {
      paddingTop: 55,
      borderTop: '1px solid #e4e4e4',
      maxWidth: 1200,
      margin: '40px auto 50px auto',
    },
    linksAnchor: { padding: 0, fontSize: 15, lineHeight: 1.7 },
    socialRow: {
      display: 'flex',
    },
    socialAnchor: { padding: 0, marginRight: 5 },
    footer: { backgroundColor: '#4a4a4a', fontSize: '.8em', color: '#9a9a9a' },
    footerFooter: { maxWidth: 1200, margin: '0 auto', display: 'flex' },
    copyright: { flex: 1, paddingTop: 28, paddingBottom: 28 },
    footerNavigationItems: {
      flex: 1,
      paddingTop: 28,
      paddingBottom: 28,
      flexDirection: 'row-reverse',
      display: 'flex',
      fontSize: '.8em',
      '& a': {
        textDecoration: 'underline',
        padding: 'initial',
        color: '#fff',
        opacity: 0.5,
      },
    },
  })
);

export const Footer: RoutedFC = () => {
  const styles = useStyles();

  const { site } = useContext(SiteContext);

  return (
    <>
      <div className={styles.links}>
        {site.goodbye_links.value.map((goodbyeLink) => (
          <NavigationItem key={goodbyeLink.system.id} className={styles.linksAnchor} navigationItem={goodbyeLink} />
        ))}
        <div className={styles.socialRow}>
          {site.social_links.value.map((socialLink) => (
            <NavigationItem key={socialLink.system.id} className={styles.socialAnchor} navigationItem={socialLink} />
          ))}
        </div>
      </div>
      <Goodbye />
      <footer className={styles.footer}>
        <div className={styles.footerFooter}>
          <div className={styles.copyright}>
            <label>{site.copyright.value}</label>
          </div>
          <div className={styles.footerNavigationItems}>
            {site.footer_navigation_items.value.map((footerNavigationItem) => (
              <NavigationItem key={footerNavigationItem.system.id} navigationItem={footerNavigationItem} />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
