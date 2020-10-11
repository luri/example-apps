import { Checkbox, Input, Radio, Select, Textarea } from "../../../core/js/components/input.js";
import { register } from "../../../core/js/lib/luri.js";
import { ButtonPrimary, CheckboxControl, CheckboxInput, InputControl } from "../../js/styles/common.js";


export class AppInput extends Input {

  constructx(props) {
    this.className = InputControl;
    return super.constructx(props);
  }

}
register(AppInput);

export class AppSelect extends Select {

  constructx(props) {
    this.className = InputControl;
    return super.constructx(props);
  }

}
register(AppSelect);


export class AppTextarea extends Textarea {

  constructx(props) {
    this.className = InputControl;
    return super.constructx(props);
  }

}
register(AppTextarea);


export class AppCheckbox extends Checkbox {

  constructinputx(props) {
    return Object.assign({
      class: CheckboxInput
    }, super.constructinputx(props));
  }

  constructlabelx(props) {
    return Object.assign({
      class: CheckboxControl
    }, super.constructlabelx(props));
  }
}
register(AppCheckbox);


export class AppRadio extends Radio {

  constructlabelx(props) {
    return Object.assign({
      class: CheckboxControl
    }, super.constructlabelx(props));
  }

  constructinputx(props) {
    return Object.assign({
      class: `${CheckboxInput} rounded-full`
    }, super.constructinputx(props));
  }
}
register(AppRadio);

export class AppSubmit extends Input {

  constructor(value, name, props) {
    super(name, "submit", value, Object.assign({
      class: `${ButtonPrimary} block w-full`
    }, props));
  }
}
register(AppSubmit);