import axios from "./AxiosConfig"
import AuthService from "./AuthService";

class AxiosCourseService {

    getAll() {
        axios.get("/courses")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting all courses!', error);
        });
        return null;
    }

    getAllByProgram(programId:number) {
        axios.get("/programs/" + programId + "/courses")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting all courses for program ' + programId + '!', error);
        });
        return null;
    }

    getById(id:number) {
        axios.get("/courses/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting course ' + id + '!', error);
        });
        return null;
    }

    getStudents(id:number) {
        axios.get("/courses/" + id + "/students")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting students for course ' + id + '!', error);
        });
        return null;
    }

    create(courseName:string, description:string, programId:number) {
        axios.post("/courses", {
            courseName: courseName,
            description: description,
            teacherId: AuthService.loggedInUserId(),
            programId: programId
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error on course creation attempt!', error);
        });
        return null;
    }

    delete(id:number):boolean {
        axios.delete("/courses/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 204) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error deleting course ' + id + '!', error);
        });
        return false;
    }
}

export default new AxiosCourseService();