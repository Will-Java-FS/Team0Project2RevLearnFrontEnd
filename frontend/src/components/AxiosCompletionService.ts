import axios from "./AxiosConfig";
import AuthService from "./AuthService";

class AxiosCompletionService {
  getCompletedLessons(studentId = AuthService.loggedInUserId()) {
    axios
      .get("/status/" + studentId)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.error(
          "Error getting completed lessons for student " + studentId + "!",
          error,
        );
      });
    return null;
  }

  completeLesson(
    studentId = AuthService.loggedInUserId(),
    lessonId: number,
  ): boolean {
    axios
      .post("/lesson/" + lessonId + "/status/" + studentId)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          return true;
        }
      })
      .catch((error) => {
        console.error(
          "Error completing lesson " +
            lessonId +
            " for student " +
            studentId +
            "!",
          error,
        );
      });
    return false;
  }
}

export default new AxiosCompletionService();
