import AbstractComponent from "./abstract-component";

const createCoursesTemplate = () => {
  return (`
    <div class="courses">
      <ul class="courses__list">
        
      </ul>
    </div>
  `);
};


export default class CoursesComponent extends AbstractComponent {
  getTemplate() {
    return createCoursesTemplate();
  }

  getContainerElement() {
    return this.getElement().querySelector(`.courses__list`);
  }
}
