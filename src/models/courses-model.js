export default class CoursesModel {
  constructor(courses) {
    this._courses = courses;
  }

  getCourses() {
    return this._courses;
  }
}
