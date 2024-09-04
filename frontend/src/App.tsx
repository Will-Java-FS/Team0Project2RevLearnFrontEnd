import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
import Login from './pages/_Login';
import AllPrograms from './pages/AllCourses';
import AllCourses from './pages/AllCourses';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';

import NoPage from './pages/NoPage'; // Keep this import if you want a 404 page
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';


const App = () => {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allprograms" element={<AllPrograms />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course" element={<Course />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forumpost" element={<ForumPost />} />
          <Route path="/*" element={<ErrorPage />} /> {/* Handles undefined routes */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;