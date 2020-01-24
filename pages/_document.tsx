import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        ehhanceComponent: (Component: any) => (props: any) =>
          sheet.collectStyles(<Component {...props} />)
      });
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles: [initialProps.styles, ...sheet.getStyleElement()] };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <title>Offline Next.js with Now 2.0</title>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#72B340" />
          <meta
            name="description"
            content="make your Next.js application work offline using service workers via Google's workbox"
          />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" type="text/css" href="static/fonts/css/all.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
