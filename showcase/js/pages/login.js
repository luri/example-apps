import auth from "../../../core/js/lib/auth.js";
import { register } from "../../../core/js/lib/luri.js";
import { delay } from "../../../core/js/lib/util.js";
import AppForm from "../components/form.js";
import { AppInput } from "../components/input.js";
import Page from "../components/page.js";
import { ButtonPrimary } from "../styles/common.js";

class LoginForm extends AppForm {
  onsuccessx(data) {
    auth.login({
      name: "Steve"
    });
  }

  onbeforesendx(formdata) {
    // Mock proper server response with separate json files
    if (formdata.get("username").toLowerCase() !== "steve") {
      this.action = "api/login/not-steve.json";
    } else if (formdata.get("password") !== "chickennuggets") {
      this.action = "api/login/wrong-pass.json";
    } else {
      this.action = "api/login/ok.json";
    }

    // also add fake loading time to showcase form loader
    ((o) => {
      this.fetchx = (...x) => delay(1500).then(() => o(...x));
    })(this.fetchx)

    return formdata;
  }

  constructx(props) {
    return {
      method: "GET", // github pages returns 404 on POST
      action: "api/login/ok.json",
      class: "shadow-md max-w-sm mx-auto mt-8 px-6 pt-2 pb-4 border border-gray-700 rounded bg-gray-800",
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

