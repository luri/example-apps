import auth from "../../../../core/js/lib/auth.js";
import { register } from "../../../../core/js/lib/luri.js";
import { ButtonSecondary, Heading } from "../../styles/common.js";
import LoginPage from "../login.js";
import Example from "./example.js";

// Probably define this in a more central place in the app
// But for this demo it's enough
auth.throwable = LoginPage;

export default class RequireLoginDemo extends Example {

  interceptx() {
    auth.require({
      html: [
        { class: "font-bold", html: "Only qualified personnel from here on.." },
        { class: "text-sm text-gray-600", html: "Psst.. Steve works here, his password is probably chickennuggets" }
      ]
    });
  }

  sessionx() {
    return {
      class: "flex justify-between items-center mb-16 w-full mx-auto",
      html: [
        {
          html: [
            { class: "text-sm", html: "Logged in as:" },
            { class: "font-bold", html: auth.user().name }
          ]
        },
        BUTTON({
          class: ButtonSecondary,
          html: "Log out",
          onclick: () => {
            auth.logout();
          }
        })
      ]
    }
  }

  propsx() {
    return Object.assign({
      class: "flex flex-col text-center w-full"
    }, super.propsx());
  }

  contentx() {
    return [
      this.sessionx(),

      {
        class: Heading,
        html: "Behold!"
      }, {
        html: "The highly classified porkchop."
      },

      {
        class: "relative w-24 h-24 mx-auto mt-16 text-6xl transform scale-150",
        html: [
          "🌟",
          {
            class: "absolute top-0 left-0 text-4xl w-full",
            style: "top: 15px",
            html: "🥩"
          }
        ]
      }
    ]
  }

}
register(RequireLoginDemo);