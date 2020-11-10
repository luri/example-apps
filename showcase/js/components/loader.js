import loader from "../../../core/js/components/loader.js";

export default function apploader(size, classes = "") {
  return loader(size, `${classes} text-purple-500`);
}