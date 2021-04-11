import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/react';
import { Post } from '@types';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdPhotos } from 'react-icons/io';
import api from 'services/api';
import phraseGenerator from 'utils/phraseGenerator';
import firebase from 'firebase/app';
import { toast } from 'react-toastify';
import EditPostDialog from 'dialogs/EditPostDialog';

const Feed = () => {
  const [postContent, setPostContent] = useState('');
  const [digits, setDigits] = useState(0);
  const [limitDigits, setLimitDigits] = useState(false);
  const [postInputPlaceholder, setPostInputPlaceholder] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(firebase.auth());
  const [openEditPost, setOpenEditPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Post>();

  const getFeedPosts = async () => {
    try {
      const { data } = await api.get('social-post');

      setPosts(data);
    } catch (err) {
      toast.error('Não foi possível carregar as postagens recentes.');
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
      toast.error('Não foi possível criar a postagem.');
    }
  };

  const onSubmitEditedPost = async (post: Post) => {
    try {
      await api.put(`social-post/${post.id}`, post);

      getFeedPosts();
    } catch (err) {
      console.error(err);
      toast.error('Não foi possível editar post');
    } finally {
      setOpenEditPost(false);
    }
  };

  const onDeletePost = async (socialPostId: number) => {
    try {
      await api.delete(`social-post/${socialPostId}`);

      getFeedPosts();
    } catch (err) {
      toast.error('Não foi possível deletar a postagem.');
    }
  };

  const onEditPost = (post: Post) => {
    setOpenEditPost(true);
    setEditingPost(post);
  };

  const onTypePostContent = event => {
    const { value } = event.target;
    const limitIsReached = digits >= 96;

    if (limitIsReached) setLimitDigits(true);
    else setLimitDigits(false);

    setDigits(value.length);

    if (limitIsReached) return setPostContent(postContent);
    return setPostContent(value);
  };

  const onPostInputKeyPress = event => {
    if (event.keyCode === 13 && postContent !== '') {
      onSubmitPost();
    }
  };

  useEffect(() => {
    setPostInputPlaceholder(phraseGenerator);
    getFeedPosts();
  }, []);

  return (
    <>
      <Flex justifyContent="space-between" pt="100px">
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
        <Box>
          <Flex flexDir="column" width="45vw">
            <InputGroup>
              <InputLeftAddon width="50px">
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
                mt={2}
                mb={2}
              >
                <div
                  className="ownerInfo"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Avatar size="sm" src={post.owner_photo_url} />
                  <Heading size="4x1" ml={3}>
                    {post.owner_name}
                  </Heading>
                  {post.owner_id === user?.uid && (
                    <ButtonGroup ml="auto">
                      <IconButton
                        onClick={() => onEditPost(post)}
                        variant="ghost"
                        aria-label="Edit"
                        icon={<EditIcon color="gray.500" />}
                      />
                      <IconButton
                        onClick={() => onDeletePost(post.id)}
                        variant="ghost"
                        aria-label="Delete"
                        icon={<DeleteIcon color="red.500" />}
                      />
                    </ButtonGroup>
                  )}
                </div>
                <div className="postContent" style={{ marginTop: 20 }}>
                  <p>{post.post_content}</p>
                </div>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box
          mr={20}
          width={60}
          d="flex"
          alignItems="center"
          flexDir="column"
          height="fit-content"
          border="1px solid #E2E8F0"
          p={5}
          borderRadius={5}
        >
          {[1, 2, 3, 4, 5, 6, 7].map(number => (
            <Flex key={number} mt={5} mb={5}>
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
      </Flex>
      <EditPostDialog
        isOpen={openEditPost}
        onSubmit={onSubmitEditedPost}
        onClose={() => setOpenEditPost(false)}
        post={editingPost}
      />
    </>
  );
};

export default Feed;
