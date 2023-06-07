import colors from "./colors.js";

export default {
  content: [
    "../../**/*.(js|html)"
  ],
  theme: {
    extend: {
      colors: {
        prim: colors.purple,
        sec: colors.slate,
        win: colors.green,
        fail: colors.red,
        warn: colors.orange
      }
    },
  },
  plugins: [

  ],
  safelist: [
    { pattern: /^[wh]-.+/ },
  ]
}