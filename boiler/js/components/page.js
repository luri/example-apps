import Content from "../../../core/js/components/content.js";

export default class Page extends Content {

  titlex() {
    return this.idx().replace("Page", "").replace(":", " - ");
  }

}