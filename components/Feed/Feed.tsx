import { EditIcon } from '@chakra-ui/icons';
import {
  Box, Container, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightAddon, InputRightElement,
} from '@chakra-ui/react';
import { IoMdPhotos } from 'react-icons/io';

const Feed = () => (
  <Container>
    <Box>
      <Heading as="h2" size="4x1">Hashtags</Heading>
      #something
      #something
      #something
      #something
      #something
      #something
      #something
    </Box>
    <Box>
      <Flex>
        <InputGroup>
          <InputLeftElement><EditIcon color="gray.400" /></InputLeftElement>
          <Input placeholder="Something here" />
          <InputRightAddon>
            <IconButton aria-label="Galeria" icon={<IoMdPhotos />} />
          </InputRightAddon>
        </InputGroup>
      </Flex>
    </Box>
    <Box />
  </Container>
);

export default Feed;
