import { AtSignIcon, ChatIcon, HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box, Heading, IconButton, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiOutlineLogout } from 'react-icons/hi'
import firebase from 'firebase/app'
import { AiFillGithub } from 'react-icons/ai'
interface HeaderProps {
  onOpenUserModal(): void
}

const Header = ({ onOpenUserModal }: HeaderProps) => {
  const signOut = () => {
    firebase.auth().signOut()
  }

  const navigateToGithub = () => {
    window.open('https://github.com/joaorodrs/social-app', '_blank')
  }

  return (
    <Box d="flex" alignItems="center" w="100%" p={4}>
      <IconButton
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
        onClick={onOpenUserModal}
      />
      <Menu autoSelect={false}>
        <MenuButton as={IconButton} variant="ghost">
          <IconButton
            aria-label="settings"
            variant="ghost"
            color="brand"
            icon={<SettingsIcon />}
          />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<AiFillGithub color="black" size={20} />} mt={2} onClick={navigateToGithub}>
            Ver no Github
          </MenuItem>
          <MenuItem icon={<HiOutlineLogout color="red" size={20} />} mt={2} onClick={signOut}>
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Header
