import React from 'react';
import Layout from './src/components/Layout';
import { GeneralProvider } from './src/components/GeneralContext';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <GeneralProvider>{element}</GeneralProvider>
}