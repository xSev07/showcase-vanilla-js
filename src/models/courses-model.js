import {FilterType, getCoursesByFilter} from "../utils/filter";

export default class CoursesModel {
  constructor(courses) {
    this._courses = courses;
    this._activeFilters = {
      [FilterType.SUBJECT]: `все `,
      [FilterType.GENRE]: `все `,
      [FilterType.GRADE]: `все `,
    };
  }

  setFilter(filterType, filterValue) {
    this._activeFilters[filterType] = filterValue;
  }

  getCourses() {
    let filteredCourses = this._courses;
    for (let key in this._activeFilters) {
      if ({}.hasOwnProperty.call(this._activeFilters, key)) {
        filteredCourses = getCoursesByFilter(filteredCourses, key, this._activeFilters[key]);
      }
    }
    return filteredCourses;
  }
}
