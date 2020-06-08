/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/server.js":
/*!***************************!*\
  !*** ./src/api/server.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Server; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _models_course_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/course-model */ "./src/models/course-model.js");
/* harmony import */ var _mocks_courses_mock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mocks/courses-mock */ "./src/mocks/courses-mock.js");




const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= _const__WEBPACK_IMPORTED_MODULE_0__["ResponseStatus"].OK && response.status < _const__WEBPACK_IMPORTED_MODULE_0__["ResponseStatus"].REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

class Server {
  constructor(endPoint) {
    this._endPoint = endPoint;
  }

  getMockCourses() {
    return Promise.resolve(_models_course_model__WEBPACK_IMPORTED_MODULE_1__["default"].parseCourses(_mocks_courses_mock__WEBPACK_IMPORTED_MODULE_2__["mockCourses"]));
  }

  getCourses() {
    return this._load({
      url: `update`,
      method: Method.POST,
      body: JSON.stringify({"data": ``})
    })
      .then((response) => response.json())
      .then((response) => _models_course_model__WEBPACK_IMPORTED_MODULE_1__["default"].parseCourses(response.items));
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}


/***/ }),

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_render__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/abstract-smat-component.js":
/*!***************************************************!*\
  !*** ./src/components/abstract-smat-component.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractSmartComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


class AbstractSmartComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parentElement = oldElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parentElement.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }
}


/***/ }),

/***/ "./src/components/catalog.js":
/*!***********************************!*\
  !*** ./src/components/catalog.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createCatalogTemplate = () => {
  return (`
    <section class="catalog">
      <h2 class="visually-hidden">Каталог</h2>
    </section>
  `);
};

class CatalogComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createCatalogTemplate();
  }
}


/***/ }),

/***/ "./src/components/course-card.js":
/*!***************************************!*\
  !*** ./src/components/course-card.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CourseCardComponent; });
/* harmony import */ var _abstract_smat_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-smat-component */ "./src/components/abstract-smat-component.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



const createCardTemplate = (course, currency) => {
  const grades = course.grades.length > 1
    ? `${course.grades[0]}-${course.grades[course.grades.length - 1]} классы`
    : `${course.grades} класс`;
  return (`
    <li class="courses__item">
      <picture>
        <source type="image/webp" srcset="img/${course.id}.webp">
        <img class="courses__picture" src="img/${course.id}.jpg" alt="Алгебра">
      </picture>
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

class CourseCardComponent extends _abstract_smat_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(course, currency = _const__WEBPACK_IMPORTED_MODULE_1__["Currency"].RUB) {
    super();
    this._course = course;
    this._currency = currency;
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


/***/ }),

/***/ "./src/components/courses-component.js":
/*!*********************************************!*\
  !*** ./src/components/courses-component.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CoursesComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createCoursesTemplate = () => {
  return (`
    <div class="courses">
      <ul class="courses__list">
        
      </ul>
    </div>
  `);
};


class CoursesComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createCoursesTemplate();
  }

  getContainerElement() {
    return this.getElement().querySelector(`.courses__list`);
  }
}


/***/ }),

/***/ "./src/components/currency-component.js":
/*!**********************************************!*\
  !*** ./src/components/currency-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CurrencyComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createCurrencyTemplate = () => {
  return (`
    <div class="catalog__currency">
      <input type="radio" id="currency-rub" name="currency" value="rub" checked>
      <label for="currency-rub">Рубли</label>
      <input type="radio" id="currency-bonus" name="currency" value="bonus">
      <label for="currency-bonus">Бонусы</label>
    </div>  
  `);
};


class CurrencyComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createCurrencyTemplate();
  }

  setChangeHandler(handler) {
    this.getElement().querySelectorAll(`input[name=currency]`)
      .forEach((it) => it.addEventListener(`change`, handler));
  }
}


/***/ }),

/***/ "./src/components/filter-component.js":
/*!********************************************!*\
  !*** ./src/components/filter-component.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilterComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");


const createOptionTemplate = (value) => {
  return (`
    <option>${value}</option>
  `);
};

const createFilterTemplate = (filters) => {
  const subjectOptionsTemplate = filters.subjects.map((it) => createOptionTemplate(it)).join(`\n`);
  const genresOptionsTemplate = filters.genres.map((it) => createOptionTemplate(it)).join(`\n`);
  const gradesOptionsTemplate = filters.grades.map((it) => createOptionTemplate(it)).join(`\n`);
  return (`
    <section class="filter">
      <h2 class="visually-hidden">Фильтры</h2>
      <ul class="filter__list">
        <li class="filter__item">
          <label for="subject" class="visually-hidden">Выберите предмет</label>
          <select id="subject" class="filter__option input">
            ${subjectOptionsTemplate}
          </select>
        </li>
        <li class="filter__item">
          <label for="genre" class="visually-hidden">Выберите жанр</label>
          <select id="genre" class="filter__option input">
            ${genresOptionsTemplate}
          </select>
        </li>
        <li class="filter__item">
          <label for="class" class="visually-hidden">Выберите класс</label>
          <select id="class" class="filter__option input">
            ${gradesOptionsTemplate}
          </select>
        </li>
      </ul>
      <p class="filter__search-container">
        <label for="search" class="visually-hidden">Поиск по наименованию</label>
        <input id="search" class="filter__search input" type="text" placeholder="Поиск">
        <button class="filter__button-find" title="Найти">Найти</button>
      </p>
    </section>
  `);
};

class FilterComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setSearchSubmitHandler(handler) {
    this.getElement().querySelector(`#search`).addEventListener(`keydown`, handler);
  }

  setSubjectChangeHandler(handler) {
    this.getElement().querySelector(`#subject`).addEventListener(`change`, handler);
  }

  setGenreChangeHandler(handler) {
    this.getElement().querySelector(`#genre`).addEventListener(`change`, handler);
  }

  setGradeChangeHandler(handler) {
    this.getElement().querySelector(`#class`).addEventListener(`change`, handler);
  }

  setFiltersChangeHandlers(handler) {
    this.setSubjectChangeHandler(handler);
    this.setGenreChangeHandler(handler);
    this.setGradeChangeHandler(handler);
  }
}


