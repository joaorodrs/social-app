import { EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box, Divider, Flex, Heading, IconButton, Input, InputGroup, InputLeftAddon, InputRightElement,
} from '@chakra-ui/react';
import { IoMdPhotos } from 'react-icons/io';

const Feed = () => (
  <Flex justifyContent="space-between" pt="100px">
    <Box ml={20} border="1px solid #E2E8F0" width={60} p={5} borderRadius={5} height="fit-content">
      <Heading as="h2" size="4x1">Hashtags</Heading>
      {[1, 2, 3, 4, 5, 6].map(() => <p>#something</p>)}
    </Box>
    <Box>
      <Flex flexDir="column" width="45vw">
        <InputGroup>
          <InputLeftAddon><EditIcon color="gray.500" /></InputLeftAddon>
          <Input placeholder="Something here" focusBorderColor="brand" />
          <InputRightElement>
            <IconButton variant="ghost" aria-label="Galeria" icon={<IoMdPhotos color="#38B2AC" />} />
          </InputRightElement>
        </InputGroup>
        <Divider mt={5} mb={2} />
        {[1, 2, 3, 4, 5, 6, 7].map((number) => (
          <Box key={number} border="1px solid #E2E8F0" p={5} borderRadius={5} mt={2} mb={2}>
            <div className="ownerInfo" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Avatar size="sm" />
              <Heading size="4x1" ml={3}>João Paulo</Heading>
            </div>
            <div className="postContent" style={{ marginTop: 20 }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque ac nibh
                nec semper. Phasellus vel malesuada mauris, eget ornare enim. Suspendisse nec tempus
                ante. Integer et varius libero, quis condimentum metus. In vehicula non purus at
                hendrerit. Quisque et odio pretium, interdum odio id, dictum elit. Aenean ut
                egestas velit. Aliquam pharetra eros sit amet massa efficitur lobortis.
              </p>
            </div>
          </Box>
        ))}
      </Flex>
    </Box>
    <Box mr={20} width={60} d="flex" alignItems="center" flexDir="column" height="fit-content" border="1px solid #E2E8F0" p={5} borderRadius={5}>
      {[1, 2, 3, 4, 5, 6, 7].map(() => (
        <Flex mt={5} mb={5}>
          <Avatar src="https://github.com/joaorodrs.png" mr={3} />
          <Box>
            <Heading as="h3" size="md">Pessoa 1</Heading>
            <p>80 followers</p>
          </Box>
        </Flex>
      ))}
    </Box>
  </Flex>
);

export default Feed;
