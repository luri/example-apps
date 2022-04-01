import { AppInput } from "../../../boiler/js/components/input.js";
import Modal from "../../../boiler/js/components/modal.js";
import { Component, register } from "../../../core/js/lib/luri.js";
import Model from "../../../core/js/lib/model.js";


export default class Resource extends Component() {

    initx(props) {
        super.initx(props);

        this.modelx = new Model({
            amount: 0,
            production: 0
        });
    }

    onXreset() {
        this.resetx();
    }

    onXgeneration() {
        this.generationx();
    }

    resetx() {
        this.modelx.amount = 0;
        this.modelx.production = 0;
    }

    generationx() {
        this.modelx.amount += this.modelx.production;
    }

    constructx(props) {
        return {
            class: "flex flex-col flex-1 h-full justify-center items-center border-2 border-gray-800 " + props.bg,
            html: [
                {
                    class: "flex flex-1 items-center justify-center w-full",
                    html: [

                        {
                            node: "i",
                            class: `${props.icon} fa-3x`
                        },
                    ],
                    onmouseup: () => this.modelx.amount--
                },

                {
                    class: "text-4xl font-bold border-t-2 border-gray-800 w-full text-center bg-gray-600",
                    html: this.modelx.amount,
                    onmouseup: () => this.modelx.amount++,
                    oncontextmenu: async (event) => {
                        event.preventDefault();

                        this.modelx.amount += 1 * await Modal.promptx(null, {
                            rejectOnClose: true,
                            type: "number"
                        });
                    }
                },
                {
                    class: "text-4xl font-bold bg-yellow-900 w-full text-center",
                    html: this.modelx.production,
                    onmouseup: () => this.modelx.production++,
                    oncontextmenu: async (event) => {
                        event.preventDefault();

                        this.modelx.production += 1 * await Modal.promptx(null, {
                            rejectOnClose: true,
                            type: "number"
                        });
                    }
                },
            ]
        }
    }
}
register(Resource);