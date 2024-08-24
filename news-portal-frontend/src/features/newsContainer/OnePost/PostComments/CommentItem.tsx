import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppSelector } from '../../../../app/hooks';
import { selectDeleteLoadingComment } from '../commentsSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  author: string;
  message: string;
  onDelete: () => void;
}

const CommentItem: React.FC<Props> = ({ author, message, onDelete }) => {
  const isDeleting = useAppSelector(selectDeleteLoadingComment);

  return (
    <Grid item sx={{ width: '90%' }}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          mb: 2,
        }}
      >
        <CardHeader
          title={author}
          sx={{ width: '100%', borderBottom: '2px solid #ededed' }}
        />
        <CardContent
          sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1" width="80%">
            {message}
          </Typography>
          <CardActions
            sx={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'flex-end',
            }}
          >
            <LoadingButton
              type="button"
              loading={isDeleting}
              loadingPosition="end"
              endIcon={<DeleteOutlineIcon />}
              sx={{ fontSize: '20px', display: 'flex', gap: 2 }}
              onClick={onDelete}
              color="error"
            >
              <span>Delete</span>
            </LoadingButton>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentItem;
