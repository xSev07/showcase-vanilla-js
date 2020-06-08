import {ResponseStatus} from "../const";
import CourseModel from "../models/course-model";
import {mockCourses} from "../mocks/courses-mock";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= ResponseStatus.OK && response.status < ResponseStatus.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Server {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getMockCourses() {
    return Promise.resolve(CourseModel.parseCourses(mockCourses));
  }

  getCourses() {
    return this._load({
      url: `update`,
      method: Method.POST,
      body: JSON.stringify({"data": ``})
    })
      .then((response) => response.json())
      .then((response) => CourseModel.parseCourses(response.items));
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
