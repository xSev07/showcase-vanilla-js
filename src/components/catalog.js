import AbstractComponent from "./abstract-component";

const createCatalogTemplate = () => {
  return (`
    <section class="catalog">
      <h2 class="visually-hidden">Каталог</h2>
    </section>
  `);
};

export default class CatalogComponent extends AbstractComponent {
  getTemplate() {
    return createCatalogTemplate();
  }
}
