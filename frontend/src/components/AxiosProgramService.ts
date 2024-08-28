import axios from "./AxiosConfig"
import AuthService from "./AuthService";

class AxiosProgramService {

    getAll() {
        axios.get("/programs")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting all programs!', error);
        });
        return null;
    }

    getById(id:number) {
        axios.get("/programs/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting program ' + id + '!', error);
        });
        return null;
    }

    getStudents(id:number) {
        axios.get("/programs/" + id + "/students")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting students for program ' + id + '!', error);
        });
        return null;
    }

    create(programName:string) {
        axios.post("/programs", {
            program_name: programName,
            program_owner: AuthService.loggedInUserId()
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error on program creation attempt!', error);
        });
        return null;
    }

    delete(id:number):boolean {
        axios.delete("/programs/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 204) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error deleting program ' + id + '!', error);
        });
        return false;
    }
}

export default new AxiosProgramService();