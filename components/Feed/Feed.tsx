/* eslint-disable no-undef */
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  ButtonGroup,
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
import EditPostDialog from 'dialogs/EditPostDialog';
import ConfirmDeleteDialog from 'dialogs/ConfirmDeleteDialog';

const Feed = () => {
  const [postContent, setPostContent] = useState('');
  const [digits, setDigits] = useState(0);
  const [limitDigits, setLimitDigits] = useState(false);
  const [postInputPlaceholder, setPostInputPlaceholder] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(firebase.auth());
  const [openEditPost, setOpenEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Post>();
  const [deletingPost, setDeletingPost] = useState<Post>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

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

  const onSubmitEditedPost = async (post: Post) => {
    try {
      await api.put(`social-post/${post.id}`, post);

      getFeedPosts();
    } catch (err) {
      toast(errorToast);
    } finally {
      setOpenEditPost(false);
    }
  };

  const onDeletePost = async (socialPostId: number) => {
    try {
      await api.delete(`social-post/${socialPostId}`);

      getFeedPosts();
    } catch (err) {
      toast(errorToast);
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  const onEditPost = (post: Post) => {
    setOpenEditPost(true);
    setEditingPost(post);
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
              <Box
                key={post.id}
                border="1px solid #E2E8F0"
                p={5}
                borderRadius={5}
                my={2}
              >
                <div
                  className="ownerInfo"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Avatar size="sm" src={post?.owner_photo_url} />
                  <Heading size="4x1" ml={3}>
                    {post?.owner_name}
                  </Heading>
                  {post?.owner_id === user?.uid && (
                    <ButtonGroup ml="auto">
                      <IconButton
                        onClick={() => onEditPost(post)}
                        variant="ghost"
                        aria-label="Edit"
                        icon={<EditIcon color="gray.500" />}
                      />
                      <IconButton
                        onClick={() => {
                          setOpenConfirmDelete(true);
                          setDeletingPost(post);
                        }}
                        variant="ghost"
                        aria-label="Delete"
                        icon={<DeleteIcon color="red.500" />}
                      />
                    </ButtonGroup>
                  )}
                </div>
                <div className="postContent" style={{ marginTop: 20 }}>
                  <p>{post?.post_content}</p>
                </div>
              </Box>
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

      <EditPostDialog
        isOpen={openEditPost}
        onSubmit={onSubmitEditedPost}
        onClose={() => setOpenEditPost(false)}
        post={editingPost}
      />
      <ConfirmDeleteDialog
        isOpen={openConfirmDelete}
        onDelete={onDeletePost}
        onClose={() => setOpenConfirmDelete(false)}
        post={deletingPost}
      />
    </>
  );
};

export default Feed;
