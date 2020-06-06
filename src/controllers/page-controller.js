import FilterComponent from "../components/filter-component";
import CatalogComponent from "../components/catalog";
import CurrencyComponent from "../components/currency-component";
import GoodsComponent from "../components/goods-component";
import {render} from "../utils/render";

export default class PageController {
  constructor(api) {
    this._api = api;
    this._siteMainElement = document.querySelector(`.page-main`);
    this._filterComponent = new FilterComponent();
    this._catalogComponent = new CatalogComponent();
    this._currencyComponent = new CurrencyComponent();
    this._goodsComponent = new GoodsComponent();
  }

  render() {

    // TODO: Реализовать заглушку на время загрузки данных

    this._api.getCourses()
      .then((courses) => this._renderAfterAcceptData(courses))
      .catch(() => {
        // TODO: Реализовать заглушку при ошибки загрузки данных
      });
  }

  _renderAfterAcceptData(courses) {
    render(this._siteMainElement, this._filterComponent);
    render(this._siteMainElement, this._catalogComponent);
    render(this._siteMainElement, this._currencyComponent);
    render(this._siteMainElement, this._goodsComponent);
  }
}
