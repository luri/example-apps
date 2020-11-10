import ClassList from "../../../core/js/lib/classlist.js";
import { register } from "../../../core/js/lib/luri.js";
import { animate } from "../../../core/js/lib/util.js";
import AppContentRoot from "../components/app-content-root.js";
import AppButton from "../components/button.js";
import Page from "../components/page.js";
import { ButtonPrimary, Heading, HeadingParagraph } from "../styles/common.js";


export default class DemosPage extends Page {

  // Allow the page to get cached regardless of 
  // the query, essentially prevent creating a
  // new instance for every sub-page.
  static idx() {
    return super.idx(null);
  }

  propsx() {
    return {
      class: "max-w-full px-4"
    };
  }

  contentx() {
    return {
      class: "flex flex-col items-center",
      html: [
        H3({
          class: Heading,
          html: "Examples"
        }),
        P({
          class: `${new ClassList(HeadingParagraph).delete("pb-8")} pb-4 border-b-2 border-gray-800 px-16 text-center`,
          html: [
            {
              html: "Here you will find examples of how you could tackle common UI programming challenges using luri."
            },
            BUTTON({
              class: `${ButtonPrimary} mt-4`,
              html: "Open source code",
              onclick: () => {
                let example = (location.hash.match(/#.demos:([\w-]+)/) || ["index"]).pop();
        
                window.open(`https://github.com/luri/example-apps/blob/master/showcase/js/pages/demos/${example}.js#L1`)
              }
            })
          ]
        }),

        new DemosRoot({
          class: "w-full flex justify-center"
        })
      ]
    }
  }
}
register(DemosPage);

export class DemosRoot extends AppContentRoot {
  
  validatex(path) {
    return path.indexOf("/demos") === 0;
  }

  parsex(route) {
    let [path, query] = super.parsex(route);

    query = (query || "").split("/");

    return [path, query];
  }

  resolvex(path, query) {
    return `.${path}/${query[0] || "index"}.js`;
  }

  loadx(module) {
    return import(module);
  }
}
register(DemosRoot);