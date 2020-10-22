import React, { lazy, Suspense } from 'react';
import { boundary, useError } from 'react-boundary';

import { Router } from '@reach/router';

import { Loading } from './Loading';

const Error = lazy(() => import('./Error').then((module) => ({ default: module.Error })));
const Color = lazy(() => import('./elements/color/Color').then((module) => ({ default: module.Color })));
const Site = lazy(() => import('./site/Site').then((module) => ({ default: module.Site })));
const Page = lazy(() => import('./site/page/Page').then((module) => ({ default: module.Page })));
const HomePage = lazy(() => import('./site/page/HomePage').then((module) => ({ default: module.HomePage })));

export const App = boundary(() => {
  const [error, info] = useError();

  const hasError = error || info;

  return (
    <Suspense fallback={<Loading />}>
      {hasError && <Error stack={`${error && error.stack}${info && info.componentStack}`} />}
      {!hasError && (
        <Router>
          <Color path='elements/color' />
          <Site path='/'>
            <Page path='not-found' default />
            <HomePage path='/' />
            <Page path='*urlSlug' />
          </Site>
          <Site path='preview' preview>
            <Page path='not-found' default />
            <HomePage path='/' />
            <Page path='item/:itemId' />
            <Page path='*urlSlug' />
          </Site>
        </Router>
      )}
    </Suspense>
  );
});
