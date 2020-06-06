import FilterComponent from "../components/filter-component";
import CatalogComponent from "../components/catalog";
import CurrencyComponent from "../components/currency-component";
import GoodsComponent from "../components/goods-component";
import {render} from "../utils/render";
import {getFilters} from "../utils/filter";

export default class PageController {
  constructor(api) {
    this._api = api;
    this._siteMainElement = document.querySelector(`.page-main`);
    this._catalogComponent = new CatalogComponent();
    this._currencyComponent = new CurrencyComponent();
    this._goodsComponent = new GoodsComponent();
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
    this._filterComponent = new FilterComponent(getFilters(courses));
    render(this._siteMainElement, this._filterComponent);
    render(this._siteMainElement, this._catalogComponent);
    render(this._siteMainElement, this._currencyComponent);
    render(this._siteMainElement, this._goodsComponent);
  }
}
