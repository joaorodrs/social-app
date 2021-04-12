import { Avatar } from '@chakra-ui/avatar';
import { Heading } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useEffect, useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from '@chakra-ui/input';
import { IoMdPhotos } from 'react-icons/io';
import {
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/popover';

interface PostDialogProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PostDialog = ({
  post,
  onEdit,
  onDelete,
  isOpen,
  onClose,
}: PostDialogProps) => {
  const [user] = useAuthState(firebase.auth());
  const [userEditingPost, setUserEditingPost] = useState(false);

  const [postContent, setPostContent] = useState('');
  const [digits, setDigits] = useState(0);
  const [limitDigits, setLimitDigits] = useState(false);

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
      setDigits(0);
      setLimitDigits(false);
      setPostContent('');
      onEdit({ ...post, post_content: postContent });
    }
  };

  const getPostData = () => {
    const postContentDigits = post?.post_content?.length;
    if (postContentDigits >= 96) setLimitDigits(true);

    setDigits(postContentDigits);
    setPostContent(post?.post_content);
  };

  const onModalClose = () => {
    getPostData();
    setUserEditingPost(false);
    onClose();
  };

  useEffect(() => {
    getPostData();
  }, [post]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalHeader />
          <ModalBody>
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
                    onClick={() => setUserEditingPost(true)}
                    variant="ghost"
                    aria-label="Edit"
                    autoFocus={false}
                    icon={<EditIcon color="gray.500" />}
                  />
                  <Popover size="sm">
                    <PopoverTrigger>
                      <IconButton
                        variant="ghost"
                        aria-label="Delete"
                        icon={<DeleteIcon color="red.500" />}
                      />
                    </PopoverTrigger>
                    <PopoverContent w="150px">
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Ahn?</PopoverHeader>
                      <PopoverFooter d="flex" justifyContent="space-between">
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => onDelete(post.id)}
                        >
                          Deletar
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </ButtonGroup>
              )}
            </div>
            <div className="postContent" style={{ marginTop: 20 }}>
              {userEditingPost ? (
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
              ) : (
                <p>{post?.post_content}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostDialog;
