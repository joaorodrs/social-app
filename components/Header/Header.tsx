import { AtSignIcon, ChatIcon, HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Heading, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'

interface HeaderProps {
  onOpen(): void
}

const Header = ({ onOpen }: HeaderProps) => {
  return (
    <Box d="flex" alignItems="center" w="100%" p={4}>
      <IconButton
        onClick={onOpen}
        aria-label="settings"
        variant="outline"
        color="brand"
        icon={<HamburgerIcon />}
      />
      <Heading ml={4} as="h1" size="4x1">Social App</Heading>
      <InputGroup ml="auto" mr={3} w="250px">
        <Input placeholder="Pesquisar" />
        <InputRightElement>
          <IconButton aria-label="pesquisar" size="sm">
            <SearchIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
      <IconButton
        aria-label="settings"
        variant="ghost"
        color="brand"
        icon={<ChatIcon />}
        disabled
      />
      <IconButton
        aria-label="settings"
        variant="ghost"
        color="brand"
        icon={<AtSignIcon />}
      />
      <IconButton
        aria-label="settings"
        variant="ghost"
        color="brand"
        icon={<SettingsIcon />}
      />
    </Box>
  )
}

export default Header
