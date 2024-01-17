import "@fortawesome/fontawesome-free/css/all.css";
import { CssAnimator } from "aurelia-animator-css";
import { Aurelia } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import environment from "../config/environment.json";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("resources/index"))
    .plugin(PLATFORM.moduleName("aurelia-animator-css"));

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  aurelia.start().then(() => {
    const animator = aurelia.container.get(CssAnimator);
    aurelia.container.registerInstance("animator", animator);

    aurelia.setRoot(PLATFORM.moduleName("app"));
  });
}
