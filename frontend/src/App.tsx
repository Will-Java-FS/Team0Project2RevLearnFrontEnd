import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Lesson from "./pages/Lesson";
import Login from "./pages/Login";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import UserEditForm from "./pages/user/UserEditForm";
import AllPrograms from "./pages/AllPrograms";
import AllCourses from "./pages/AllCourses";
import MyCourses from "./pages/Course";
import UserEnrollment from "./pages/user/UserEnrollment";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allprograms" element={<AllPrograms />} />
          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/course" element={<MyCourses />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/user" element={<User />} />
          <Route path="/test" element={<UserEnrollment />} />
          <Route path="/user/edit/:id" element={<UserEditForm />} />
          <Route path="/forumpost" element={<ForumPost />} />
          <Route path="/*" element={<ErrorPage />} /> {/* Handles undefined routes */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;