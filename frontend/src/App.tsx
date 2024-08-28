import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Course from './pages/Course';
import Lesson from './pages/Lesson';
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
          <Route
            path="/register"
            element={<Register />}
          />

          <Route path="/login" element={<Login onLoginSuccess={handleRegisterSuccess} />} />
          <Route path="/dashboard" element={<Dashboard />} />


          <Route path="/login" element={<Login onRegisterSuccess={handleRegisterSuccess} />} /> */}
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
      {/* </Layout> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register onRegisterSuccess={handleRegisterSuccess} />}
        />
        <Route path="/login" element={<Login onRegisterSuccess={handleRegisterSuccess} />} />
        <Route path="/allprograms" element={<AllPrograms />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/allcourses" element={<AllCourses />} />
        <Route path="/course" element={<Course />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forumpost" element={<ForumPost />} />
      </Routes>
      ed changes

    </Router>
  );
};

export default App;
