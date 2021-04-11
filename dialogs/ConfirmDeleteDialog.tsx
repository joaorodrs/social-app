import { Button } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Tag } from '@chakra-ui/tag';
import { Post } from '@types';

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (postId: number) => void;
  post: Post;
}

const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  post,
}: ConfirmDeleteDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deletar post?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {'"'}
          <Tag>{post.post_content}</Tag>
          {'"'}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            color="red.400"
            ml={3}
            onClick={() => onDelete(post.id)}
          >
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteDialog;
