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
import { ButtonGroup, IconButton } from '@chakra-ui/button';
import { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

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
  const [deletingPost, setDeletingPost] = useState<Post>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                    onClick={() => onEdit(post)}
                    variant="ghost"
                    aria-label="Edit"
                    autoFocus={false}
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
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <ConfirmDeleteDialog
        isOpen={openConfirmDelete}
        onDelete={postId => {
          setOpenConfirmDelete(false);
          onDelete(postId);
        }}
        onClose={() => setOpenConfirmDelete(false)}
        post={deletingPost}
      />
    </>
  );
};

export default PostDialog;
