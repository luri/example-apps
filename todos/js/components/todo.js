import AppButton from "../../../boiler/js/components/button.js";
import { AppCheckbox } from "../../../boiler/js/components/input.js";
import Modal from "../../../boiler/js/components/modal.js";
import Animatable from "../../../core/js/components/animatable.js";
import { Component, register } from "../../../core/js/lib/luri.js";
import { delay, smoothie } from "../../../core/js/lib/util.js";


export default class Todo extends Component(Animatable(HTMLElement)) {

  animinx() {
    return "backInLeft";
  }

  animoutx() {
    return "zoomOut";
  }

  inx() {
    let height = this.clientHeight;
    this.style.height = 0;
    // force restyle
    window.getComputedStyle(this).height;
    this.style.height = `${height}px`;

    return super.inx().then(rv => {
      this.removeAttribute("style");
      return rv;
    });
  }

  outx() {
    return Promise.all([
      super.outx(),
      delay(150).then(() => {
        this.style.visibility = "hidden";
        this.style.height = `${this.clientHeight}px`;
        // force restyle
        window.getComputedStyle(this).height;
        this.style.height = 0;
      })
    ]).then(([element]) => element)
  }

  onContextMenu(event) {
    event.preventDefault();

    Modal.promptx(null, {
      value: this.model.title,
      rejectOnClose: true
    }).then(input => {
      this.model.title = input;
    });
  }

  constructx(model) {
    this.model = model;

    return {
      class: "todo flex bg-gray-800",
      html: [
        new AppCheckbox("completed", model.completed, null, {
          oninput() {
            model.completed = this.checked
          }
        }).labelx({
          html: model.title,
          stike: model.completed.bind((v, e) => e.classList[v ? "add" : "remove"]("line-through")),
        }),
        new AppButton({
          class: "flex items-center px-4",
          html: "❌",
          onclick: () => {
            this.model.id = null;
            smoothie(null, this);
          }
        })
      ]
    }
  }
}
register(Todo);