/***/ }),

/***/ "./src/components/no-data-component.js":
/*!*********************************************!*\
  !*** ./src/components/no-data-component.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoDataComponent; });
/* harmony import */ var _abstract_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component */ "./src/components/abstract-component.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



const createNoDataTemplate = (status) => {
  return (`
    <h2 class="page-main__no-data">${status}</h2>
  `);
};


class NoDataComponent extends _abstract_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(status = _const__WEBPACK_IMPORTED_MODULE_1__["NoDataMessage"].LOADING) {
    super();
    this._status = status;
  }

  getTemplate() {
    return createNoDataTemplate(this._status);
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: useMocks, Currency, KeyCode, NoDataMessage, ResponseStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMocks", function() { return useMocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Currency", function() { return Currency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCode", function() { return KeyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDataMessage", function() { return NoDataMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseStatus", function() { return ResponseStatus; });
const useMocks = true;

const Currency = {
  RUB: `price`,
  BONUS: `priceBonus`,
};

const KeyCode = {
  ENTER: 13,
};

const NoDataMessage = {
  LOADING: `Данные загружаются...`,
  ERROR: `Не получилось загрузить данные. Попробуйте позднее`,
  NOT_FIND: `Результаты поиска: Курсы не найдены`,
};

const ResponseStatus = {
  OK: 200,
  REDIRECT: 300
};


/***/ }),

/***/ "./src/controllers/page-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/page-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageController; });
/* harmony import */ var _components_filter_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/filter-component */ "./src/components/filter-component.js");
/* harmony import */ var _components_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/catalog */ "./src/components/catalog.js");
/* harmony import */ var _components_currency_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/currency-component */ "./src/components/currency-component.js");
/* harmony import */ var _components_courses_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/courses-component */ "./src/components/courses-component.js");
/* harmony import */ var _utils_render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/render */ "./src/utils/render.js");
/* harmony import */ var _utils_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/filter */ "./src/utils/filter.js");
/* harmony import */ var _components_course_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/course-card */ "./src/components/course-card.js");
/* harmony import */ var _models_courses_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/courses-model */ "./src/models/courses-model.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _components_no_data_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/no-data-component */ "./src/components/no-data-component.js");











class PageController {
  constructor(api) {
    this._api = api;
    this._displayedCourses = [];
    this._currentCurrency = _const__WEBPACK_IMPORTED_MODULE_8__["Currency"].RUB;
    this._siteMainElement = document.querySelector(`.page-main`);
    this._coursesListElement = null;
    this._noDataComponent = new _components_no_data_component__WEBPACK_IMPORTED_MODULE_9__["default"]();
    this._catalogComponent = new _components_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._currencyComponent = new _components_currency_component__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._coursesComponent = new _components_courses_component__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSearchSubmit = this._onSearchSubmit.bind(this);
    this._onCurrencyChange = this._onCurrencyChange.bind(this);
  }

