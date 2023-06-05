import { shrink } from "../lib/classlist.js";

let colors = {
  primary: "purple",
  secondary: "gray",
};

export let DefaultAnchor = `text-${colors.primary}-500 hover:text-${colors.primary}-700 visited:text-${colors.primary}-900`;

export let Heading = 'font-bold pb-4 mt-6 text-3xl';
export let HeadingParagraph = `text-${colors.secondary}-600 pb-8 mb-8`;

export let InputBase = shrink(`
  block w-full
  px-6 py-4 my-2
`)

export let InputColors = shrink(`
  bg-${colors.secondary}-700
  border border-${colors.secondary}-600 
  focus:border-${colors.primary}-400
`)

export let InputControl = shrink(`
  ${InputBase}
  ${InputColors}
`)

export let CheckboxControl = shrink(`
  ${InputBase}
  flex items-center
  leading-none
  hover:text-${colors.secondary}-300
  cursor-pointer
`)

export let CheckboxInput = shrink(`
  p-2 mr-2 
  border border-${colors.secondary}-300 
  checked:bg-${colors.primary}-400 
  active:bg-${colors.secondary}-500
  appearance-none 
  transition-colors 
  duration-300
`)

export let TextPrimary100 = `text-${colors.primary}-100`;
export let TextPrimary200 = `text-${colors.primary}-200`;
export let TextPrimary300 = `text-${colors.primary}-300`;
export let TextPrimary400 = `text-${colors.primary}-400`;
export let TextPrimary500 = `text-${colors.primary}-500`;
export let TextPrimary600 = `text-${colors.primary}-600`;
export let TextPrimary700 = `text-${colors.primary}-700`;
export let TextPrimary800 = `text-${colors.primary}-800`;
export let TextPrimary900 = `text-${colors.primary}-900`;

export let TextSecondary100 = `text-${colors.secondary}-100`;
export let TextSecondary200 = `text-${colors.secondary}-200`;
export let TextSecondary300 = `text-${colors.secondary}-300`;
export let TextSecondary400 = `text-${colors.secondary}-400`;
export let TextSecondary500 = `text-${colors.secondary}-500`;
export let TextSecondary600 = `text-${colors.secondary}-600`;
export let TextSecondary700 = `text-${colors.secondary}-700`;
export let TextSecondary800 = `text-${colors.secondary}-800`;
export let TextSecondary900 = `text-${colors.secondary}-900`;

export let Button = "uppercase font-bold text-sm px-6 py-3 my-2"

export let ButtonPrimary = shrink(`
  ${Button}
  bg-${colors.primary}-600
  hover:bg-${colors.primary}-500
  active:bg-${colors.primary}-700
  text-gray-200
  hover:text-gray-100
`);

export let ButtonSecondary = shrink(`
  ${Button}
  bg-${colors.secondary}-800
  hover:bg-${colors.secondary}-700
  active:bg-${colors.secondary}-600
`);

export let ListItem = shrink(`
  block px-8 py-2
  bg-${colors.secondary}-700
  text-${colors.secondary}-500
  border
  border-${colors.secondary}-800
  hover:bg-${colors.secondary}-600
  hover:text-${colors.secondary}-300
  focus:bg-${colors.secondary}-200
  transition
  duration-300
`);
