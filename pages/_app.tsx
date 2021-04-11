/* eslint-disable react/jsx-props-no-spreading */
import 'styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import theme from 'config/theme';

import firebaseConfig from 'config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
