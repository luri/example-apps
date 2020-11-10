import Cursor from "../../../../core/js/lib/cursor.js";
import { register } from "../../../../core/js/lib/luri.js";
import { delay, smoothie } from "../../../../core/js/lib/util.js";
import apploader from "../../components/loader.js";
import { ButtonSecondary } from "../../styles/common.js";
import Example from "./example.js";
import { post, postsurl } from "./posts.js";


export default class InfiniteScrollDemo extends Example {

  cursor = new Cursor(postsurl);

  async datax() {
    await delay(2000 * Math.random()); // fake load

    return this.cursor.fetch();
  }

  async buttonclickx(event) {
    let loading = await smoothie(apploader(), event.target)

    this.datax().then(posts => {
      loading.replaceWith(event.target);
      posts.forEach(p => smoothie(post(p), null, this.containerx));
    }, () => {
      smoothie(IMG({ class: "w-64 mx-auto", src: "images/porky.png" }), loading);
    })
  }

  contentx(posts) {
    return {
      class: "text-center",
      html: [
        P("Let's see how we can load the posts using the infinite scroll effect."),
        P({
          class: "text-sm text-gray-600",
          html: "Definitely not much on the infinite side in this particular example."
        }),

        {
          class: "flex flex-wrap justify-center",
          html: posts.map(post),
          ref: e => this.containerx = e
        },

        BUTTON({
          class: ButtonSecondary,
          html: "Show more",
          onclick: this.buttonclickx.bind(this)
        })
      ]
    }
  }
}

register(InfiniteScrollDemo);
