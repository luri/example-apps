const SOURCES_DIR = "showcase/js";
const STYLES_DIR = "showcase/js/styles";
const STYLES_STATIC = "styles.static.json";

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [].concat(
      find(SOURCES_DIR, "js"),
      styles(STYLES_DIR, STYLES_STATIC)
    ),
    // These options are passed through directly to PurgeCSS
    options: {
      whitelistPatterns: [
        /^[wh]\-/
      ]
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'active', 'checked'],
  },
};

function styles(root, output) {
  let execSync = require("child_process").execSync;
  let log = module => console.log(JSON.stringify(module, null, 2));
  let extract = file => [
    file,
    JSON.parse(execSync(`node -e 'import("./${file}").then(${log});'`).toString())
  ];

  require("fs").writeFileSync(output, JSON.stringify(find(root, "js").map(extract), null, 2));

  return [
    output
  ];
}

function find(base, ext, files, result) {
  let fs = require("fs");
  let path = require("path");

  files = files || fs.readdirSync(base)
  result = result || []

  files.forEach(
    function (file) {
      var newbase = path.join(base, file)
      if (fs.statSync(newbase).isDirectory()) {
        result = find(newbase, ext, fs.readdirSync(newbase), result)
      }
      else {
        if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
          result.push(newbase)
        }
      }
    }
  )
  return result
}