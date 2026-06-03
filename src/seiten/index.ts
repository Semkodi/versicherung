import { lazy } from 'react';

export const Startseite = lazy(() => import('./Startseite'));
export const Privatkunden = lazy(() => import('./Privatkunden'));
export const Gewerbekunden = lazy(() => import('./Gewerbekunden'));
export const Beamte = lazy(() => import('./Beamte'));
export const SchadenMelden = lazy(() => import('./SchadenMelden'));
export const Dashboard = lazy(() => import('./Dashboard'));
export const Login = lazy(() => import('./Login'));
