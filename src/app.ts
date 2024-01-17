import { PLATFORM } from "aurelia-pal";
import { Router, RouterConfiguration } from "aurelia-router";
import "styles/animations.scss";
import "styles/app.scss";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = "Aurelia Pokedex";
    config.options.pushState = true;

    config.map([
      {
        route: "",
        name: "pokemonOverview",
        moduleId: PLATFORM.moduleName("components/pokemon/list/pokemon-list"),
        nav: true,
        title: "Pokemon List",
      },
      {
        route: "pokemon/:name",
        name: "pokemonDetail",
        moduleId: PLATFORM.moduleName(
          "components/pokemon/details/pokemon-details"
        ),
        title: "Pokemon Details",
      },
    ]);

    this.router = router;
  }
}
