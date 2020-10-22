import React, { FC, useContext, useLayoutEffect, useMemo } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { nameof } from '../../../utilities/objects';
import { useObservable } from '../../../utilities/observables';
import { Loading } from '../../Loading';
import { GoodbyeMessage } from '../../models/GoodbyeMessage';
import { SiteContext } from '../../shared/SiteContext';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: '#f7a800',
      transition: 'opacity 0.33s ease-out',
      textAlign: 'center',
      position: 'relative',
      height: '45vh',
      '& *': {
        color: '#fff',
      },
    },
    triangle: {
      clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    goodbye: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -45%)',
      textAlign: 'center',
      width: '87.5%',
      maxWidth: 1200,
    },
  })
);

export const Goodbye: FC = () => {
  const styles = useStyles();

  const { site, deliveryClient, preview, updateSmartLinks } = useContext(SiteContext);

  const goodbyeMessages = useObservable(
    deliveryClient.items<GoodbyeMessage>().type(GoodbyeMessage.codeName).toObservable(),
    []
  )?.items;

  const goodbyeMessage = useMemo(() => {
    return goodbyeMessages && goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
  }, [goodbyeMessages]);

  const goodbyeHeading = useMemo(() => {
    if (goodbyeMessage) {
      return goodbyeMessage.heading_override.value || site?.goodbye_heading.value;
    }
  }, [goodbyeMessage, site]);

  useLayoutEffect(() => goodbyeMessage && updateSmartLinks(), [goodbyeMessage, updateSmartLinks]);

  return (
    <div className={styles.root}>
      <div className={styles.triangle}></div>
      <div className={styles.goodbye}>
        {!(goodbyeMessage && goodbyeHeading) && <Loading />}
        {goodbyeMessage && goodbyeHeading && (
          <>
            <h5>{goodbyeHeading}</h5>
            {preview && (
              <h2
                data-kontent-item-id={goodbyeMessage.system.id}
                data-kontent-element-codename={nameof(goodbyeMessage).message}
              >
                {goodbyeMessage.message.value}
              </h2>
            )}
            {!preview && <h2>{goodbyeMessage.message.value}</h2>}
          </>
        )}
      </div>
    </div>
  );
};
