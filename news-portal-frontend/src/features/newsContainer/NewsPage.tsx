import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import PostItem from './components/PostItem';
import { Post } from '../../types';
import { selectPosts } from './postsSlice';

const NewsPage = () => {
  let posts: Post[] = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // void dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Posts</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/add-new">
            Add new post
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
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