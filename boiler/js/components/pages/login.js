import auth from "../../../../core/js/lib/auth.js";
import { register } from "../../../../core/js/lib/luri.js";
import AppForm from "../form.js";
import { AppInput } from "../input.js";
import Page from "../page.js";
import { ButtonPrimary } from "../../styles/common.js";

class LoginForm extends AppForm {
  onsuccessx(data) {
    auth.login({
      name: "Steve"
    });
  }

  constructx(props) {
    return {
      method: "POST",
      action: put - action - here,
      html: [
        {
          class: "text-center my-2",
          html: SPAN({
            class: `inline-block font-bold text-gray-500 text-6xl`,
            html: "🔒"
          })
        },
        new AppInput("username").attrx({ required: true }).labelx("👨 Username"),
        new AppInput("password", "password").labelx("🔑 Password"),
        BUTTON({
          class: `${ButtonPrimary} w-full`,
          type: "submit",
          html: "Log in",
        })
      ]
    }
  }
}
register(LoginForm);

export default class LoginPage extends Page {
  constructx(props) {
    return {
      class: "text-center",
      html: [
        props || "Who are you?",
        new LoginForm
      ]
    }
  }
}
register(LoginPage);

