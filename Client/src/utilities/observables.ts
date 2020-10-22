import { DependencyList, useEffect, useMemo, useRef, useState } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { useSubscription as useS } from 'use-subscription';

export const useSubscription = <T>(behaviorSubject: BehaviorSubject<T>) =>
  useS<T>(
    useMemo(
      () => ({
        getCurrentValue: () => behaviorSubject.getValue(),
        subscribe: (callback) => {
          const subscription = behaviorSubject.subscribe({ next: callback });
          return () => subscription.unsubscribe();
        },
      }),

      [behaviorSubject]
    )
  );

export const useObservable = <T>(observable: Observable<T>, deps: DependencyList) =>
  useS<T | undefined>(
    useMemo(() => {
      const behaviorSubject = new BehaviorSubject<T | undefined>(undefined);

      observable.subscribe(behaviorSubject);

      return {
        getCurrentValue: () => behaviorSubject.getValue(),
        subscribe: (callback) => {
          const subscription = behaviorSubject.subscribe({ next: callback });
          return () => subscription.unsubscribe();
        },
      };
      // eslint-disable-next-line
    }, deps)
  );

export const useSubscriptionEffect = <T>(
  getObservable: (previous: T | undefined) => BehaviorSubject<T | undefined> | undefined,
  deps: DependencyList
) => {
  const [observable, setObservable] = useState(new BehaviorSubject<T | undefined>(undefined));

  useEffect(() => {
    const newObservable = getObservable(observable.getValue());

    if (newObservable) {
      setObservable(newObservable);
    }

    // eslint-disable-next-line
  }, deps);

  return useSubscription(observable);
};

export const useObservableEffect = <T>(
  getObservable: (previous: T | undefined) => Observable<T> | undefined,
  deps: DependencyList
) => {
  const observable = useRef(new BehaviorSubject<T | undefined>(undefined));

  useEffect(() => {
    const newObservable = getObservable(observable.current.getValue());

    if (newObservable) {
      newObservable.subscribe(observable.current);
    }

    // eslint-disable-next-line
  }, deps);

  return useSubscription(observable.current);
};
