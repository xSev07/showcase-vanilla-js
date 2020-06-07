import AbstractSmartComponent from "./abstract-smat-component";
import {Currency} from "../const";

const createCardTemplate = (course, currency) => {
  const grades = course.grades.length > 1
    ? `${course.grades[0]}-${course.grades[course.grades.length - 1]} классы`
    : `${course.grades} класс`;
  return (`
    <li class="courses__item">
      <img class="courses__picture" src="img/default.jpg" alt="Алгебра">
      <div class="courses__info">
        <p class="courses__title">${course.subject}</p>
        <p class="courses__grade">${grades}</p>
        <p class="courses__genre">${course.genre}</p>
        <p class="courses__additional">
          <a class="courses__additional-link" href="#">Подробнее</a>
        </p>
      </div>
      <p class="courses__buy">
        <a class="courses__buy-link" href="#">${course[currency]}</a>
      </p>
    </li>
  `);
};

export default class CourseCardComponent extends AbstractSmartComponent {
  constructor(course) {
    super();
    this._course = course;
    this._currency = Currency.RUB;
  }

  getTemplate() {
    return createCardTemplate(this._course, this._currency);
  }

  setCurrency(currency) {
    this._currency = currency;
  }

  recoveryListeners() {
    // TODO: реализовать, когда будут обработчики событий(на данный момент они не требуются по ТЗ)
  }
}
