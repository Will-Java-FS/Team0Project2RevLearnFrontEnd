import axios from "./AxiosConfig";

class AxiosLessonService {
  getAll() {
    axios
      .get("/lessons")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.error("Error getting all lessons!", error);
      });
    return null;
  }

  // Reimplimentation of getAllByCourse using async/await
  async getAllByCourse(courseId: number) {
    try {
      const response = await axios.get("/course/" + courseId + "/lessons");
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(
        "Error getting all lessons for course " + courseId + "!",
        error,
      );
      throw error; // Ensure errors are propagated
    }
    return null;
  }

  // getAllByCourse(courseId: number) {
  //   axios
  //     .get("/course/" + courseId + "/lessons")
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         return response.data;
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error getting all lessons for course " + courseId + "!",
  //         error,
  //       );
  //     });
  //   return null;
  // }

  async getById(id: number) {
    try {
      const response = await axios.get(`/lessons/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting lesson ${id}!`, error);
      throw error;
    }
    return null;
  }

  async create(
    title: string,
    description: string,
    implementation: string,
    application: string,
    summary: string,
  ) {
    try {
      const response = await axios.post(`/lessons`, {
        title: title,
        description: description,
        implementation: implementation,
        realWorldApplication: application,
        summary: summary,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(`Error getting lesson creation!`, error);
      throw error;
    }
    return null;
  }

  update(id: number, lessonTitle: string, content: string) {
    axios
      .put("/lessons/" + id, {
        lessonTitle: lessonTitle,
        content: content,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.error("Error updating lesson " + id + "!", error);
      });
    return null;
  }

  delete(id: number): boolean {
    axios
      .delete("/lessons/" + id)
      .then((response) => {
        console.log(response.data);
        if (response.status === 204) {
          return true;
        }
      })
      .catch((error) => {
        console.error("Error deleting lesson " + id + "!", error);
      });
    return false;
  }
}

export default new AxiosLessonService();