  render() {
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._siteMainElement, this._noDataComponent);

    let response;
    if (_const__WEBPACK_IMPORTED_MODULE_8__["useMocks"]) {
      response = this._api.getMockCourses();
    } else {
      response = this._api.getCourses();
    }
    // this._api.getCourses()
    // this._api.getMockCourses()
    response
      .then((courses) => this._renderAfterAcceptData(courses))
      .catch(() => {
        const oldComponent = this._noDataComponent;
        this._noDataComponent = new _components_no_data_component__WEBPACK_IMPORTED_MODULE_9__["default"](_const__WEBPACK_IMPORTED_MODULE_8__["NoDataMessage"].ERROR);
        Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["replace"])(this._noDataComponent, oldComponent);
      });
  }

  _renderCourses() {
    const courses = this._coursesModel.getCourses();
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["remove"])(this._noDataComponent);
    if (courses.length === 0) {
      this._noDataComponent = new _components_no_data_component__WEBPACK_IMPORTED_MODULE_9__["default"](_const__WEBPACK_IMPORTED_MODULE_8__["NoDataMessage"].NOT_FIND);
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._coursesListElement, this._noDataComponent, _utils_render__WEBPACK_IMPORTED_MODULE_4__["PlaceInsert"].BEFORE_BEGIN);
    }

    courses.forEach((it) => {
      const newCourseComponent = new _components_course_card__WEBPACK_IMPORTED_MODULE_6__["default"](it, this._currentCurrency);
      this._displayedCourses.push(newCourseComponent);
      Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._coursesListElement, newCourseComponent);
    });
  }

  _renderAfterAcceptData(courses) {
    this._coursesModel = new _models_courses_model__WEBPACK_IMPORTED_MODULE_7__["default"](courses);
    this._filterComponent = new _components_filter_component__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_utils_filter__WEBPACK_IMPORTED_MODULE_5__["getFilters"])(courses));
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._siteMainElement, this._filterComponent);
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._siteMainElement, this._catalogComponent);
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._siteMainElement, this._currencyComponent);
    Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["render"])(this._siteMainElement, this._coursesComponent);

    this._coursesListElement = this._coursesComponent.getContainerElement();
    this._renderCourses();

    this._filterComponent.setFiltersChangeHandlers(this._onFilterChange);
    this._filterComponent.setSearchSubmitHandler(this._onSearchSubmit);
    this._currencyComponent.setChangeHandler(this._onCurrencyChange);
  }

  _setFilterAndRerender(filterType, value) {
    this._coursesModel.setFilter(filterType, value);
    this._displayedCourses.forEach((course) => Object(_utils_render__WEBPACK_IMPORTED_MODULE_4__["remove"])(course));
    this._displayedCourses = [];
    this._renderCourses();
  }

  _onCurrencyChange(evt) {
    this._displayedCourses.forEach((course) => {
      const selectedCurrency = _const__WEBPACK_IMPORTED_MODULE_8__["Currency"][evt.target.value.toUpperCase()];
      this._currentCurrency = selectedCurrency;
      course.setCurrency(selectedCurrency);
      course.rerender();
    });
  }

  _onFilterChange(evt) {
    this._setFilterAndRerender(evt.target.id, evt.target.value);
  }

  _onSearchSubmit(evt) {
    if (evt.keyCode === _const__WEBPACK_IMPORTED_MODULE_8__["KeyCode"].ENTER) {
      this._setFilterAndRerender(evt.target.id, evt.target.value);
    }
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_page_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/page-controller */ "./src/controllers/page-controller.js");
/* harmony import */ var _api_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/server */ "./src/api/server.js");



const END_POINT = `http://krapipl.imumk.ru:8082/api/mobilev1`;
const server = new _api_server__WEBPACK_IMPORTED_MODULE_1__["default"](END_POINT);

const pageController = new _controllers_page_controller__WEBPACK_IMPORTED_MODULE_0__["default"](server);
pageController.render();


/***/ }),

/***/ "./src/mocks/courses-mock.js":
/*!***********************************!*\
  !*** ./src/mocks/courses-mock.js ***!
  \***********************************/
