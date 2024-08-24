import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { ProductMutation } from '../../../types';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput';

interface Props {
  onSubmit: (product: ProductMutation) => void;
  isLoading: boolean;
}

const PostForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ProductMutation>({
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...state});

    setState({
      title: '',
      description: '',
      price: '',
      image: null,
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    const value = files && files[0] ? files[0] : null

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
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
          minRows={3}
          label="Description"
          required
          name="description"
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          type="number"
          label="Price"
          id="price"
          name="price"
          required
          value={state.price}
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
          startIcon={<SaveIcon/>}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default PostForm;