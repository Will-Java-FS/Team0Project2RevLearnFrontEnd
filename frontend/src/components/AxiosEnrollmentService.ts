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
            console.error('Error getting student enrollments!', error);
        });
        return null;
    }

    enrollInCourse(studentId = AuthService.loggedInUserId(), courseId:number):boolean {
        axios.post("/course/" + courseId + "/enroll/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error enrolling student to course ' + courseId + '!', error);
        });
        return false;
    }

    payForCourse(studentId = AuthService.loggedInUserId(), courseId:number):boolean {
        axios.post("/course/" + courseId + "/pay/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error paying for course ' + courseId + '!', error);
        });
        return false;
    }

    removeFromCourse(studentId:number, courseId:number):boolean {
        axios.post("/course/" + courseId + "/remove/" + studentId)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error removing student from program ' + courseId + '!', error);
        });
        return false;
    }
}

export default new AxiosEnrollmentService();