import { Component, register } from "../../../core/js/lib/luri.js";


export default class GenerationIndicator extends Component() {
    
    onXgeneration() {
        this.firstChild.innerHTML = this.firstChild.innerHTML * 1 + 1;
    }

    onXreset() {
        this.firstChild.innerHTML = 1;
    }

    constructx() {
        return {
            class: "absolute w-full flex justify-center items-center",
            style: "top: 50%; transform: translateY(-50%)",
            html: [
                {
                    class: "rounded-full text-4xl text-white bg-blue-500 font-bold px-8 py-4",
                    html: 1
                }
            ]
        }
    }

}
register(GenerationIndicator);
