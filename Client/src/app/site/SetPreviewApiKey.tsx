import React, { FC } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';
import useLocalStorage from '@rehooks/local-storage';

import { shared } from '../../terms.en-us.json';
import { LocalStorageKeys } from '../shared/LocalStorageKeys';

interface ISetPreviewApiKeyProps {}

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
    input: {
      border: 'none',
      borderBottom: '1px solid black',
      padding: 5,
      display: 'block',
      width: '100%',
      fontSize: '2em',
      textAlign: 'center',
    },
  })
);

export const SetPreviewApiKey: FC<ISetPreviewApiKeyProps> = () => {
  const styles = useStyles();

  const [previewApiKey, setPreviewApiKey] = useLocalStorage<string | undefined>(
    LocalStorageKeys.PreviewApiKey,
    undefined
  );

  return (
    <div className={styles.root}>
      <label>
        <b>{shared.enterPreviewApiKey}</b>
        <input
          className={styles.input}
          value={previewApiKey}
          onChange={(event) => setPreviewApiKey(event.target.value)}
        />
      </label>
    </div>
  );
};
