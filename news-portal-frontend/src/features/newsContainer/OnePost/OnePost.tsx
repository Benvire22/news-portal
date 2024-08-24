import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchLoading, selectOnePost } from '../postsSlice';
import { fetchOnePost } from '../postsThunks';
import { CardMedia, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import CommentForm from './CommentForm';
import PostComments from './PostComments/PostComments';
import MySpinner from '../../../UI/MySpinner/MySpinner';

const OnePost = () => {
  const { id } = useParams() as { id: string };
  const onePost = useAppSelector(selectOnePost);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectFetchLoading);
  let postImage = '';

  if (onePost && onePost.image) {
    postImage = `http://localhost:8000/${onePost.image}`;
  }

  useEffect(() => {
    void dispatch(fetchOnePost(id));
  }, [dispatch, id]);

  return (
    onePost && (
      <>
        {isLoading && <MySpinner />}
        <Grid container direction="column" spacing={3}>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h2" color="primary" sx={{ mb: 2 }}>
                {onePost.title}
              </Typography>
              <Typography variant="h5" color="secondary">
                {dayjs(onePost.createdAt).format('YYYY-MM-DD:HH')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1">{onePost.description}</Typography>
          </Grid>
          {onePost.image && (
            <Grid
              item
              sx={{ display: 'flex', justifyContent: 'center', my: 5 }}
            >
              <CardMedia
                component="img"
                alt={onePost.title}
                sx={{ maxHeight: '600px', width: 'auto', borderRadius: '3%' }}
                image={postImage}
              />
            </Grid>
          )}
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ width: '100%' }}>
              <Typography variant="h4">Comments</Typography>
              <CommentForm />
              <PostComments />
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default OnePost;
