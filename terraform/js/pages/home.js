import Modal from "../../../boiler/js/components/modal.js";
import Page from "../../../boiler/js/components/page.js";
import { ButtonPrimary, ButtonSecondary } from "../../../boiler/js/styles/common.js";
import ClassList from "../../../core/js/lib/classlist.js";
import luri, { register } from "../../../core/js/lib/luri.js";
import GenerationIndicator from "../components/generation-indicator.js";
import Resource from "../components/resource.js";

export default class HomePage extends Page {

  titlex() {
    return "Terraforming mars scoreboard";
  }

  initx(props) {
    super.initx(props);

    this.creditsx = new Resource({
      icon: "fas fa-euro-sign text-yellow-400",
      bg: "bg-yellow-600"
    });
    this.ironx = new Resource({
      icon: "fas fa-tools text-yellow-900",
      bg: "bg-yellow-800"
    });
    this.titanx = new Resource({
      icon: "fas fa-star text-gray-900",
      bg: "bg-black"
    });
    this.leavesx = new Resource({
      icon: "fas fa-leaf text-green-500",
      bg: "bg-green-800"
    });
    this.energyx = new Resource({
      icon: "fas fa-bolt text-purple-500",
      bg: "bg-purple-800"
    });
    this.heatx = new Resource({
      icon: "fas fa-fire text-red-600",
      bg: "bg-red-800"
    });

    this.resetx();

    Modal.containerx = this;

    Modal.promptx("", {
      input: resolve => {
        return {
          node: "button",
          class: ButtonPrimary,
          html: "GO FULLSCREEN",
          onclick: () => this.requestFullscreen()
        }
      }
    })
  }

  contentx(models) {
    return [
      {
        class: "flex flex-col justify-around items-center w-full h-full",
        html: [
          {
            class: "flex flex-1 justify-around items-center w-full",
            html: [
              this.creditsx,
              this.ironx,
              this.titanx,
            ]
          },
          {
            class: "flex flex-1 justify-around items-center w-full",
            html: [
              this.leavesx,
              this.energyx,
              this.heatx,
            ]
          }
        ]
      },
      {
        class: "flex flex-col h-full relative",
        html: [
          new GenerationIndicator,
          {
            class: `flex justify-center items-center flex-1 ${new ClassList(ButtonSecondary).delete("my-2 py-3")}`,
            html: {
              node: "i",
              class: "fas fa-plus fa-5x"
            },
            onclick: () => Modal.confirmx().then(() => this.generationx())
          },
          {
            class: `flex justify-center items-center flex-1 ${new ClassList(ButtonSecondary).delete("my-2 py-3")}`,
            html: {
              node: "i",
              class: "fas fa-sync fa-5x"
            },
            onclick: () => Modal.confirmx().then(() => this.resetx())
          },
        ]
      }
    ]
  }

  resetx() {
    luri.emit("reset");

    this.creditsx.modelx.production = 20;
  }

  generationx() {
    this.heatx.modelx.amount += this.energyx.modelx.amount;
    this.energyx.modelx.amount = 0;

    luri.emit("generation");
  }

  resourcesx() {
    return [
      this.creditsx,
      this.ironx,
      this.titanx,
      this.leavesx,
      this.energyx,
      this.heatx
    ];
  }

  propsx() {
    return {
      class: "flex justify-around items-center w-full",
    }
  }
}

register(HomePage);