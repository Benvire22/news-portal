import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, CardMedia } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { deletePost, fetchPosts } from '../postsThunks';
// import imageNotFound from '../../../assets/images/image-not-found.jpg';

interface Props {
  id: string;
  title: string;
  image: string | null
  createdAt: string
}

const PostItem: React.FC<Props> = ({id, title, image, createdAt}) => {
  const dispatch = useAppDispatch();
  let postImage = 'imageNotFound';

  if (image) {
    postImage = `http://localhost:8000/${image}`;
  }

  const onDelete = async () => {
    await dispatch(deletePost(id));
    await dispatch(fetchPosts());
  };

  return (
    <Grid item sx={{width: '100%'}}>
      <Card >
        <CardMedia image={postImage} title={title} sx={{height: '100px', width: '100px'}} />
        <CardHeader title={title} />
        <CardContent>
          <strong>{createdAt}</strong>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`news/${id}`} >
            Read More
            <ArrowForwardIcon />
          </IconButton>
          <IconButton onClick={onDelete} >
            Delete post
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostItem;