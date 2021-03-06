import FilterComponent from "../components/filter-component";
import CatalogComponent from "../components/catalog";
import CurrencyComponent from "../components/currency-component";
import CoursesComponent from "../components/courses-component";
import {PlaceInsert, remove, render, replace} from "../utils/render";
import {getFilters} from "../utils/filter";
import CourseCardComponent from "../components/course-card";
import CoursesModel from "../models/courses-model";
import {Currency, KeyCode, NoDataMessage, useMocks} from "../const";
import NoDataComponent from "../components/no-data-component";

export default class PageController {
  constructor(api) {
    this._api = api;
    this._displayedCourses = [];
    this._currentCurrency = Currency.RUB;
    this._siteMainElement = document.querySelector(`.page-main`);
    this._mainNavElement = document.querySelector(`.main-nav`);
    this._mainNavToggleElement = this._mainNavElement.querySelector(`.main-nav__toggle`);
    this._coursesListElement = null;
    this._noDataComponent = new NoDataComponent();
    this._catalogComponent = new CatalogComponent();
    this._currencyComponent = new CurrencyComponent();
    this._coursesComponent = new CoursesComponent();
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSearchSubmit = this._onSearchSubmit.bind(this);
    this._onCurrencyChange = this._onCurrencyChange.bind(this);
    this._onMainMenuClick = this._onMainMenuClick.bind(this);
    this._onESCKeydown = this._onESCKeydown.bind(this);
    this._mainNavToggleElement.addEventListener(`click`, this._onMainMenuClick);
  }

  render() {
    render(this._siteMainElement, this._noDataComponent);

    let response;
    if (useMocks) {
      response = this._api.getMockCourses();
    } else {
      response = this._api.getCourses();
    }
    response
      .then((courses) => this._renderAfterAcceptData(courses))
      .catch(() => {
        const oldComponent = this._noDataComponent;
        this._noDataComponent = new NoDataComponent(NoDataMessage.ERROR);
        replace(this._noDataComponent, oldComponent);
      });
  }

  _renderCourses() {
    const courses = this._coursesModel.getCourses();
    remove(this._noDataComponent);
    if (courses.length === 0) {
      this._noDataComponent = new NoDataComponent(NoDataMessage.NOT_FIND);
      render(this._coursesListElement, this._noDataComponent, PlaceInsert.BEFORE_BEGIN);
    }

    courses.forEach((it) => {
      const newCourseComponent = new CourseCardComponent(it, this._currentCurrency);
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
    this._filterComponent.setSearchSubmitHandler(this._onSearchSubmit);
    this._currencyComponent.setChangeHandler(this._onCurrencyChange);
  }

  _setFilterAndRerender(filterType, value) {
    this._coursesModel.setFilter(filterType, value);
    this._displayedCourses.forEach((course) => remove(course));
    this._displayedCourses = [];
    this._renderCourses();
  }

  _switchMainMenu() {
    this._mainNavElement.classList.toggle(`main-nav--closed`);
    this._mainNavElement.classList.toggle(`main-nav--opened`);
  }

  _onESCKeydown(evt) {
    if (evt.key === KeyCode.ESC || evt.key === KeyCode.ESCAPE) {
      this._switchMainMenu();
      document.removeEventListener(`keydown`, this._onESCKeydown);
    }
  }

  _onMainMenuClick() {
    if (this._mainNavElement.classList.contains(`main-nav--closed`)) {
      document.addEventListener(`keydown`, this._onESCKeydown);
    } else {
      document.removeEventListener(`keydown`, this._onESCKeydown);
    }
    this._switchMainMenu();
  }

  _onCurrencyChange(evt) {
    this._displayedCourses.forEach((course) => {
      const selectedCurrency = Currency[evt.target.value.toUpperCase()];
      this._currentCurrency = selectedCurrency;
      course.setCurrency(selectedCurrency);
      course.rerender();
    });
  }

  _onFilterChange(evt) {
    this._setFilterAndRerender(evt.target.id, evt.target.value);
  }

  _onSearchSubmit(evt) {
    if (evt.keyCode === KeyCode.ENTER) {
      this._setFilterAndRerender(evt.target.id, evt.target.value);
    }
  }
}
