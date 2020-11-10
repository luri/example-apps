import { register } from "../../../../core/js/lib/luri.js";
import Model from "../../../../core/js/lib/model.js";
import { AppInput, AppRadio, AppSelect } from "../../components/input.js";
import Example from "./example.js";

class User extends Model {
  // allow parsing html strings in model props
  // this will sacrifice performance
  // regardless of whether you use it or not
  static htmlx = true;
}

export default class DataBindingDemo extends Example {

  propsx() {
    return {
      class: "max-w-2xl w-full text-center"
    }
  }

  async datax() {
    return new User({
      name: "Steve",
      age: 25,
      gender: "male"
    });
  }

  contentx(user) {
    // expose user so it can be modified from the console in the example
    window.user = user;

    let pronouns = {
      subjective: {
        male: "he",
        female: "she",
        whatever: "it"
      },
      possessive: {
        male: "his",
        female: "her",
        whatever: "its"
      }
    }
    let genders = {
      male: "Male",
      female: "Female",
      whatever: "2020+"
    }

    return [
      H3({
        class: "text-2xl",
        html: "You want two-way data binding? I got that too."
      }),
      P({
        class: "text-sm text-gray-700 mb-8",
        html: "Kind of.."
      }),

      P({
        class: "mb-2",
        html: "Here's a simple user object. The controls below allow you to modify it's properties. It is also exposed in the global scope as \"user\" so you can use the console to modify it as well."
      }),

      // Controls
      {
        class: "flex flex-col lg:flex-row",
        html: [
          new AppInput(null, "text", user.name, {
            maxlength: 20,
            oninput: function () { user.name = this.value }
          }),
          new AppInput(null, "number", user.age, {
            min: 1,
            max: 99,
            oninput: function () { user.age = this.value * 1 }
          }),
          new AppSelect(null, {
            options: genders,
            value: user.gender,
            oninput: function () { user.gender = this.value }
          })
        ]
      },

      // Display

      PRE({
        class: "text-left bg-gray-800 py-6 px-8",
        html: user.X.bind(model => `User ${JSON.stringify(model, null, 2)}`)
      }),

      {
        class: "flex pt-2 mt-2 text-left",
        html: [
          // Two ways of doing the same thing
          {
            style: "flex: 2",
            html: [
              {
                class: "px-2",
                html: [
                  // Method 1
                  // more performant, less readable
                  // - recommended
                  // important - if htmlx is enabled in model, as in this case
                  // the performance benefit greatly reduced.
                  // This example is just to illustrate how you 
                  // could gain the benefit if Model.htmlx was disabled.
                  "The user's name is ", STRONG(user.name), ", ",
                  user.gender.bind(v => pronouns.subjective[v]),
                  " is ", STRONG(user.age), " years old and ",
                  user.gender.bind(v => pronouns.possessive[v]),
                  " gender is highlighted below."
                ]
              },

              HR({ class: "my-2 border-gray-700" }),

              {
                class: "px-2",
                html: [
                  // Method 2 
                  // rerenders entire string when any property changes, 
                  // converts everything to a string then parses it.
                  // more readable, requires Model.htmlx to be enabled.
                  // - not recommended, use on your own discretion
                  user.X.bind(model =>
                    `The user's name is ${STRONG(model.name)}, ${pronouns.subjective[model.gender]} is ${STRONG(model.age)} years old and ${pronouns.possessive[model.gender]} gender is highlighted below.`
                  ),
                ]
              },
            ]
          },
          {
            class: "px-2 border-l border-gray-700 flex-1 text-gray-600",
            html: "The string is rendered twice, to demonstrate different methods of applying bindings with their pros and cons, described in the source."
          }
        ]
      },



      {
        class: "flex",
        html: ["male", "female", "whatever"].map(gender => {
          return new AppRadio("gender", gender, user.gender.bind(v => v === gender), {
            oninput: function () { user.gender = this.value }
          }).labelx(genders[gender]);
        })
      }

    ]
  }
}
register(DataBindingDemo);
