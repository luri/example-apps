import { Component, register } from "../../../core/js/lib/luri.js";


export default class AppButton extends Component(HTMLButtonElement) {

  static parentx() {
    return "button"
  }
}
register(AppButton);