/*! exports provided: mockCourses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mockCourses", function() { return mockCourses; });
const mockCourses = [
  {
    courseHash: "318195250115271701719214121150250168217123912252217",
    courseId: "80",
    description: "280 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267727",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267727",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267727",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/103",
    size: 0,
    status: "free",
    subject: "Алгебра",
    title: "Рабочая тетрадь. Алгебра, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "20474204246309206195154243821962081072919715989470",
    courseId: "81",
    description: "220 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267728",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267728",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK2_Course_267728",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/104",
    size: 0,
    status: "free",
    subject: "Алгебра",
    title: "Рабочая тетрадь. Алгебра, 8 класс",
    winstore_id: "",
  },
  {
    courseHash: "882101439242897615612422322382101124210129222068273",
    courseId: "82",
    description: "220 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267729",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267729",
    grade: "9",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267729",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/105",
    size: 0,
    status: "free",
    subject: "Алгебра",
    title: "Рабочая тетрадь. Алгебра, 9 класс",
    winstore_id: "",
  },
  {
    courseHash: "422521216518694124571452409016321213367253229850250",
    courseId: "55",
    description: "180 интерактивных заданий, ↵3 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267724",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267724",
    grade: "5",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267724",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-100",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Рабочая тетрадь. Естествознание, 5 класс",
    winstore_id: "",
  },
  {
    courseHash: "10999636811136421382541264422812821198911319259229",
    courseId: "61",
    description: "190 интерактивных заданий, ↵3 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267720",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267720",
    grade: "6",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK2_Course_267720",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-85",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Рабочая тетрадь. Биология, 6 класс",
    winstore_id: "",
  },
  {
    courseHash: "80229147931161614971215133791841683421713251235181196",
    courseId: "27",
    description: "300 интерактивных заданий, 4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267721",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267721",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267721",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-86",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Рабочая тетрадь. Биология, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "5818797474136332411412614684972072212433422963116",
    courseId: "50",
    description: "",
    extId: "Physicon_IMUMK_Course_267722",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267722",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267722",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-87",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Рабочая тетрадь. Биология, 8 класс",
    winstore_id: "",
  },
  {
    courseHash: "22819224714622969842532207252132142569720922961923",
    courseId: "79",
    description: "700 интерактивных заданий и 7 контрольных работ",
    extId: "Physicon_IMUMK_Course_278049",
    genre: "Задачник",
    google_id: "ru.fizikon.physicon_imumk_course_278049",
    grade: "8;9;10;11",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_278049",
    lang: "ru",
    price: 1000,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-110",
    size: 0,
    status: "",
    subject: "Биология",
    title: "Задачник. Биология: 8–11 класс",
    winstore_id: "",
  },
  {
    courseHash: "13913869341007279197220128146718313103531814142",
    courseId: "51",
    description: "300 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267723",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267723",
    grade: "9",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267723",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-88",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Рабочая тетрадь. Биология, 9 класс",
    winstore_id: "",
  },
  {
    courseHash: "3121521826135187942312620974249198302322059373106196",
    courseId: "4415",
    description: "",
    extId: "Physicon_IMUMK_Course_374258",
    genre: "Подготовка к ЕГЭ",
    google_id: "",
    grade: "10;11",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_374258",
    lang: "ru",
    price: 600,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/9012",
    size: 0,
    status: "free",
    subject: "Биология",
    title: "Тренажёр по подготовке к ЕГЭ-2019. Биология ",
    winstore_id: "",
  },
  {
    courseHash: "81551377359539910123116622620967247147743190202",
    courseId: "56",
    description: "",
    extId: "Physicon_IMUMK_Course_267736",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267736",
    grade: "6",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267736",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-91",
    size: 0,
    status: "free",
    subject: "География",
    title: "Рабочая тетрадь. География, 6 класс",
    winstore_id: "",
  },
  {
    courseHash: "16014115160108720105651821559417123420892932821528",
    courseId: "57",
    description: "",
    extId: "Physicon_IMUMK_Course_267737",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267737",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267737",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-92",
    size: 0,
    status: "free",
    subject: "География",
    title: "Рабочая тетрадь. География, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "13321920988938414920012519175911237510073152815786",
    courseId: "53",
    description: "",
    extId: "Physicon_IMUMK_Course_267738",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267738",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267738",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-93",
    size: 0,
    status: "free",
    subject: "География",
    title: "Рабочая тетрадь. География, 8 класс",
    winstore_id: "",
  },
  {
    courseHash: "1113142155591601951151151292551542291017424120312017195",
    courseId: "58",
    description: "",
    extId: "Physicon_IMUMK_Course_267739",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267739",
    grade: "9",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267739",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-94",
    size: 0,
    status: "free",
    subject: "География",
    title: "Рабочая тетрадь. География, 9 класс",
    winstore_id: "",
  },
  {
    courseHash: "58863924517346916919619080817643154215748162",
    courseId: "4416",
    description: "",
    extId: "Physicon_IMUMK_Course_374178",
    genre: "Подготовка к ЕГЭ",
    google_id: "",
    grade: "10;11",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_374178",
    lang: "ru",
    price: 600,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/9013",
    size: 0,
    status: "free",
    subject: "География",
    title: "Тренажёр по подготовке к ЕГЭ-2019. География",
    winstore_id: "",
  },
  {
    courseHash: "2442286921131968831812441732610715281130168248210",
    courseId: "76",
    description: "",
    extId: "Physicon_IMUMK_Course_267730",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267730",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267730",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/106",
    size: 0,
    status: "free",
    subject: "Геометрия",
    title: "Рабочая тетрадь. Геометрия, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "2710822424218610324916925531961391141619715312622210685",
    courseId: "77",
    description: "170 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267731",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267731",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267731",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/107",
    size: 0,
    status: "free",
    subject: "Геометрия",
    title: "Рабочая тетрадь. Геометрия, 8 класс",
    winstore_id: "",
  },
  {
    courseHash: "23119339131175260572625119835509416714361402418",
    courseId: "78",
    description: "200 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267732",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267732",
    grade: "9",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267732",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/108",
    size: 0,
    status: "free",
    subject: "Геометрия",
    title: "Рабочая тетрадь. Геометрия, 9 класс",
    winstore_id: "",
  },
  {
    courseHash: "219215114782452362311032722612815863118195112321441579",
    courseId: "67",
    description: "140 интерактивных заданий, 2 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267733",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267733",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267733",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/109",
    size: 0,
    status: "free",
    subject: "Информатика",
    title: "Рабочая тетрадь. Информатика, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "2514320124322329215657337561511690651532409118325",
    courseId: "69",
    description: "",
    extId: "Physicon_IMUMK_Course_267734",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267734",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267734",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/110",
    size: 0,
    status: "free",
    subject: "Информатика",
    title: "Рабочая тетрадь. Информатика, 8 класс",
    winstore_id: "",
  },
  {
    courseHash: "6288141171291225912750236250154173355521650475036",
    courseId: "68",
    description: "250 интерактивных заданий, 4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267735",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267735",
    grade: "9",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK_Course_267735",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/111",
    size: 0,
    status: "free",
    subject: "Информатика",
    title: "Рабочая тетрадь. Информатика, 9 класс",
    winstore_id: "",
  },
  {
    courseHash: "1141261785317524457145385922711916414323023115810039",
    courseId: "48",
    description: "",
    extId: "Physicon_IMUMK_Course_267740",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267740",
    grade: "5",
    isNew: false,
    itunes_id: "ru.physicon.imumk.WB.Physicon_IMUMK2_Course_267740",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-95",
    size: 0,
    status: "free",
    subject: "История",
    title: "Рабочая тетрадь. История, 5 класс",
    winstore_id: "",
  },
  {
    courseHash: "12944471321511331991849822251895619323197135165234",
    courseId: "65",
    description: "",
    extId: "Physicon_IMUMK_Course_267741",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267741",
    grade: "6",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK2_Course_267741",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-96",
    size: 0,
    status: "free",
    subject: "История",
    title: "Рабочая тетрадь. История, 6 класс",
    winstore_id: "",
  },
  {
    courseHash: "2302162421724520411122022081218762312221649871216758",
    courseId: "64",
    description: "290 интерактивных заданий, ↵4 тематические контрольные работы",
    extId: "Physicon_IMUMK_Course_267742",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267742",
    grade: "7",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK2_Course_267742",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-97",
    size: 0,
    status: "free",
    subject: "История",
    title: "Рабочая тетрадь. История, 7 класс",
    winstore_id: "",
  },
  {
    courseHash: "1692221266432153065410011324153741102350235174218",
    courseId: "62",
    description: "",
    extId: "Physicon_IMUMK_Course_267743",
    genre: "Рабочая тетрадь",
    google_id: "ru.fizikon.physicon_imumk_course_267743",
    grade: "8",
    isNew: false,
    itunes_id: "ru.physicon.imumk.Physicon_IMUMK2_Course_267743",
    lang: "ru",
    price: 400,
    priceBonus: 5000,
    progress: 0,
    requireUpdate: false,
    shopUrl: "https://multiring.ru/shop/details/-98",
    size: 0,
    status: "free",
    subject: "История",
    title: "Рабочая тетрадь. История, 8 класс",
    winstore_id: "",
  },
];


/***/ }),

