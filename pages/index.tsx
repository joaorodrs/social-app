import Header from '../components/Header'
import Head from 'next/head'
import Feed from '../components/Feed'
import Drawer from 'components/Drawer'
import { useDisclosure } from '@chakra-ui/hooks'

export default function Home () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Head>
        <title>Social App</title>
      </Head>

      <Header onOpen={onOpen} />

      <Drawer isOpen={isOpen} onClose={onClose} />

      <Feed />
    </div>
  )
}
