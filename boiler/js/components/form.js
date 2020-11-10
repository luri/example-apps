import Form from "../../../core/js/components/form.js";
import luri, { register } from "../../../core/js/lib/luri.js";
import apploader from "./loader.js";

export default class AppForm extends Form {

  loaderx() {
    this.classList.add("relative");

    let classes = "form-loader absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 opacity-75";

    return luri.append(apploader(32, classes), this);
  }

}
register(AppForm);