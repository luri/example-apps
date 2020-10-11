import { register } from "../../../../core/js/lib/luri.js";
import AppForm from "../../components/form.js";
import { AppInput, AppSubmit } from "../../components/input.js";

export default class ExampleLoginForm extends AppForm {

  constructx(props) {
    return {
      method: "GET", // github pages returns 404 on POST
      action: props.action,
      class: "shadow-md max-w-sm mx-auto mt-8 px-6 pt-2 pb-4 border border-gray-700 rounded bg-gray-800",
      html: [
        props.smiley ? {
          class: `inline-block m-2 text-purple-500 text-3xl transform rotate-90`,
          html: props.smiley
        } : null,
        new AppInput("username").attrx({ required: true }).labelx("👨 Username"),
        new AppInput("password", "password").labelx("🔑 Password"),
        new AppSubmit("Log in")
      ],
      onsuccessx: props.success
    }
  }
}
register(ExampleLoginForm);