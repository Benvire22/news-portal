import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import PostItem from './components/PostItem';
import { Post } from '../../types';
import { selectFetchLoading, selectPosts } from './postsSlice';
import { fetchPosts } from './postsThunks';
import MySpinner from '../../UI/MySpinner/MySpinner';

const NewsPage = () => {
  let posts: Post[] = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      {isLoading && <MySpinner />}
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/add-new">
            Add new post
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            createdAt={post.createdAt}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default NewsPage;
