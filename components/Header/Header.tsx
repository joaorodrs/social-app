import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Heading, Button } from '@chakra-ui/react'

interface HeaderProps {
  onOpen(): void
}

const Header = ({ onOpen }: HeaderProps) => {
  return (
    <Box display="flex" alignItems="center" w="100%" p={4}>
      <Button size="sm" color="brand.700" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Heading marginLeft={4} as="h1" size="4x1">Social App</Heading>
      <Button marginLeft="auto" size="sm" color="brand.700" variant="ghost">
        <SettingsIcon />
      </Button>
    </Box>
  )
}

export default Header
