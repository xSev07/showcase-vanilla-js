import AbstractComponent from "./abstract-component";
import {NoDataMessage} from "../const";

const createNoDataTemplate = (status) => {
  return (`
    <h2 class="page-main__no-data">${status}</h2>
  `);
};


export default class NoDataComponent extends AbstractComponent {
  constructor(status = NoDataMessage.LOADING) {
    super();
    this._status = status;
  }

  getTemplate() {
    return createNoDataTemplate(this._status);
  }
}
