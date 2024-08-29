import axios from "./AxiosConfig"
import AuthService from "./AuthService";

class AxiosEnrollmentService {

    getEnrollments(studentId:number) {
        axios.get("/enrollments/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error enrolling student to program ' + studentId + '!', error);
        });
        return null;
    }

    enrollInProgram(studentId = AuthService.loggedInUserId(), programId:number):boolean {
        axios.post("/program/" + programId + "/enroll/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error enrolling student to program ' + programId + '!', error);
        });
        return false;
    }

    removeFromProgram(studentId:number, programId:number):boolean {
        axios.post("/program/" + programId + "/remove/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error removing student from program ' + programId + '!', error);
        });
        return false;
    }
}

export default new AxiosEnrollmentService();