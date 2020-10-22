import clsx from 'clsx';
import parse from 'html-react-parser';
import React, { FC, useMemo } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { CtaCard as CtaCardSectionModel } from '../../../models/components/CtaCard';
import { NavigationItemOptions } from '../../../models/NavigationItem';
import { NavigationItem } from '../../header/NavigationItem';

interface ICtaCardProps {
  ctaCard: CtaCardSectionModel;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: '0px 2px 48px -19px rgba(0,0,0,.3)',
      textAlign: 'center',
      padding: 20,
      borderRadius: 23,
      margin: '25px 20px',
      flex: 1,
    },
    image: {
      width: '60%',
    },
    cta: {
      backgroundColor: '#007598',
      margin: '-240px auto 0',
      width: 750,
      padding: '40px 80px',
      position: 'relative',
    },
    heading: {},
    link: {
      fontWeight: 'bold',
      background: '#767d8a',
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
        background: '#535861',
        color: '#fff',
        textDecoration: 'none',
      },
    },
    linkHighlight: {
      background: '#f7a800',

      '&:hover': {
        background: '#c48500',
        color: '#fff',
        textDecoration: 'none',
      },
    },
  })
);

export const CtaCard: FC<ICtaCardProps> = ({ ctaCard }) => {
  const styles = useStyles();

  const ctaHighlight = useMemo(
    () => ctaCard.cta_link.value[0].options.value.find((value) => value.codename === NavigationItemOptions.highlight),
    [ctaCard.cta_link.value]
  );

  return (
    <div className={styles.root}>
      <img className={styles.image} src={ctaCard.hero_image.value[0].url} alt={ctaCard.hero_image.value[0].name} />
      <h2 className={styles.heading}>{ctaCard.heading.value}</h2>
      {parse(ctaCard.content.value)}
      <NavigationItem
        className={clsx(styles.link, ctaHighlight && styles.linkHighlight)}
        navigationItem={ctaCard.cta_link.value[0]}
      />
    </div>
  );
};
