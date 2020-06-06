import AbstractComponent from "./abstract-component";

const createGoodsTemplate = () => {
  return (`
    <div class="goods">
      <ul class="goods__list">
        <li class="goods__item">
          <img class="goods__picture" src="img/default.jpg" alt="Алгебра">
          <div class="goods__info">
            <p class="goods__title">Алгебра</p>
            <p class="goods__grade">7 класс</p>
            <p class="goods__genre">рабочая тетрадь</p>
            <p class="goods__additional">
              <a class="goods__additional-link" href="#">Подробнее</a>
            </p>
          </div>
          <p class="goods__buy">
            <a class="goods__buy-link" href="#">Попробовать</a>
          </p>
        </li>
      </ul>
    </div>
  `);
};


export default class GoodsComponent extends AbstractComponent {
  getTemplate() {
    return createGoodsTemplate();
  }
}
