import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-center p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-primary font-medium hover:text-secondary">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-primary font-medium hover:text-secondary">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/login" className="text-primary font-medium hover:text-secondary">
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="text-primary font-medium hover:text-secondary">
                        Register
                    </Link>
                </li>
                <li>
                    <Link to="/allprograms" className="text-primary font-medium hover:text-secondary">
                        All Programs
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="text-primary font-medium hover:text-secondary">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/allcourses" className="text-primary font-medium hover:text-secondary">
                        All Courses
                    </Link>
                </li>
                <li>
                    <Link to="/course" className="text-primary font-medium hover:text-secondary">
                        Course
                    </Link>
                </li>
                <li>
                    <Link to="/lesson" className="text-primary font-medium hover:text-secondary">
                        Lesson
                    </Link>
                </li>
                <li>
                    <Link to="/forum" className="text-primary font-medium hover:text-secondary">
                        Forum
                    </Link>
                </li>
                <li>
                    <Link to="/forumpost" className="text-primary font-medium hover:text-secondary">
                        Forum Post
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;