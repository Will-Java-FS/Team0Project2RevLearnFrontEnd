import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Login from './pages/Login';
import AllPrograms from './pages/AllCourses';
import AllCourses from './pages/AllCourses';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';

const App = () => {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allprograms" element={<AllPrograms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course" element={<Course />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forumpost" element={<ForumPost />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
