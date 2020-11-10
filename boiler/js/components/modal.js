import Animatable from "../../../core/js/components/animatable.js";
import { shrink } from "../../../core/js/lib/classlist.js";
import { Component, register } from "../../../core/js/lib/luri.js";
import { smoothie } from "../../../core/js/lib/util.js";
import { ButtonPrimary, ButtonSecondary } from "../styles/common.js";
import { AppInput } from "./input.js";
import apploader from "./loader.js";



export default class Modal extends Component(Animatable(HTMLElement)) {

  /**
   * The element to which to append modals
   */
  static containerx = document.body;

  /**
   * A css background rule to apply to the curtain
   */
  static backgroundx = "rgba(0, 0, 0, 0.65)";


  /**
   * @typedef {{
   *  defaultBody?: boolean,
   *  unclosable?: boolean
   * }} ModalOptions
   * @typedef {(ModalOptions & {
   *  input?: (resolve) => any,
   *  rejectOnClose?: boolean,
   *  type?: string,
   *  value?: string,
   *  attrs?: Object
   * })} ModalPromptOptions
   * @typedef {(ModalPromptOptions & {
   *  cancelText?: any,
   *  confirmText?: any
   * })} ModalConfirmOptions
   */
  /**
   * Open a new modal
   * @param {*} body
   * @param {ModalOptions} options
   * @returns {Promise<Modal>}
   */
  static openx(body, options) {
    return smoothie(new this(body, options), null, this.containerx).then(element => {

      element.tabIndex = 0;
      element.focus();

      return element;
    });
  }

  /**
   * Open a prompt modal
   * @param {*} body 
   * @param {ModalPromptOptions} options 
   */
  static promptx(body, options = {}) {
    let modal = null;

    return new Promise(async (resolve, reject) => {
      modal = await this.openx({
        class: "text-center",
        html: [
          body,
          options.input ? options.input(resolve, reject) : {
            node: "form",
            html: new AppInput(null, options.type || "text", options.value || "", options.attrs || {}),
            onsubmit: event => {
              event.preventDefault();
              resolve(event.target.elements[0].value);
            }
          }
        ]
      }, options);

      modal.addEventListener("luri-modal-closed", () => options.rejectOnClose ? reject() : resolve());
      // reuse options.input which has already been called
      if (options.input = modal.querySelector("input")) {
        options.input.focus();
      };
    }).finally(() => modal.closex());
  }

  /**
   * Open a confirmation modal
   * @param {*} body 
   * @param {ModalConfirmOptions} options 
   */
  static confirmx(body, options = {}) {
    return this.promptx(body, Object.assign({
      rejectOnClose: true,
      input: (resolve, reject) => {
        return {
          class: "flex justify-center mt-2",
          html: [
            [options.cancelText || "Cancel", ButtonSecondary, reject],
            [options.confirmText || "Confirm", ButtonPrimary, resolve]
          ].map(([def, classname, func]) => {
            return {
              node: "button",
              class: classname,
              html: def,
              onclick: func
            }
          })
        }
      }
    }, options))
  }

  /**
   * Open a new modal
   * @param {*} body
   * @param {ModalOptions} options
   * @returns {Promise<Modal>}
   */
  static async loadx(promise, options) {
    let placeholder = null;
    let modal = await this.openx(
      {
        class: "px-16 py-12",
        html: apploader(),
        ref: e => placeholder = e
      }, Object.assign({
        unclosable: true
      }, options)
    );

    return promise.then(result => {
      return smoothie(result, placeholder);
    }).then(() => {
      modal.classList.remove("t-800");

      return modal;
    });
  }

  constructor(body, options) {
    super(Object.assign({
      body: body,
      defaultBody: true
    }, options || {}));
  }

  closex() {
    if (!this.classList.contains("t-800") && this.parentNode === this.constructor.containerx) {
      this.dispatchEvent(new Event("luri-modal-closing"));

      return smoothie(null, this).then(() => {
        this.dispatchEvent(new Event("luri-modal-closed"));
      });
    }
  }

  onKeyup(e) {
    if (e.which === 27) this.closex();
  }

  onClick(e) {
    if (e.target === this) this.closex();
  }

  ninjax() {
    return true;
  }

  constructx(props) {
    return {
      class: shrink(`
        fixed top-0 left-0 w-full h-full
        flex justify-center items-center
        ${props.unclosable ? "t-800" : ""}
      `),
      style: {
        "background": this.constructor.backgroundx
      },
      html: props.defaultBody ? {
        class: "rounded bg-gray-800 border border-gray-700 px-6 py-4",
        html: props.body
      } : props.body
    }
  }

}
register(Modal);
