import React from 'react';
import App from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { parseCookies } from 'nookies';

import makeStore from '../store';
import theme from '../config/theme';

import '../assets/css/index.css';

class NextApp extends App {
  cookies = parseCookies();
  state = {
    theme: this.cookies.theme || 'light',
  };
  render() {
    const { Component, pageProps, store } = this.props;
    // const cookies = parseCookies();
    // const currentTheme = store.getState().statsReducer.theme || cookies.theme;
    // store.getState().subscribe();
    // console.log({
    //   store: store.getState(),
    //   // cookies,
    //   currentTheme: this.state.theme,
    // });

    const changeTheme = th => {
      store.dispatch({
        type: 'SET_THEME',
        payload: {
          theme: th,
        },
      });
      this.setState({
        theme: th,
      });
    };
    return (
      <>
        <Head>
          <meta name="theme-color" content="#f56464" />
          <link rel="manifest" href="manifest.json" />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#f56464" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#f56464" />
          <title>
            Covid-19 | Corona Virus | Latest Updates and Stats | Corona Virus
            Stats in India
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="Description"
            content="Covid-19 | Corona Virus | PWA | Corona Virus Cases in India"
          />
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={{ ...theme[this.state.theme] }}>
            <Component changeTheme={changeTheme} {...pageProps} />
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}
export default withRedux(makeStore)(NextApp);
