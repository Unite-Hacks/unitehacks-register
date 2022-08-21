import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import '@hackclub/theme/fonts/reg-bold.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import ForceTheme from '../components/force-theme'
import Flag from '../components/flag'
import NProgress from '../components/nprogress'
import Meta from '../components/meta'
import Head from 'next/head'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Meta
          as={Head}
          name="Unite Hacks" // site name
          title="Unite Hacks" // page title
          description="" // page description
          // large summary card image URL
          color="#ec3750" // theme color
        />
        <Flag />
        <NProgress color={'#ec3750'} />
        <ForceTheme theme="light" />
        <div
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              height: '100vh',
              width: '100vw',
              backgroundImage: 'url("https://cdn.discordapp.com/attachments/532339327888392192/1010939364269903882/Background_-_2bg_2.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom-left',
              overflowY: 'scroll'
            }}
          >
            <Component {...pageProps}/>

          </div>
        </div>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }
        `}
        </style>
      </ThemeProvider>
    )
  }
}