/***/ "./src/models/course-model.js":
/*!************************************!*\
  !*** ./src/models/course-model.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CourseModel; });
class CourseModel {
  constructor(data) {
    this.id = data[`courseId`];
    this.idExtend = data[`extId`];
    this.courseHash = data[`courseHash`];
    this.title = data[`title`];
    this.grades = data[`grade`].split(`;`);
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


/***/ }),

/***/ "./src/models/courses-model.js":
/*!*************************************!*\
  !*** ./src/models/courses-model.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CoursesModel; });
/* harmony import */ var _utils_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/filter */ "./src/utils/filter.js");


class CoursesModel {
  constructor(courses) {
    this._courses = courses;
    this._activeFilters = {
      [_utils_filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"].SUBJECT]: `все `,
      [_utils_filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"].GENRE]: `все `,
      [_utils_filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"].GRADE]: `все `,
      [_utils_filter__WEBPACK_IMPORTED_MODULE_0__["FilterType"].SEARCH]: `все `,
    };
  }

  setFilter(filterType, filterValue) {
    this._activeFilters[filterType] = filterValue;
  }

  getCourses() {
    let filteredCourses = this._courses;
    for (let key in this._activeFilters) {
      if ({}.hasOwnProperty.call(this._activeFilters, key)) {
        filteredCourses = Object(_utils_filter__WEBPACK_IMPORTED_MODULE_0__["getCoursesByFilter"])(filteredCourses, key, this._activeFilters[key]);
      }
    }
    return filteredCourses;
  }
}


/***/ }),

/***/ "./src/utils/filter.js":
/*!*****************************!*\
  !*** ./src/utils/filter.js ***!
  \*****************************/
/*! exports provided: getFilters, FilterType, getCoursesByFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilters", function() { return getFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterType", function() { return FilterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoursesByFilter", function() { return getCoursesByFilter; });
const getFilters = (courses) => {
  const subjects = new Set();
  const genres = new Set();
  const grades = new Set();

  courses.forEach((it) => {
    subjects.add(it.subject);
    genres.add(it.genre);
    it.grades.forEach((grade) => grades.add(grade));
  });

  const filters = {
    subjects: Array.from(subjects).sort(),
    genres: Array.from(genres).sort(),
    grades: Array.from(grades).sort((a, b) => a - b),
  };

  filters.subjects.unshift(`Все предметы`);
  filters.genres.unshift(`Все жанры`);
  filters.grades.unshift(`Все классы`);

  return filters;
};

const FilterType = {
  SUBJECT: `subject`,
  GENRE: `genre`,
  GRADE: `class`,
  SEARCH: `search`,
};

const getCoursesByFilter = (courses, filterType, filterValue) => {
  if (filterValue.toLowerCase().startsWith(`все `) || filterValue === ``) {
    return courses;
  }

  switch (filterType) {
    case FilterType.SUBJECT:
      return courses.filter((it) => it.subject === filterValue);
    case FilterType.GENRE:
      return courses.filter((it) => it.genre === filterValue);
    case FilterType.GRADE:
      return courses.filter((it) => it.grades.includes(filterValue));
    case FilterType.SEARCH:
      const searchString = filterValue.toLowerCase();
      return courses.filter((it) => it.title.toLowerCase().includes(searchString));
    default:
      return courses;
  }
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: createElement, PlaceInsert, render, remove, replace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaceInsert", function() { return PlaceInsert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return replace; });
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

const PlaceInsert = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`,
};
const render = (container, component, place = PlaceInsert.BEFORE_END) => {
  switch (place) {
    case PlaceInsert.BEFORE_BEGIN:
      container.parentNode.prepend(component.getElement());
      break;
    case PlaceInsert.AFTER_BEGIN:
      container.prepend(component.getElement());
      break;
    case PlaceInsert.BEFORE_END:
      container.append(component.getElement());
      break;
    case PlaceInsert.AFTER_END:
      container.parentNode.append(component.getElement());
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  if (parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map