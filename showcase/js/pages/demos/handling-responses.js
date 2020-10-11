import { register } from "../../../../core/js/lib/luri.js";
import { smoothie } from "../../../../core/js/lib/util.js";
import Example from "./example.js"
import ExampleLoginForm from "./login-form.js";

export default class FormsDemo extends Example {

  contentx() {
    return {
      class: "text-center",
      html: [
        P({
          class: "text-2xl",
          html: "Back-end validation out of the box!"
        }),
        P("For instance this is a grumpy form that will deny your login no matter how hard you try."),
        P({
          class: "text-sm text-gray-700",
          html: "I'm not on crack I promise."
        }),
        new ExampleLoginForm({
          action: "api/grumpy.json",
          smiley: ">:("
        }),

        P({
          class: "mt-8",
          html: "And here is a happy form that is considerably more tolerant."
        }),
        new ExampleLoginForm({
          action: "api/happy.json",
          smiley: ":)",
          success(resp) {
            this.classList.add("relative");

            resp.message[1] = {
              class: "text-green-500 font-bold ml-1",
              html: this.elements.username.value.trim()
            };

            smoothie({
              html: {
                class: "absolute top-0 left-0 w-full h-full bg-green-900 opacity-75 flex justify-center items-center",
                html: resp.message
              }
            }, null, this);
          }
        })
      ]
    }
  }
}

register(FormsDemo);