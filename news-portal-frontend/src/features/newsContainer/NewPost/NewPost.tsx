import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput';
import { PostMutation } from '../../../types';
import { selectCreateLoading } from '../postsSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createPost } from '../postsThunks';
import { useNavigate } from 'react-router-dom';

const NewPost: React.FC = () => {
  const isLoading = useAppSelector(selectCreateLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createPost({ ...state }));

    setState({
      title: '',
      description: '',
      image: null,
    });
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const value = files && files[0] ? files[0] : null;

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
    >
      <Grid item>
        <TextField
          label="Title"
          required
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          multiline
          minRows={6}
          label="Description"
          required
          name="description"
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
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

export default NewPost;
