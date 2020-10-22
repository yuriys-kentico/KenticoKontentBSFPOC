import parse from 'html-react-parser';
import React, { FC } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { ImageSection as ImageSectionModel } from '../../../models/components/ImageSection';

interface IImageSectionProps {
  imageSection: ImageSectionModel;
}

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      margin: '0 120px',
      width: 800,
    },
    heading: {
      position: 'relative',
      backgroundColor: '#fff',
      fontWeight: 600,
      textAlign: 'center',
      paddingTop: '28px !important',
      maxWidth: 720,
      margin: '-65px 160px 30px',
    },
  })
);

export const ImageSection: FC<IImageSectionProps> = ({ imageSection }) => {
  const styles = useStyles();

  return (
    <>
      <img
        className={styles.image}
        src={imageSection.hero_image.value[0].url}
        alt={imageSection.hero_image.value[0].name}
      />
      <h3 className={styles.heading}>{imageSection.heading.value}</h3>
      {parse(imageSection.content.resolveHtml())}
    </>
  );
};
