import { Avatar } from '@chakra-ui/avatar';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
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
import { useEffect, useState } from 'react';

interface EditPostDialogProps {
  post: Post | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Post) => void;
}

const EditPostDialog = ({
  post,
  isOpen,
  onClose,
  onSubmit,
}: EditPostDialogProps) => {
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
      onSubmit({ ...post, post_content: postContent });
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
    onClose();
  };

  useEffect(() => {
    getPostData();
  }, [post]);

  return (
    <Modal isOpen={isOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader d="flex" alignItems="center">
          <Avatar src={post?.owner_photo_url} size="sm" />
          <Heading as="span" size="sm" ml={3}>
            {post?.owner_name}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftAddon width="50px">
              <Heading
                color={limitDigits ? 'red' : 'gray.500'}
                as="p"
                size="sm"
              >
                {`0${String(digits)}`.slice(-2)}
              </Heading>
            </InputLeftAddon>
            <Input
              value={postContent}
              onKeyDown={onPostInputKeyPress}
              onChange={onTypePostContent}
              defaultValue={post?.post_content}
              focusBorderColor="brand"
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default EditPostDialog;
