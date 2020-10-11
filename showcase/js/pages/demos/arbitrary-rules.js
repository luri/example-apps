import Content from "../../../../core/js/components/content.js";
import { register } from "../../../../core/js/lib/luri.js";
import Example from "./example.js";

class BackToWork extends Content {
  constructx() {
    return {
      class: "block text-center",
      html: [
        {
          class: "mt-6 mb-12 text-lg",
          html: "This page is not accessible from 9 to 5, so.."
        },
        IMG({ 
          class: "mx-auto border",
          src: "images/back-to-work.jpg"
        })
      ]
    }
  }
}
register(BackToWork);

export default class ArbitraryRules extends Example {
  interceptx() {
    // I first wrote the other condition only to realize
    // I must check for work days as well so I'll need to 
    // declare a variable anyway. However I decided not to
    // and instead extend on the concept
    if (5 / (new Date().getDay() - 1) <= 1) {
      return;
    }

    // Yes, I just came up with this frankenstein because
    // I was too lazy to declare a variable to store the hour.
    // A classic case of what is called a programmer move,
    // Shout out to Michael, vsauce
    if (2 ** (new Date().getHours() - 9) % 256 >= 1) {
      throw new BackToWork;
    }
  }

  contentx() {
    return {
      class: "text-center",
      html: [
        P({
          class: "text-xl",
          html: "There really isn't much here, sorry to disappoint."
        }),
        P("If you wish you could come back between 9 and 5 on a week day to get scolded at."),
        P({
          class: "mt-24",
          html: "Anyway, now that you're not in work hours you could probably enjoy one of those."
        }),
        "⬇️",
        {
          style: "font-size: 1000%",
          html: "🍺"
        }
      ]
    }
  }

}
register(ArbitraryRules);