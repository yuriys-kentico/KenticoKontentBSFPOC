import React, { FC } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { CtaSection as CtaSectionModel } from '../../../models/components/CtaSection';
import { NavigationItem } from '../../header/NavigationItem';

interface ICtaSectionProps {
  ctaSection: CtaSectionModel;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: { position: 'relative', backgroundColor: '#007598', height: 400, marginTop: 400, textAlign: 'center' },
    image: {
      maxWidth: 1024,
      position: 'absolute',
      bottom: 120,
      transform: 'translate(-50%, 0)',
    },
    cta: {
      backgroundColor: '#007598',
      width: 750,
      padding: '40px 80px',
      position: 'absolute',
      transform: 'translate(-50%, 0)',
      left: '50%',
      bottom: 120,
    },
    heading: {
      color: '#fff',
    },
    link: {
      fontWeight: 'bold',
      background: '#f7a800',
      borderRadius: 5,
      borderWidth: '0px !important',
      boxShadow: '2px 2px 2px 0px rgba(0,0,0,.47)',
      fontSize: '16px',
      padding: '.3em 1em',
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

export const CtaSection: FC<ICtaSectionProps> = ({ ctaSection }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={ctaSection.hero_image.value[0].url}
        alt={ctaSection.hero_image.value[0].name}
      />
      <div className={styles.cta}>
        <h2 className={styles.heading}>{ctaSection.heading.value}</h2>
        <NavigationItem className={styles.link} navigationItem={ctaSection.cta_link.value[0]} />
      </div>
    </div>
  );
};
