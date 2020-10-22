import React from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      height: 100,
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loading: {
      width: 200,
      height: 5,
      overflow: 'hidden',
      backgroundColor: '#d0cfce',
      borderRadius: 5,
      animation: 'loader 6.2s ease',
      transformOrigin: '50% 100%',
    },
    bubble: {
      width: 200,
      height: 5,
      backgroundColor: '#0a68f5',
      animation: 'bubble 1.7s ease infinite',
      transformOrigin: '0 100%',
      animationDelay: '0.55s',
    },
  })
);

export const Loading = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.loading}>
        <div className={styles.bubble} />
      </div>
    </div>
  );
};
