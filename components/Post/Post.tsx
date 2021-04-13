import { Avatar } from '@chakra-ui/avatar';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { ChatIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Divider, Heading } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
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
      <Box key={post.id} border="1px solid #E2E8F0" borderRadius={5} my={2}>
        <chakra.div
          cursor="pointer"
          p={5}
          pb="20px"
          onClick={() => setOpenPostDialog(true)}
          _hover={{ backgroundColor: '#f0f0f0' }}
          transition="background-color 0.3s ease"
        >
          <chakra.div
            className="ownerInfo"
            d="flex"
            alignItems="center"
            flexDir="row"
          >
            <Avatar size="sm" src={post?.owner_photo_url} />
            <Heading size="4x1" ml={3}>
              {post?.owner_name}
            </Heading>
          </chakra.div>
          <chakra.div mt="20px" className="postContent">
            <p>{post?.post_content}</p>
          </chakra.div>
        </chakra.div>
        <Divider />
        <chakra.div p={2} className="postFooter">
          <ButtonGroup color="brand" position="relative">
            <Button variant="outline" leftIcon={<TriangleUpIcon />}>
              99
            </Button>
            <IconButton
              variant="ghost"
              icon={<ChatIcon />}
              aria-label="Comentários"
            />
          </ButtonGroup>
        </chakra.div>
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
