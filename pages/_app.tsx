import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { useEffect } from 'react';
import { UserProgressProvider } from "../lib/UserProgressContext"

export default function App(props: AppProps) {
  const { Component, pageProps } = props;


  return (
    <>
      <Head>
        <title>Tarkov GunGame</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
        }}
      >
        <UserProgressProvider>
          <Component {...pageProps} />
        </UserProgressProvider>
      </MantineProvider>
    </>
  );
}