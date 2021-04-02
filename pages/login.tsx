import { useState } from 'react'
import firebase from 'firebase/app'
import { ViewOffIcon } from '@chakra-ui/icons'
import { Button, Box, Center, Heading, Wrap, Fade, Spinner, useToast, UseToastOptions, Icon } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import { useAuthState } from 'react-firebase-hooks/auth'

const Login = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [user, userLoading] = useAuthState(firebase.auth())

  const checkIfTheUserIsLogged = () => {
    if (!userLoading && user !== null) {
      router.push('/')
    }
  }

  checkIfTheUserIsLogged()

  const errorToast: UseToastOptions = {
    title: 'Erro no login',
    description: 'Não foi possível entrar',
    status: 'error',
    duration: 5000,
    isClosable: true
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebase.auth().signInWithPopup(googleProvider)

      setLoading(false)
      router.push('/')
    } catch (err) {
      setLoading(false)
      toast(errorToast)
    }
  }

  const signInWithGithub = async () => {
    setLoading(true)
    const githubProvider = new firebase.auth.GithubAuthProvider()
    try {
      await firebase.auth().signInWithPopup(githubProvider)

      setLoading(false)
      router.push('/')
    } catch (err) {
      setLoading(false)
      toast(errorToast)
    }
  }

  const signInAnonimously = async () => {
    setLoading(true)
    try {
      await firebase.auth().signInAnonymously()

      setLoading(false)
      router.push('/')
    } catch (err) {
      setLoading(false)
      toast(errorToast)
    }
  }

  return (
    <Fade in={router.isReady}>
      <Head>
        <title>Entrar</title>
      </Head>

      <Center h="100vh">
        {loading
          ? <Spinner size="xl" color="brand" />
          : (
            <Box p={5} d="flex" flexDir="column" alignItems="center" justifyContent="center">
              <Heading variant="h2" size="lg" color="brand">Entrar</Heading>
              <Wrap spacing={3} direction="column" mt={5}>
                <Button w="230px" color="red.500" variant="outline" onClick={signInWithGoogle}>
                  <Icon as={FcGoogle} />
                  <div style={{ marginRight: 10 }} />
                Continuar com Google
                </Button>
                <Button w="230px" color="black" variant="outline" onClick={signInWithGithub}>
                  <Icon as={AiFillGithub} />
                  <div style={{ marginRight: 10 }} />
                Continuar com Github
                </Button>
              </Wrap>
              <Button mt={4} color="brand" variant="link" fontWeight="normal" size="sm" onClick={signInAnonimously}>
                Continuar de forma anônima
                <ViewOffIcon ml={2} />
              </Button>
            </Box>
            )}
      </Center>
    </Fade>
  )
}

export default Login
