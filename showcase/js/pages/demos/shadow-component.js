import ShadowComponent from "../../../../core/js/components/shadow.js";
import { register } from "../../../../core/js/lib/luri.js";
import Example from "./example.js";


export default class ShadowComponentExample extends Example {

  contentx() {
    return {
      class: "max-w-4xl text-center",
      html: [
        {
          class: "mb-6",
          html: [
            P("If you are paying attention to your network tab you probably noticed that shadow.css was dynamically loaded."),
            P("Inside of it there is only one rule targeting any paragraph, however it gets applied only to the last one below."),
            P("All thanks to the shadow DOM.")
          ]
        },

        new ExampleShadowP()
      ]
    };
  }

}
register(ShadowComponentExample);



class ExampleShadowP extends ShadowComponent {

  stylesx() {
    return ["css/shadow.css"];
  }

  shadowpropsx() {
    return P([
      "It's funky inside the shadow root",
      BR(),
      "😝"
    ]);
  }
}
register(ExampleShadowP);