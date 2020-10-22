import React, { FC } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { CtaRowSection as CtaRowSectionModel } from '../../../models/components/CtaRowSection';
import { NavigationItem } from '../../header/NavigationItem';

interface ICtaRowSectionProps {
  ctaRowSection: CtaRowSectionModel;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      margin: '0 auto',
      maxWidth: 1200,
      marginBottom: 150,
      '&:nth-child(even) > div': {
        right: 'initial',
        left: 0,
        padding: '5% 6.25% 5% 0',
      },
    },
    image: {},
    cta: {
      width: '66.666%',
      padding: '5% 0 5% 6.25%',
      position: 'absolute',
      bottom: 0,
      right: 0,
      background: '#fff',
      textAlign: 'left',
      marginBottom: -150,
    },
    heading: {},
    link: {
      fontWeight: 'bold',
      background: '#f7a800',
      borderRadius: 5,
      borderWidth: '0px !important',
      boxShadow: '2px 2px 2px 0px rgba(0,0,0,.47)',
      fontSize: '16px',
      padding: '.3em 1em  !important',
      lineHeight: '1.7em',
      backgroundSize: 'cover',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      border: '2px solid',
      transition: 'all .2s',
      marginBottom: '7px',
      color: '#fff !important',

      '&:hover': {
        background: '#c48500',
        color: '#fff',
        textDecoration: 'none',
      },
    },
  })
);

export const CtaRowSection: FC<ICtaRowSectionProps> = ({ ctaRowSection }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={ctaRowSection.hero_image.value[0].url}
        alt={ctaRowSection.hero_image.value[0].name}
      />
      <div className={styles.cta}>
        <h5 className={styles.heading}>{ctaRowSection.name.value}</h5>
        <h2 className={styles.heading}>{ctaRowSection.heading.value}</h2>
        <NavigationItem className={styles.link} navigationItem={ctaRowSection.cta_link.value[0]} />
      </div>
    </div>
  );
};
