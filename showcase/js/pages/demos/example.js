
import Content from "../../../../core/js/components/content.js";
import DemosIndex from "./index.js";

export default class Example extends Content {
    
  animinx(content) {
    return content instanceof DemosIndex ? "fadeInRight" : super.animinx(content);
  }

  animoutx(content) {
    return content instanceof DemosIndex ? "fadeOutRight" : super.animoutx(content);
  }

}