import  { useNavigate } from 'react-router-dom'
import AuthService from "./AuthService";

export default function Redirector() {
    const navigate = useNavigate();

    if (AuthService.isLoggedInStudent()) {
        navigate('/dashboard')
    }
    else if (AuthService.isLoggedInTeacher()) {
        navigate('/dashboard')
    } 
    else {
        navigate('/')
    }
}