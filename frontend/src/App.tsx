import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import Lesson from "./pages/Lesson";
import AllPrograms from "./pages/AllCourses";
import AllCourses from "./pages/AllCourses";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import Layout from "./pages/Layout";

const App = () => {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="/login" element={<Login />} />
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
