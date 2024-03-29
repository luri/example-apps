import Application from "../../../boiler/js/components/app.js";
import { register } from "../../../core/js/lib/luri.js";

export default class TerraformBoardApp extends Application {

  getContentRootElementx() {
    return this.getElementsByClassName("app-root")[0];
  }

  loadx(module) {
    return import(module);
  }

  resolvex(path) {
    return "../pages" + path + ".js"
  }

  constructx() {
    return {
      class: "flex flex-col h-full w-full overflow-y-auto overflow-x-hidden",
      html: [
        {
          class: "app-root flex justify-center flex-1",
          html: new (this.blankContentx()),
        },
      ]
    };
  }
}

register(TerraformBoardApp);