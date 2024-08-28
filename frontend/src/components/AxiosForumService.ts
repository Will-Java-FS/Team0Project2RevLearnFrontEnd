import axios from "./AxiosConfig"
import AuthService from "./AuthService";

class AxiosForumService {

    getAllForums() {
        axios.get("/fourms")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting all fourms!', error);
        });
        return null;
    }

    getPostsByForum(forumId:number) {
        axios.get("/forums/" + forumId + "/posts")
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting all posts for forum ' + forumId + '!', error);
        });
        return null;
    }

    getForumById(id:number) {
        axios.get("/forums/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting forum ' + id + '!', error);
        });
        return null;
    }

    getPostById(id:number) {
        axios.get("/forums/posts/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error getting post ' + id + '!', error);
        });
        return null;
    }

    createForum(forumTitle:string, content:string, courseId:number) {
        axios.post("/forums", {
            forumTitle: forumTitle,
            content: content,
            posterId: AuthService.loggedInUserId(),
            courseId: courseId
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error on forum creation attempt!', error);
        });
        return null;
    }

    createPost(content:string, forumId:number) {
        axios.post("/forums/" + forumId + "/posts", {
            content: content,
            posterId: AuthService.loggedInUserId(),
            forumId: forumId
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 201) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error on post creation attempt!', error);
        });
        return null;
    }

    updateForum(id:number, forumTitle:string, content:string) {
        axios.put("/forums/" + id, {
            forumTitle: forumTitle,
            content: content
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error updating forum ' + id + '!', error);
        });
        return null;
    }

    updatePost(id:number, content:string) {
        axios.put("/forums/posts" + id, {
            content: content
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.error('Error updating post ' + id + '!', error);
        });
        return null;
    }

    deleteForum(id:number):boolean {
        axios.delete("/forums/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 204) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error deleting forum ' + id + '!', error);
        });
        return false;
    }

    deletePost(id:number):boolean {
        axios.delete("/forums/posts/" + id)
        .then(response => {
            console.log(response.data);
            if (response.status === 204) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error deleting post ' + id + '!', error);
        });
        return false;
    }
}

export default new AxiosForumService();