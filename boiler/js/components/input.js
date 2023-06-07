import * as core from "../../../core/js/components/input.js";
import { Component, register } from "../../../core/js/lib/luri.js";

export class Input extends core.Input {

  constructx(props) {
    props = Object.assign({
      class: "input-control"
    }, props);

    return super.constructx(props);
  }
}
register(Input);

export class Select extends core.Select {

  constructx(props) {
    props = Object.assign({
      class: "input-control"
    }, props);

    return super.constructx(props);
  }

}
register(Select);

export class Textarea extends core.Textarea {

  propsx() {
    return {
      class: "input-control"
    }
  }

}
register(Textarea);


export class AppCheckbox extends core.Checkbox {

  constructinputx(props) {
    return Object.assign({
      class: "checkbox-input"
    }, super.constructinputx(props));
  }

  constructlabelx(props) {
    return Object.assign({
      class: "checkbox-control"
    }, super.constructlabelx(props));
  }
}
register(AppCheckbox);


export class AppRadio extends core.Radio {

  constructinputx(props) {
    return Object.assign({
      class: `checkbox-input rounded-full`
    }, super.constructinputx(props));
  }

  constructlabelx(props) {
    return Object.assign({
      class: "checkbox-control"
    }, super.constructlabelx(props));
  }
}
register(AppRadio);

export class Submit extends Input {

  constructor(value, name, props) {
    super(name, "submit", value, props);
  }

  propsx() {
    return {
      class: `button-prim`
    }
  }
}
register(Submit);

export default class Button extends Component(HTMLButtonElement) {

  static parentx() {
    return "button"
  }

  propsx(props) {
    let className = props.primary ? "button-prim" : "button-sec";
    if (props.block) {
      className += " block w-full";
    }

    delete props.primary;
    delete props.block;

    return {
      type: "button",
      class: className
    };
  }
}
register(Button);