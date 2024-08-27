import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Course from './pages/Course';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import AllPrograms from './pages/AllCourses';
import AllCourses from './pages/AllCourses';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import NoPage from './pages/NoPage';

const App = () => {
  const handleRegisterSuccess = () => {
    console.log('Registration successful!');
    window.location.href = "/login";
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/*" element={<NoPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/register"
            element={<Register onRegisterSuccess={handleRegisterSuccess} />}
          />
          <Route path="register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allprograms" element={<AllPrograms />} />
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