/* eslint-disable no-undef */
import { EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useMediaQuery,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdPhotos } from 'react-icons/io';
import api from 'services/api';
import phraseGenerator from 'utils/phraseGenerator';
import firebase from 'firebase/app';
import Post from 'components/Post';

const Feed = () => {
  const [postContent, setPostContent] = useState('');
  const [digits, setDigits] = useState(0);
  const [limitDigits, setLimitDigits] = useState(false);
  const [postInputPlaceholder, setPostInputPlaceholder] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(firebase.auth());

  const [isMobile] = useMediaQuery('(max-width: 800px)');
  const toast = useToast();

  const errorToast: UseToastOptions = {
    title: 'Erro',
    description: 'Houve um erro durante a ação... ;-;',
    status: 'error',
    isClosable: true,
  };

  const getFeedPosts = async () => {
    try {
      const { data } = await api.get('social-post');

      setPosts(data);
    } catch (err) {
      toast(errorToast);
    }
  };

  const onSubmitPost = async () => {
    const data = {
      owner_photo_url: user.photoURL,
      owner_name: user.displayName,
      owner_email: user.email,
      owner_id: user.uid,
      post_content: postContent,
    };

    try {
      await api.post('social-post', data);

      getFeedPosts();
      setPostContent('');
    } catch (err) {
      toast(errorToast);
    }
  };

  const onEditPost = async (post: Post) => {
    try {
      await api.put(`social-post/${post.id}`, post);

      getFeedPosts();
    } catch (err) {
      toast(errorToast);
    }
  };

  const onDeletePost = async (socialPostId: number) => {
    try {
      await api.delete(`social-post/${socialPostId}`);

      getFeedPosts();
    } catch (err) {
      toast(errorToast);
    }
  };

  const onTypePostContent = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const limitIsReached = digits >= 96;

    if (limitIsReached) setLimitDigits(true);
    else setLimitDigits(false);

    setDigits(value.length);

    if (limitIsReached) return setPostContent(postContent);
    return setPostContent(value);
  };

  const onPostInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && postContent !== '') {
      onSubmitPost();
    }
  };

  useEffect(() => {
    setPostInputPlaceholder(phraseGenerator);
    getFeedPosts();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10} pt="100px">
        {!isMobile && (
          <Box
            ml={20}
            border="1px solid #E2E8F0"
            width={60}
            p={5}
            borderRadius={5}
            height="fit-content"
          >
            <Heading as="h2" size="4x1">
              Hashtags
            </Heading>
            {[1, 2, 3, 4, 5, 6].map(number => (
              <p key={number}>#something</p>
            ))}
          </Box>
        )}
        <Box width={isMobile && '100vw'}>
          <Flex
            flexDir="column"
            w={isMobile ? '100vw' : '45vw'}
            px={isMobile && 6}
          >
            <InputGroup>
              <InputLeftAddon w="50px">
                {digits === 0 ? (
                  <EditIcon color="gray.500" />
                ) : (
                  <Heading
                    color={limitDigits ? 'red' : 'gray.500'}
                    as="p"
                    size="sm"
                  >
                    {`0${String(digits)}`.slice(-2)}
                  </Heading>
                )}
              </InputLeftAddon>
              <Input
                value={postContent}
                onKeyDown={onPostInputKeyPress}
                onChange={onTypePostContent}
                placeholder={postInputPlaceholder}
                focusBorderColor="brand"
                disabled={user?.isAnonymous}
              />
              <InputRightElement>
                <IconButton
                  disabled
                  variant="ghost"
                  aria-label="Galeria"
                  icon={<IoMdPhotos color="#38B2AC" />}
                />
              </InputRightElement>
            </InputGroup>
            <Divider mt={5} mb={2} />
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onEdit={onEditPost}
                onDelete={onDeletePost}
              />
            ))}
          </Flex>
        </Box>
        {!isMobile && (
          <Box
            mr={20}
            w={60}
            d="flex"
            alignItems="center"
            flexDir="column"
            height="fit-content"
            border="1px solid #E2E8F0"
            p={5}
            borderRadius={5}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(number => (
              <Flex key={number} my={5}>
                <Avatar src="https://github.com/joaorodrs.png" mr={3} />
                <Box>
                  <Heading as="h3" size="md">
                    Pessoa 1
                  </Heading>
                  <p>80 followers</p>
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Feed;
