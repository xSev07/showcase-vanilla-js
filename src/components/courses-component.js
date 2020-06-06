import AbstractComponent from "./abstract-component";

const createGoodsTemplate = () => {
  return (`
    <div class="courses">
      <ul class="courses__list">
        <li class="courses__item">
          <img class="courses__picture" src="img/default.jpg" alt="Алгебра">
          <div class="courses__info">
            <p class="courses__title">Алгебра</p>
            <p class="courses__grade">7 класс</p>
            <p class="courses__genre">рабочая тетрадь</p>
            <p class="courses__additional">
              <a class="courses__additional-link" href="#">Подробнее</a>
            </p>
          </div>
          <p class="courses__buy">
            <a class="courses__buy-link" href="#">Попробовать</a>
          </p>
        </li>
      </ul>
    </div>
  `);
};


export default class CoursesComponent extends AbstractComponent {
  getTemplate() {
    return createGoodsTemplate();
  }
}
