import FilterComponent from "../components/filter-component";
import CatalogComponent from "../components/catalog";
import CurrencyComponent from "../components/currency-component";
import CoursesComponent from "../components/courses-component";
import {render} from "../utils/render";
import {getFilters} from "../utils/filter";
import CourseCardComponent from "../components/course-card";
import CoursesModel from "../models/courses-model";

export default class PageController {
  constructor(api) {
    this._api = api;
    this._siteMainElement = document.querySelector(`.page-main`);
    this._catalogComponent = new CatalogComponent();
    this._currencyComponent = new CurrencyComponent();
    this._coursesComponent = new CoursesComponent();
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

  _renderAfterAcceptData(courses) {
    this._coursesModel = new CoursesModel(courses);
    this._filterComponent = new FilterComponent(getFilters(courses));
    render(this._siteMainElement, this._filterComponent);
    render(this._siteMainElement, this._catalogComponent);
    render(this._siteMainElement, this._currencyComponent);
    render(this._siteMainElement, this._coursesComponent);
    this._coursesListElement = this._coursesComponent.getContainerElement();
    this._coursesModel.getCourses().forEach((it) => {
      render(this._coursesListElement, new CourseCardComponent(it));
    });
  }
}
