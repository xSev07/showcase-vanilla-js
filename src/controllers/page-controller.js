import FilterComponent from "../components/filter-component";
import CatalogComponent from "../components/catalog";
import CurrencyComponent from "../components/currency-component";
import CoursesComponent from "../components/courses-component";
import {remove, render} from "../utils/render";
import {getFilters} from "../utils/filter";
import CourseCardComponent from "../components/course-card";
import CoursesModel from "../models/courses-model";
import {Currency} from "../const";

export default class PageController {
  constructor(api) {
    this._api = api;
    this._displayedCourses = [];
    this._siteMainElement = document.querySelector(`.page-main`);
    this._catalogComponent = new CatalogComponent();
    this._currencyComponent = new CurrencyComponent();
    this._coursesComponent = new CoursesComponent();
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onCurrencyChange = this._onCurrencyChange.bind(this);
  }

  render() {
    // TODO: Реализовать заглушку на время загрузки данных

    this._api.getCourses()
      .then((courses) => this._renderAfterAcceptData(courses))
      .catch((err) => {
        // TODO: Реализовать заглушку при ошибке загрузки данных
        console.log(`Ошибка получения данных. ${err}`);
      });
  }

  _renderCourses() {
    // TODO: Выводить заглушку, если нет курсов удовлетворяющих условиям отбора
    this._coursesModel.getCourses().forEach((it) => {
      const newCourseComponent = new CourseCardComponent(it);
      this._displayedCourses.push(newCourseComponent);
      render(this._coursesListElement, newCourseComponent);
    });
  }

  _renderAfterAcceptData(courses) {
    this._coursesModel = new CoursesModel(courses);
    this._filterComponent = new FilterComponent(getFilters(courses));
    render(this._siteMainElement, this._filterComponent);
    render(this._siteMainElement, this._catalogComponent);
    render(this._siteMainElement, this._currencyComponent);
    render(this._siteMainElement, this._coursesComponent);

    this._coursesListElement = this._coursesComponent.getContainerElement();
    this._renderCourses();

    this._filterComponent.setFiltersChangeHandlers(this._onFilterChange);
    this._currencyComponent.setChangeHandler(this._onCurrencyChange);
  }

  _onCurrencyChange(evt) {
    this._displayedCourses.forEach((course) => {
      const selectedCurrency = Currency[evt.target.value.toUpperCase()];
      course.setCurrency(selectedCurrency);
      course.rerender();
    });
  }

  _onFilterChange(evt) {
    this._coursesModel.setFilter(evt.target.id, evt.target.value);
    this._displayedCourses.forEach((course) => remove(course));
    this._displayedCourses = [];
    this._renderCourses();
  }
}
