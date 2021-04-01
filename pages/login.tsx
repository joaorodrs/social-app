import { EmailIcon } from '@chakra-ui/icons'
import { Button, Box, Center, Heading, Wrap } from '@chakra-ui/react'
import Head from 'next/head'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

const Login = () => {
  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>

      <Center h="100vh">
        <Box p={5} d="flex" flexDir="column" alignItems="center" justifyContent="center">
          <Heading variant="h2" size="lg" color="brand">Entrar</Heading>
          <Wrap spacing={3} direction="column" mt={5}>
            <Button w="230px" color="red.500" variant="outline">
              <FcGoogle size={35} />
              <div style={{ marginRight: 10 }} />
              Continuar com Google
            </Button>
            <Button w="230px" color="black" variant="outline">
              <AiFillGithub />
              <div style={{ marginRight: 10 }} />
              Continuar com Github
            </Button>
          </Wrap>
          <Button mt={4} color="brand" variant="link" fontWeight="normal" size="sm">
              Continuar de forma anônima
              <EmailIcon ml={2} />
          </Button>
        </Box>
      </Center>
    </>
  )
}

export default Login
