import AbstractComponent from "./abstract-component";

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


export default class CurrencyComponent extends AbstractComponent {
  getTemplate() {
    return createCurrencyTemplate();
  }
}
