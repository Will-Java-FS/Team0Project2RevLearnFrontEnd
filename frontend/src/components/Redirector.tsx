import { Navigate } from 'react-router-dom'
import AuthService from "./AuthService";

export default function Redirector() {
    if (AuthService.isLoggedInStudent()) {
        return <Navigate to = '/dashboard' />
    }
    else if (AuthService.isLoggedInTeacher()) {
        return <Navigate to = '/dashboard' />
    } 
    else {
        return <Navigate to = '/' />
    }
}