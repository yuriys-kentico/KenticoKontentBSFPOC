import clsx from 'clsx';
import React, { FC, useContext, useLayoutEffect, useMemo } from 'react';

import { createStyles, makeStyles } from '@material-ui/styles';

import { nameof } from '../../../utilities/objects';
import { ImageLink } from '../../models/ImageLink';
import {
  NavigationItem as NavigationItemModel,
  NavigationItemMode,
  NavigationItemOptions,
} from '../../models/NavigationItem';
import { PageLink } from '../../models/PageLink';
import { SiteContext } from '../../shared/SiteContext';

interface INavigationItemProps {
  navigationItem: NavigationItemModel;
  className?: string;
}

const useStyles = makeStyles(() =>
  createStyles<string, INavigationItemProps>({
    root: { fontWeight: 300 },
    hr: {
      width: '75%',
      margin: '15px 0',
      height: 0,
      padding: 0,
    },
    icon: { paddingRight: 8 },
    anchor: {
      textDecoration: 'none',
      display: 'inline-block',
      padding: '4px 8px 4px 0',
      transition: 'all .25s ease-out',
      color: '#56606d',
    },
    anchorHighlight: {
      color: '#df4c2a',
    },
    bold: { fontWeight: 700 },
    image: (props) => ({ width: props.navigationItem.link.value[0]?.image?.value[0].width.value }),
  })
);

export const NavigationItem: FC<INavigationItemProps> = (props) => {
  const styles = useStyles(props);

  const { preview, updateSmartLinks } = useContext(SiteContext);

  const { navigationItem, className } = props;

  const { name_override, icon, options, mode } = navigationItem;

  const linkedPage = navigationItem.link.value[0];

  const link = useMemo(() => mode.value.some((value) => value.codename === NavigationItemMode.link), [mode.value]);

  const label = useMemo(() => mode.value.some((value) => value.codename === NavigationItemMode.label), [mode.value]);

  const spacer = useMemo(() => mode.value.some((value) => value.codename === NavigationItemMode.spacer), [mode.value]);

  const openInNewWindow = useMemo(
    () => options.value.find((value) => value.codename === NavigationItemOptions.open_in_new_window),
    [options.value]
  );

  const highlight = useMemo(() => options.value.find((value) => value.codename === NavigationItemOptions.highlight), [
    options.value,
  ]);

  const bold = useMemo(() => options.value.find((value) => value.codename === NavigationItemOptions.bold), [
    options.value,
  ]);

  const name = useMemo(() => {
    let name = '';

    if (linkedPage instanceof PageLink && linkedPage.page.value[0]) {
      name = linkedPage.page.value[0].name.value;
    }

    if (linkedPage?.name_override.value) {
      name = linkedPage.name_override.value;
    }

    if (name_override.value !== '') {
      name = name_override.value;
    }

    if (options.value.some((option) => option.codename === NavigationItemOptions.all_caps)) {
      name = name.toUpperCase();
    }

    return name;
  }, [name_override.value, options.value, linkedPage]);

  let copy = (
    <>
      {icon.icon && <span className={clsx(styles.icon, `fa fa-${icon.icon}`)} />}
      <span>{name}</span>
    </>
  );

  if (linkedPage instanceof ImageLink) {
    copy = <img className={styles.image} src={linkedPage.image.value[0].url} alt={linkedPage.image.value[0].name} />;
  }

  const href = useMemo(() => {
    let href = '';

    if (linkedPage?.url.value.startsWith('http')) {
      return linkedPage.url.value;
    }

    if (linkedPage?.url.value) {
      href = `/${linkedPage.url.value}`;
    }

    if (preview) {
      href = `/preview${href}`;
    }

    return href;
  }, [linkedPage, preview]);

  useLayoutEffect(() => updateSmartLinks(), [updateSmartLinks]);

  return (
    <>
      {spacer && <hr className={styles.hr} />}
      {label && <div className={clsx(styles.root, bold && styles.bold)}>{copy}</div>}
      {link && linkedPage && (
        <div className={clsx(styles.root, bold && styles.bold)}>
          {preview && (
            <a
              className={clsx(className, styles.anchor, highlight && styles.anchorHighlight)}
              href={href}
              target={openInNewWindow && '_blank'}
              rel={openInNewWindow && 'noopener noreferrer'}
              data-kontent-item-id={navigationItem.system.id}
              data-kontent-element-codename={nameof(navigationItem).name_override}
            >
              {copy}
            </a>
          )}
          {!preview && (
            <a
              className={clsx(className, styles.anchor, highlight && styles.anchorHighlight)}
              href={href}
              target={openInNewWindow && '_blank'}
              rel={openInNewWindow && 'noopener noreferrer'}
            >
              {copy}
            </a>
          )}
        </div>
      )}
    </>
  );
};
