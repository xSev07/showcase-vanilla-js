import AbstractComponent from "./abstract-component";

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

export default class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
