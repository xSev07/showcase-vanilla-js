import FilterComponent from "./components/filter-component";
import {render} from "./utils/render";
import CatalogComponent from "./components/catalog";
import CurrencyComponent from "./components/currency-component";
import GoodsComponent from "./components/goods-component";

const siteMainElement = document.querySelector(`.page-main`);

const filterComponent = new FilterComponent();
const catalogComponent = new CatalogComponent();
const currencyComponent = new CurrencyComponent();
const goodsComponent = new GoodsComponent();

render(siteMainElement, filterComponent);
render(siteMainElement, catalogComponent);
render(siteMainElement, currencyComponent);
render(siteMainElement, goodsComponent);
