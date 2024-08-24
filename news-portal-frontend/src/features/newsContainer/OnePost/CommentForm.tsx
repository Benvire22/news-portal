import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { PostCommentMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCreateLoadingComment } from './commentsSlice';
import { createComment, fetchComments } from './commentsThunks';
import { useParams } from 'react-router-dom';

const CommentForm: React.FC = () => {
  const isLoading = useAppSelector(selectCreateLoadingComment);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  const [state, setState] = useState<PostCommentMutation>({
    postId: id,
    author: '',
    message: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment({ ...state }));
    await dispatch(fetchComments(id));

    setState({
      postId: id,
      author: '',
      message: '',
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      onSubmit={submitFormHandler}
      sx={{
        my: 3,
      }}
    >
      <Grid item>
        <TextField
          label="Author"
          name="author"
          id="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          multiline
          minRows={4}
          label="Message"
          required
          name="message"
          id="message"
          value={state.message}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CommentForm;
