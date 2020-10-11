import { DemosRoot } from "../demos.js";
import { DefaultAnchor, ButtonPrimary, ButtonSecondary } from "../../styles/common.js";
import Example from "./example.js";
import { post, postsurl } from "./posts.js";
import web from "../../../../core/js/lib/web.js";
import { register } from "../../../../core/js/lib/luri.js";

export default class PaginationDemo extends Example {

  rootx = new PaginationRoot({ class: "flex justify-center" });

  listenersx() {
    return {
      "content-render": this.paintbuttonsx
    }
  }

  static idx() {
    return super.idx(null);
  }

  paintbuttonsx(route, path, query, content, root) {
    if (root !== this.rootx) {
      return;
    }

    for (let button of this.getElementsByClassName("buttons")[0].children) {
      button.className = button.dataset.page == content.pagex ? ButtonPrimary : ButtonSecondary;
    }
  }

  contentx() {
    return {
      class: "text-center",
      html: [
        P([
          "I snatched some posts from ",
          {
            node: "a",
            class: DefaultAnchor,
            href: "https://jsonplaceholder.typicode.com/",
            target: "_blank",
            html: "typicode"
          }, ", let's see how we can paginate them."
        ]),

        // flex flex-wrap justify-center
        {
          class: "py-8",
          html: this.rootx
        },

        {
          class: "buttons",
          html: [1, 2, 3, 4, 5].map(page => A({
            class: ButtonSecondary,
            data: { page },
            html: page,
            href: hash("/demos", "pagination/" + page)
          }))
        },

        P({
          class: "mt-8",
          html: "But let's be real, do the kids even know what pagination is these days?"
        }),
        P({
          class: "text-sm",
          html: [
            "Check out the more-relevant ",
            A({
              class: DefaultAnchor,
              html: "infinite scroll example",
              href: hash("/demos", "infinite-scroll")
            })
          ]
        })
      ]
    }
  }
}
register(PaginationDemo);

class PaginationRoot extends DemosRoot {
  validatex(path, query) {
    return super.validatex(path) && query && query[0] === "pagination";
  }

  loadx() {
    return Promise.resolve({
      default: PaginationPage
    });
  }
}
register(PaginationRoot);

class PaginationPage extends Example {

  pagex = this.queryx[1] || 1;

  // make sure :pagination and :pagination/1 
  // don't render as separate instances
  static idx(query) {
    return super.idx(`page-${query[1] || 1}`);
  }

  animinx(content) {
    if (content instanceof this.constructor) {
      return content.pagex < this.pagex ? "fadeInRight" : "fadeInLeft";
    }

    return super.animinx(content);
  }

  animoutx(content) {
    if (content instanceof this.constructor) {
      return content.pagex < this.pagex ? "fadeOutRight" : "fadeOutLeft";
    }

    return super.animoutx(content);
  }

  async datax() {
    return web.request(postsurl.replace("<page>", this.pagex));
  }

  contentx(data) {
    return {
      class: "flex flex-wrap justify-center",
      html: data.map(post)
    }
  }
}
register(PaginationPage);