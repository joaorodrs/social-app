import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Heading, Button } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box display="flex" alignItems="center" w="100%" p={4}>
      <Button size="sm" color="brand.700">
        <HamburgerIcon />
      </Button>
      <Heading marginLeft={4} as="h1" size="4x1">Social App</Heading>
    </Box>
  )
}

export default Header
