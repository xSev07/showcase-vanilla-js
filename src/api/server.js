// import {ResponseStatus} from "../const";

import CourseModel from "../models/course-model";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  // if (response.status >= ResponseStatus.OK && response.status < ResponseStatus.REDIRECT) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Server {
  constructor(endPoint) {
    this._endPoint = endPoint;
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
