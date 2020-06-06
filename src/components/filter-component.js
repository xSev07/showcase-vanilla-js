import AbstractComponent from "./abstract-component";

const createFilterTemplate = () => {
  return (`
    <section class="filter">
      <h2 class="visually-hidden">Фильтры</h2>
      <ul class="filter__list">
        <li class="filter__item">
          <label for="subject" class="visually-hidden">Выберите предмет</label>
          <select id="subject" class="filter__option input">
            <option value="all">Все предметы</option>
            <option value="algebra">Алгебра</option>
          </select>
        </li>
        <li class="filter__item">
          <label for="genre" class="visually-hidden">Выберите жанр</label>
          <select id="genre" class="filter__option input">
            <option value="all">Все жанры</option>
            <option value="algebra">Демо</option>
          </select>
        </li>
        <li class="filter__item">
          <label for="class" class="visually-hidden">Выберите класс</label>
          <select id="class" class="filter__option input">
            <option value="all">Все классы</option>
            <option value="algebra">1</option>
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
  constructor(courses) {
    super();
    this._courses = courses;
  }
  getTemplate() {
    return createFilterTemplate();
  }
}
