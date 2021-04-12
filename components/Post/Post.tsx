import { Avatar } from '@chakra-ui/avatar';
import { ButtonGroup, IconButton } from '@chakra-ui/button';
import { Box, Heading } from '@chakra-ui/layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import ConfirmDeleteDialog from 'dialogs/ConfirmDeleteDialog';

interface PostComponentProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

const Post = ({ post, onEdit, onDelete }: PostComponentProps) => {
  const [user] = useAuthState(firebase.auth());
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [deletingPost, setDeletingPost] = useState<Post>();

  return (
    <>
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
                onClick={() => onEdit(post)}
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

export default Post;
