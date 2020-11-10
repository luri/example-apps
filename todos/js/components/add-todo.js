import AppForm from "../../../boiler/js/components/form.js";
import { AppInput, AppSubmit } from "../../../boiler/js/components/input.js";
import { ButtonPrimary } from "../../../boiler/js/styles/common.js";
import luri, { register } from "../../../core/js/lib/luri.js";

export default class AddTodo extends AppForm {

  constructx() {
    return {
      class: "flex px-2",
      html: [
        {
          class: "flex-1",
          html: new AppInput("title").labelx("Add Todo")
        },
        new AppSubmit("Save", null, {
          class: ButtonPrimary
        })
      ]
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let title = this.elements.title.value.trim();

    if (title) {
      luri.emit("add-todo", { title });
    }

    this.reset();
  }

}
register(AddTodo);
