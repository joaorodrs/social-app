import firebase from 'firebase/app'
import { ViewOffIcon } from '@chakra-ui/icons'
import { Button, Box, Center, Heading, Wrap } from '@chakra-ui/react'
import Head from 'next/head'
import router from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

const Login = () => {
  const signInWithGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await firebase.auth().signInWithPopup(googleProvider)

    router.push('/')
  }

  const signInWithGithub = async () => {
    const githubProvider = new firebase.auth.GithubAuthProvider()
    await firebase.auth().signInWithPopup(githubProvider)

    router.push('/')
  }

  const signInAnonimously = async () => {
    await firebase.auth().signInAnonymously()

    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>

      <Center h="100vh">
        <Box p={5} d="flex" flexDir="column" alignItems="center" justifyContent="center">
          <Heading variant="h2" size="lg" color="brand">Entrar</Heading>
          <Wrap spacing={3} direction="column" mt={5}>
            <Button w="230px" color="red.500" variant="outline" onClick={signInWithGoogle}>
              <FcGoogle size={35} />
              <div style={{ marginRight: 10 }} />
              Continuar com Google
            </Button>
            <Button w="230px" color="black" variant="outline" onClick={signInWithGithub}>
              <AiFillGithub />
              <div style={{ marginRight: 10 }} />
              Continuar com Github
            </Button>
          </Wrap>
          <Button mt={4} color="brand" variant="link" fontWeight="normal" size="sm" onClick={signInAnonimously}>
              Continuar de forma anônima
              <ViewOffIcon ml={2} />
          </Button>
        </Box>
      </Center>
    </>
  )
}

export default Login
