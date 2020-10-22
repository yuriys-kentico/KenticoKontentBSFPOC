import React, { FC, useContext } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { nameof } from '../../../../utilities/objects';
import { CtaCardRowSection as CtaCardRowSectionModel } from '../../../models/components/CtaCardRowSection';
import { SiteContext } from '../../../shared/SiteContext';

interface ICtaCardRowSectionProps {
  ctaCardRowSection: CtaCardRowSectionModel;
  parse: (html: string) => JSX.Element | JSX.Element[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: { margin: '0 auto 100px', maxWidth: 1200 },
    cards: { display: 'flex', margin: '0 auto', maxWidth: 960 },
  })
);

export const CtaCardRowSection: FC<ICtaCardRowSectionProps> = ({ ctaCardRowSection, parse }) => {
  const styles = useStyles();

  const { preview } = useContext(SiteContext);

  return (
    <>
      {preview && (
        <div
          className={styles.root}
          data-kontent-component-id={ctaCardRowSection.system.id}
          data-kontent-element-codename={nameof(ctaCardRowSection).cards}
        >
          <div className={styles.cards}>{parse(ctaCardRowSection.cards.resolveHtml())}</div>
        </div>
      )}
      {!preview && (
        <div className={styles.root}>
          <div className={styles.cards}>{parse(ctaCardRowSection.cards.resolveHtml())}</div>
        </div>
      )}
    </>
  );
};
