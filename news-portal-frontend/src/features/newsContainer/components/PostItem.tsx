import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, CardMedia } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import imageNotFound from '../../../assets/images/image-not-found.jpg';

interface Props {
  id: string;
  title: string;
  image: string | null
  createdAt: string
}

const PostItem: React.FC<Props> = ({id, title, image, createdAt}) => {
  let cardImage = imageNotFound;

  if (image) {
    cardImage = `http://localhost:8000/${image}`;
  }

  const onDelete = () => {

  };

  return (
    <Grid item sx={{width: '100%'}}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title} />
        <CardMedia image={cardImage} title={title} sx={{height: 0, paddingTop: '56.25%'}} />
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