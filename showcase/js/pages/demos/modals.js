import { shrink } from "../../../../core/js/lib/classlist.js";
import { register } from "../../../../core/js/lib/luri.js";
import AppButton from "../../components/button.js";
import { AppRadio } from "../../components/input.js";
import Modal from "../../components/modal.js";
import { ButtonSecondary } from "../../styles/common.js";
import Example from "./example.js";


export default class ModalsExample extends Example {

  contentx() {
    return [
      {
        class: "text-xl mb-6",
        html: "Preview a bunch of modals."
      },

      {
        class: "flex flex-col",
        html: [
          [
            "The simplest modal ever",
            () => {
              Modal.openx("Doesn't get much simpler than that.")
            }
          ],
          [
            "A confirmation modal",
            () => {
              Modal.confirmx("To confirm, or not to confirm?", {
                cancelText: "Do not confirm",
                confirmText: "Do confirm",
                rejectOnClose: false
              }).then(response => {
                Modal.openx(`You have ${response ? "" : "not"} confirmed`)
              });
            }
          ],
          [
            "An input prompt modal",
            () => {
              Modal.promptx("How ya doin?", {
                rejectOnClose: true
              }).then(response => {
                Modal.openx(`"${response}" - You.`);
              })
            }
          ],
          [
            "A prompt with custom controls",
            () => {
              Modal.promptx("Choose wisely!", {
                rejectOnClose: true,
                input: resolve => {
                  return {
                    html: ["Red", "Green", "Blue"].map(string => new AppRadio("prompt", string, false, {
                      oninput() {
                        resolve(string)
                      }
                    }))
                  }
                }
              }).then(response => {
                Modal.openx(`${response} it is then!`, {
                  background: `rgba(
                    ${response === "Red" ? 64 : 0}, 
                    ${response === "Green" ? 64 : 0}, 
                    ${response === "Blue" ? 64 : 0}, 
                    0.65
                  )`.split("\n").join("")
                });
              })
            }
          ],
          [
            "Loading modal",
            () => {
              Modal.loadx(new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    html: "Stuff has loaded.. Probably."
                  })
                }, 1500)
              }))
            }
          ]
        ].map(([text, func]) => BUTTON({
          class: ButtonSecondary,
          html: text,
          onclick: func
        }))
      }

    ]
  }

}
register(ModalsExample);
