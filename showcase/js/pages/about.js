import { register } from "../../../core/js/lib/luri.js";
import Anchor, { BlankAnchor } from "../components/anchor.js";
import Page from "../components/page.js";


export default class AboutPage extends Page {

  propsx() {
    return {
      class: "relative text-center w-full overflow-hidden"
    }
  }

  contentx() {
    return [


      {
        style: "background: #232a37",
        class: "absolute top-0 left-0 w-full h-full transform -skew-y-12 -translate-y-32"
      },
      {
        style: "background: #212735",
        class: "absolute top-0 left-0 w-full h-full transform skew-y-12 -translate-y-1/2"
      },


      {
        class: "bg-purple-800 py-10 px-4 relative z-10",
        html: [
          {
            class: "text-3xl italic",
            html: "Dear god, please not another jabbascript work of art.."
          },

          {
            html: "‒ is probably what I'd say to myself if I saw this for the first time."
          },
        ]
      },

      {
        class: "mt-6 px-4 relative z-10",
        html: [
          "However, if you open your dev tools you ", I("might"), " get surprised",
          {
            class: "text-sm text-gray-600",
            html: "depending on what year it is by the time you're reading this."
          }
        ]
      },

      {
        class: "mt-8 text-left max-w-2xl mx-auto px-6 py-4 bg-gray-800 relative z-10",
        html: [
          {
            class: "text-xl text-center",
            html: "Rant"
          }, {
            html: [
              P("I don't know about you but I'm pretty upset with the amount of overhead that comes with current SPA frameworks."),
              P("It seems like we are straying further and further away from how browsers were intended to be programmed, in an attempt to solve a problem that isn't there.")
            ]
          },

          {
            class: "text-xl text-center mt-4",
            html: "Working principle"
          }, {
            html: [
              P(["The lifeblood of luri is ", STRONG("simplicity"), ", but not necessarily for you at the expense of the machine, trying to strike a balance."]),
              P("No bundlers, no transpilers, no dev servers, no production builds, no x, no y, no z.."),
              P([
                "Luri works exclusively by utilizing native (ES6) modules and modern JavaScript APIs. If your browser has trouble supporting those you're headed ",
                BlankAnchor("back to the mesozoic era", "update.html"), "."
              ])
            ]
          },

          {
            class: "text-xl text-center mt-4",
            html: "Purpose"
          }, {
            html: "I'm definitely not aiming at replacing or rivalring existing frameworks. It's more like providing an alternative to anyone who feels the way I do. Luri is not well suited for mainstream production apps. It could perhaps be used in Electron apps or other environments where a modern JavaScript runtime is guaranteed. I mean, you could transpile it down to ES5 if you really wanted, but that'd be kind of defeating its purpose and in that case you'd probably be better off using another framework."
          },

          {
            class: "text-xl text-center mt-4",
            html: "But, why?"
          }, {
            html: "I don't really have a good answer ot this question. It started off as a joke and a small utility library and it grew to the point where I'm creating moderately complex applications with it. Decided to share it with the world."
          },

          {
            class: "text-xl text-center mt-4",
            html: "How to use?"
          }, {
            html: [
              {
                node: "pre",
                class: "px-4 py-2 bg-gray-900 mt-2 mb-4 overflow-auto",
                html: "git clone https://github.com/luri/app"
              },
              // Demonstrate htmlx property, which allows for parsing html
              // not recommended, but exists
              P({
                htmlx: "That's all, open <i><strong>app/boiler</strong></i> in your browser."
              }),
              P("As a basic guideline, avoid modifying core. Instead extend and edit there."),
              P([
                "As of now there is no documentation, if you're interested you can look up ",
                new Anchor("the examples'", hash("/demos")),
                " source and find what you need. Depending on how bad this whole thing gets trashed I might document it one day."
              ])
            ]
          }
        ]
      }
    ]
  }

}
register(AboutPage);