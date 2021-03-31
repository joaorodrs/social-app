import Header from '../components/Header'
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Head from 'next/head'
import Feed from '../components/Feed'
import theme from 'config/theme'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Social App</title>
      </Head>

      <ThemeProvider theme={theme}>
        <Header />

        <Feed />
      </ThemeProvider>
    </div>
  )
}
