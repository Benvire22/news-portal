import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import NewsPage from './features/newsContainer/NewsPage';
import NewPost from './features/newsContainer/NewPost/NewPost';
import OnePost from './features/newsContainer/OnePost/OnePost';
import AppToolbar from './UI/AppToolbar/AppToolbar';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/add-new" element={<NewPost />} />
          <Route path="/news/:id" element={<OnePost />} />
          <Route
            path="*"
            element={
              <Typography variant="h1" textAlign="center" color="red">
                Guestbook
              </Typography>
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
