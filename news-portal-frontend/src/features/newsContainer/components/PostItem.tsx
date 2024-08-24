import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  CardMedia,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { deletePost, fetchPosts } from '../postsThunks';
import imageNotFound from '../../../assets/images/image-not-found.jpg';
import dayjs from 'dayjs';

interface Props {
  id: string;
  title: string;
  image: string | null;
  createdAt: string;
}

const StyledButton = {
  fontSize: '20px',
};

const PostItem: React.FC<Props> = ({ id, title, image, createdAt }) => {
  const dispatch = useAppDispatch();
  let postImage = imageNotFound;

  if (image) {
    postImage = `http://localhost:8000/${image}`;
  }

  const onDelete = async () => {
    await dispatch(deletePost(id));
    await dispatch(fetchPosts());
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      <Card
        sx={{
          display: 'flex',
          border: '1px solid lightgray',
          justifyContent: 'space-between',
          p: '20px 10px',
        }}
      >
        <CardMedia
          image={postImage}
          title={title}
          sx={{ height: '150px', width: '150px' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <CardHeader title={title} />
          <strong>{dayjs(createdAt).format('YYYY-MM-DD HH:MM')}</strong>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'flex-end',
          }}
        >
          <Button color="error" sx={StyledButton} onClick={onDelete}>
            Delete post
            <DeleteOutlineIcon />
          </Button>
          <Button component={Link} sx={StyledButton} to={`news/${id}`}>
            Read More
            <ArrowForwardIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PostItem;
