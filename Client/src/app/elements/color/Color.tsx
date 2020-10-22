import '../../../styles/elements.scss';

import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';

import { createStyles, makeStyles } from '@material-ui/styles';

import { kenticoKontent } from '../../../appSettings.json';
import { IContext, ICustomElement } from '../../../customElement';
import { loadModule } from '../../../utilities/modules';
import { RoutedFC } from '../../../utilities/routing';
import { Loading } from '../../Loading';
import { IColorConfig } from './IColorConfig';

// Expose access to APIs
declare const CustomElement: ICustomElement<IColorConfig>;

const useStyles = makeStyles<{}, { color: string | undefined }>(
  createStyles({
    row: { display: 'flex', flexDirection: 'row', margin: '4px 0' },
    fullWidthCell: { flex: 1 },
    picker: {
      boxShadow: 'none !important',
      padding: '0 !important',
      '& input': {
        width: '100% !important',
      },
    },
    preview: {
      height: 50,
      width: '50%',
      backgroundColor: (props) => props.color,
    },
  })
);

export const Color: RoutedFC = () => {
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [customElementConfig, setCustomElementConfig] = useState<IColorConfig>({
    defaultColors: [
      '#4caf50',
      '#fb8c00',
      '#ef5350',
      '#fbc02d',
      '#2196f3',
      '#ff9800',
      '#d32f2f',
      '#f5f5f5',
      '#9B9B9B',
      '#616161',
      '#424242',
      '#000000',
      '#FFFFFF',
    ],
  });

  const [color, setColor] = useState<string>();

  const styles = useStyles({ color });

  useEffect(() => {
    if (!available) {
      const initCustomElement = (element: ICustomElement<IColorConfig>, context: IContext) => {
        try {
          const elementValue = element.value !== null && (JSON.parse(element.value) as string);

          if (elementValue) {
            setColor(elementValue);
          }
        } catch {}

        if (element.config) {
          setCustomElementConfig(element.config);
        }

        setEnabled(!element.disabled);
        CustomElement.onDisabledChanged((disabled) => setEnabled(!disabled));
        setAvailable(true);
      };

      loadModule(kenticoKontent.customElementScriptEndpoint, () => CustomElement.init(initCustomElement));
    }
  }, [available]);

  useEffect(() => {
    if (available) {
      CustomElement.setHeight(document.documentElement.offsetHeight);
    }
  });

  useEffect(() => {
    if (available && enabled) {
      CustomElement.setValue(JSON.stringify(color ?? null));
    }
  }, [available, enabled, color]);

  return (
    <>
      {!available && <Loading />}
      {available && enabled && customElementConfig && (
        <>
          <div className={styles.row}>
            <div className={styles.fullWidthCell}>
              <SketchPicker
                disableAlpha
                width='50%'
                className={styles.picker}
                presetColors={customElementConfig.defaultColors}
                styles={{ default: { hue: { minHeight: 20 }, color: { minHeight: 20 } } }}
                color={color}
                onChange={(value) => setColor(value.hex)}
              />
            </div>
          </div>
        </>
      )}
      {!enabled && (
        <>
          <div className={styles.row}>
            <div className={styles.fullWidthCell}>
              <div className={styles.preview} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
