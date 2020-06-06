import PageController from "./controllers/page-controller";
import Server from "./api/server";

const END_POINT = `http://krapipl.imumk.ru:8082/api/mobilev1`;
const server = new Server(END_POINT);

const pageController = new PageController(server);
pageController.render();
