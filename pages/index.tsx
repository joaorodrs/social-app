import Header from '../components/Header'
import Head from 'next/head'
import Feed from '../components/Feed'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Social App</title>
      </Head>
      <Header />

      <Feed />
    </div>
  )
}
