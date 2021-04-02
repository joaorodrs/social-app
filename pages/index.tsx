import { useEffect } from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import Feed from '../components/Feed'
import Drawer from 'components/Drawer'
import { useDisclosure } from '@chakra-ui/hooks'
import firebase from 'firebase/app'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { Fade } from '@chakra-ui/transition'
import { Spinner } from '@chakra-ui/spinner'

export default function Home () {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user, loading] = useAuthState(firebase.auth())

  const checkIfTheUserIsLogged = () => {
    console.log(user)
    if (!loading && user === null) {
      router.push('/login')
    }
  }

  useEffect(() => {
    checkIfTheUserIsLogged()
  }, [user, loading])

  return (
    <div>
      <Head>
        <title>SA | {user?.displayName || 'Anônimo'}</title>
      </Head>

      <Fade in={router.isReady}>
        {loading
          ? <Spinner size="xl" />
          : (
          <>
            <Header onOpen={onOpen} />

            <Drawer isOpen={isOpen} onClose={onClose} />

            <Feed />
          </>
            )}
      </Fade>
    </div>
  )
}
