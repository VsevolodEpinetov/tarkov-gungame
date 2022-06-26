import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, AppShell, Header } from '@mantine/core';
import { useEffect, useState } from 'react';
import { setCookies, getCookie, checkCookies, removeCookies } from 'cookies-next';
import { UserProgressProvider } from "../lib/UserProgressContext"
import MyHeader from "../components/MyHeader"

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [scheme, setScheme] = useState(true);

  useEffect(() => {
    if (!checkCookies('scheme')) {
      setCookies('scheme', true)
    } else {
      const userScheme = getCookie('scheme');
      setScheme(userScheme);
      console.log(`userScheme: ${JSON.stringify(userScheme)}`)
    }
    console.log(`setting scheme to ${scheme ? 'dark' : 'light'}`)
  }, [])


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
          colorScheme: scheme ? 'dark' : 'light',
          primaryColor: 'violet'
        }}
      >
        <AppShell
          header={<Header height={60} p="xs"><MyHeader scheme={scheme} setScheme={setScheme}/></Header>}
          padding="md"
        >
          <UserProgressProvider>
            <Component {...pageProps} />
          </UserProgressProvider>
        </AppShell>
      </MantineProvider>
    </>
  );
}