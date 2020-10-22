import React, { FC } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import play from '../../../../images/play-circle-regular.svg';
import { VimeoVideoSection as VimeoVideoSectionModel } from '../../../models/components/VimeoVideoSection';

interface IVimeoVideoSectionProps {
  vimeoVideoSection: VimeoVideoSectionModel;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: { margin: '0 auto', maxWidth: 840, position: 'relative' },
    image: { width: '100%' },
    play: {
      position: 'absolute',
      zIndex: 5,
      width: '100%',
      height: '100%',
      top: 0,
      cursor: 'pointer',
      display: 'flex',
    },
    playImage: {
      margin: '0 auto',
    },
  })
);

export const VimeoVideoSection: FC<IVimeoVideoSectionProps> = ({ vimeoVideoSection }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={vimeoVideoSection.preview.value[0].url}
        alt={vimeoVideoSection.preview.value[0].name}
      />
      <div className={styles.play}>
        <img className={styles.playImage} src={play} alt='play' />
      </div>
    </div>
  );
};
