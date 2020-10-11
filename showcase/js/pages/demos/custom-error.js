import { register } from "../../../../core/js/lib/luri.js";
import DefaultErrorDemo from "./default-error.js";


export default class CustomErrorDemo extends DefaultErrorDemo {

  errorx(error) {
    return {
      class: "flex flex-col items-center text-center",
      html: [
        {
          class: "relative inline-block p-16 m-10 bg-gray-800 rounded-full text-6xl text-red-700 font-bold border-red-800 border-solid border-2 shadow-lg",
          html: [
            {
              class: "absolute left-0 top-0 w-full h-full flex justify-center items-center",
              html: "❤"
            },
            {
              style: "top: 50%; margin-top: -2px;",
              class: "absolute left-0 w-full border-2 border-red-800 transform -rotate-45"
            }
          ]
        },
        H1({
          class: "text-2xl font-weight-bold px-6 py-3",
          html: "Error"
        }),
        P({
          class: "text-gray-600",
          html: error.message
        }),
      ]
    }
  }

}
register(CustomErrorDemo)