import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import NewsPage from './features/newsContainer/NewsPage';
import NewPost from './features/newsContainer/NewPost/NewPost';
import OnePost from './features/newsContainer/OnePost/OnePost';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/add-new" element={<NewPost />} />
        <Route path="/news/:id" element={<OnePost />} />
        <Route
          path="*"
          element={
            <Typography variant="h2" textAlign="center" color="primary">
              Guestbook
            </Typography>
          }
        />
      </Routes>
    </>
  );
};

export default App;
