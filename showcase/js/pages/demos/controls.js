import { register } from "../../../../core/js/lib/luri.js";
import { AppCheckbox, AppInput, AppRadio, AppSelect, AppSubmit, AppTextarea } from "../../components/input.js";
import Example from "./example.js";


export default class Controls extends Example {

  contentx() {
    return [
      {
        class: "text-xl mb-6",
        html: "Here are a bunch of controls I made up real quick for the demo."
      },
      [
        "Input",
        new AppInput("sample-input")
      ], [
        "Select",
        new AppSelect("select-sample", {
          options: {
            option1: "OPT1",
            option2: "OPT2"
          },
          selected: "option2"
        })
      ], [
        "Textarea",
        new AppTextarea("textarea-sample")
      ], [
        "Checkbox",
        new AppCheckbox("checkbox-sample-1"),
        new AppCheckbox("checkbox-sample-2", true)
      ], [
        "Radio",
        new AppRadio("radio-sample", "opt1"),
        new AppRadio("radio-sample", "opt2", true)
      ], [
        "Submit",
        new AppSubmit("submit")
      ]
    ].map(def => ({ html: def }))
  }
}
register(Controls);
