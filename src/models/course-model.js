export default class CourseModel {
  constructor(data) {
    this.id = data[`courseId`];
    this.idExtend = data[`extId`];
    this.courseHash = data[`courseHash`];
    this.title = data[`title`];
    this.grade = data[`grade`].split(`;`);
    this.genre = data[`genre`];
    this.subject = data[`subject`];
    this.idItunes = data[`itunes_id`];
    this.progress = data[`progress`];
    this.description = data[`description`];
    this.status = data[`status`];
    this.price = data[`price`];
    this.idGoogle = data[`google_id`];
    this.isNew = data[`isNew`];
    this.priceBonus = data[`priceBonus`];
  }

  static parseCourse(data) {
    return new CourseModel(data);
  }

  static parseCourses(data) {
    return data.map(CourseModel.parseCourse);
  }
}
