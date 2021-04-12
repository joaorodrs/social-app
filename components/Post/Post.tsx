import { Avatar } from '@chakra-ui/avatar';
import { Box, Heading } from '@chakra-ui/layout';
import PostDialog from 'dialogs/PostDialog';
import { useState } from 'react';

interface PostComponentProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

const Post = ({ post, onEdit, onDelete }: PostComponentProps) => {
  const [openPostDialog, setOpenPostDialog] = useState(false);

  return (
    <>
      <Box
        key={post.id}
        border="1px solid #E2E8F0"
        p={5}
        borderRadius={5}
        my={2}
        onClick={() => setOpenPostDialog(true)}
        cursor="pointer"
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
        </div>
        <div className="postContent" style={{ marginTop: 20 }}>
          <p>{post?.post_content}</p>
        </div>
      </Box>

      <PostDialog
        isOpen={openPostDialog}
        onClose={() => setOpenPostDialog(false)}
        post={post}
        onEdit={post => {
          setOpenPostDialog(false);
          onEdit(post);
        }}
        onDelete={onDelete}
      />
    </>
  );
};

export default Post;
