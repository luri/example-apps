import { register } from "../../../../core/js/lib/luri.js";
import { DefaultAnchor } from "../../styles/common.js";
import Example from "./example.js";

export default class AppsExample extends Example {

  contentx() {
    return {
      class: "max-w-4xl text-center",
      html: [
        {
          class: "mb-6",
          html: [
            P({
              class: "text-lg",
              html: "Here are a few of simple apps I made for reference and reverse-engineering."
            }),

            {
              class: "flex flex-col mt-6",
              html: [
                ["Todos", "The mandatory, for any SPA, TODO app", "../todos"],
                ["Ledger", "A modern version of the legacy ledger app", "../ledger"]
              ].map(([title, desc, href]) => {
                return {
                  node: "a",
                  class: `${DefaultAnchor} mt-4 text-left mx-32 border-l-8 py-2 px-4 border-gray-800 hover:border-purple-900 transition-colors duration-300`,
                  html: [
                    {
                      class: "text-2xl font-bold",
                      html: title
                    },
                    {
                      class: "text-gray-600 ",
                      html: desc
                    }
                  ],
                  href: href
                };
              })
            }
          ]
        },
      ]
    };
  }

}
register(AppsExample);