import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Grid, Typography } from '@mui/material';
import { selectComments } from '../commentsSlice';
import { deleteComment, fetchComments } from '../commentsThunks';
import CommentItem from './CommentItem';
import { useParams } from 'react-router-dom';

const PostComments: React.FC = () => {
  const postComments = useAppSelector(selectComments);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  useEffect(() => {
    try {
      void dispatch(fetchComments(id)).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, id]);

  const onDelete = async (commentId: string) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      await dispatch(fetchComments(id)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return postComments.length > 0 ? (
    <Grid
      item
      container
      spacing={1}
      sx={{ width: '100%', my: 4 }}
      justifyContent="center"
    >
      {postComments.map((comment) => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          message={comment.message}
          onDelete={() => onDelete(comment.id)}
        />
      ))}
    </Grid>
  ) : (
    <>
      <Typography variant="h6">Empty...</Typography>
    </>
  );
};

export default PostComments;
