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

                    {/* // should we auto assign the role to student or have a seperate reg for teachers? */}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;