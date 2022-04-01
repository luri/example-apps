
class Luri {

  /**
   * Global promise class
   */
  Promise = Promise;

  /**
   * Unique class for components
   */
  CLASS = "luri-" + Math.random().toString(36).substring(2, 6);
  /**
   * String to be used for registering custom elements
   */
  customElementsPrefix = "luri-";


  /**
   * Input property parsers
   */
  parsers = {
    // very prop that doesn't have its own
    // parser gets parsed here
    ["*"]: function (element, props, prop, namespace) {

      (this.starparsers.get((props[prop] || "").constructor) || this.starparsers.get("*"))(
        element, props, prop, namespace
      )

    },
    // allows for supplying the dataset as an object
    data: (element, props) => {
      Object.keys(props.data).forEach(key => {
        element.setAttribute([`data-${key}`], props.data[key]);
      });
    },
    // allows for specifying inline styles as an object
    style: (element, props) => {
      if (props.style instanceof Object) {
        props.style = Object.entries(props.style).map(chunk => chunk.join(":")).join(";");
      }
      element.setAttribute("style", props.style);
    },
    // construct children
    html: (element, props, prop, namespace) => {
      if (Array.isArray(props.html)) {
        for (var i = 0, l = props.html.length; i < l; i++) {
          element.appendChild(this.construct(props.html[i], namespace));
        }
      } else {
        element.appendChild(this.construct(props.html, namespace));
      }
    },
    // construct children from HTML string
    // not recommended, but is mandatory to have
    htmlx: (element, props, prop, namespace) => {
      element.insertAdjacentHTML("beforeend", props.htmlx);
    },
    // Disallow modifications to the class property as basic functionalities
    // are based on it, also is frequently used so it's a micro optimization as well
    class: (element, props) => {
      element.setAttribute("class", props.class);
    },
    // dont add xmlns prop as attribute, required for rendering SVG and possibly more
    xmlns: () => { }
  };

  /**
   * Allows for different parsers in the * parser
   * based on prop value's constructor
   */
  starparsers = new Map([
    [Function, this.functionpropparser],
    [Object.getPrototypeOf(async function () { }).constructor, this.functionpropparser], // AsyncFunction
    [String, this.defaultpropparser],
    ["*", this.defaultpropparser]
  ]);

  functionpropparser(element, props, prop, namespace) {
    if (prop.indexOf("on") === 0) {
      element[prop] = props[prop];
    } else {
      props[prop](element, props, prop, namespace);
    }
  }

  defaultpropparser(element, props, prop) {
    if (props[prop] !== undefined)
      element.setAttribute(prop, props[prop]);
  }

  construct(input, namespace = null) {
    var props;

    switch (typeof input) {
      // most often it will be object so
      // micro optimization
      case "object":
        break;
      case "undefined":
        input = "";
      case "string":
      case "number":
        return document.createTextNode(input.toString());

      case "function":
        input = input();
        break;
    }

    switch (true) {
      case input instanceof Element:
        return input;
      case input instanceof this.Promise:
        props = this.promise({}, input);
        break;
      default:
        props = Object.assign({}, this.normalizeDefinition(input));
    }

    namespace = props.xmlns || namespace;

    let node = props.node || "div";
    let element = namespace ? document.createElementNS(namespace, node) : document.createElement(node);

    delete props.node;

    return this.apply(element, props, namespace);
  }

  apply(element, props, namespace) {

    for (var prop in props) {
      (this.parsers[prop] || this.parsers["*"]).call(this, element, props, prop, namespace);
    }

    return element;
  }

  normalizeDefinition(def) {
    return typeof def === "object" && !Array.isArray(def) ? def : {
      html: def
    };
  }

  emit(event, ...data) {
    return this.emitTo(document.getElementsByClassName(this.CLASS), event, ...data);
  }

  emitToClass(className, event, ...data) {
    return this.emitTo(document.getElementsByClassName(className), event, ...data);
  }

  emitTo(collection, event, ...data) {
    if (typeof event === "string") {
      event = this.event(event, ...data);
    }

    var l = collection.length;
    while (l--) {
      // let component = collection[l];
      // component.getListenersx(event).forEach(listener => listener.call(component, ...data));

      collection[l].dispatchEvent(event);
    }

    return event.detail;
  }

  /**
   * Constructs a CustomEvent
   * @param {string} event 
   * @param  {...any} data 
   */
  event(event, ...data) {
    data.origin = this;

    return new CustomEvent("x" + event.toLowerCase(), {
      detail: data
    });
  }

  promise(def, promise) {
    return def.promise = (e) => promise.then(def => {
      if (Array.isArray(def)) {
        def.forEach(def => this.append(def, e.parentNode));
        e.remove();
      } else {
        this.replace(e, def)
      }
    }), def;
  }

  append(def, element) {
    if (Array.isArray(def)) {
      return def.forEach(def => element.appendChild(this.construct(def)));
    }
    return element.appendChild(this.construct(def));
  }

  replace(element, def) {
    let replacement = this.construct(def);
    element.replaceWith(replacement);
    return replacement;
  }

  insert(def, element, before = null) {
    return element.insertBefore(this.construct(def), before || element.firstChild || null);
  }

  helpers(host = this) {
    var shorthand = function (props = "") {
      props = luri.normalizeDefinition(props);
      if (props.node) {
        props = {
          html: props
        };
      }
      props.node = this;

      return Object.assign(new StringableDefinition, props);
    };

    [
      "A", "ABBR", "ADDRESS", "AREA", "ARTICLE", "ASIDE", "AUDIO", "B", "BASE", "BDI", "BDO", "BLOCKQUOTE", "BODY", "BR", "BUTTON", "CANVAS", "CAPTION", "CITE", "CODE", "COL", "COLGROUP", "DATA", "DATALIST", "DD", "DEL", "DETAILS", "DFN", "DIALOG", "DIV", "DL", "DT", "EM", "EMBED", "FIELDSET", "FIGCAPTION", "FIGURE", "FOOTER", "FORM", "H1", "H2", "H3", "H4", "H5", "H6", "HEAD", "HEADER", "HGROUP", "HR", "HTML", "I", "IFRAME", "IMG", "INPUT", "INS", "KBD", "KEYGEN", "LABEL", "LEGEND", "LI", "LINK", "MAIN", "MAP", "MARK", "MATH", "MENU", "MENUITEM", "META", "METER", "NAV", "NOSCRIPT", "OBJECT", "OL", "OPTGROUP", "OPTION", "OUTPUT", "P", "PARAM", "PICTURE", "PRE", "PROGRESS", "Q", "RB", "RP", "RT", "RTC", "RUBY", "S", "SAMP", "SCRIPT", "SECTION", "SELECT", "SLOT", "SMALL", "SOURCE", "SPAN", "STRONG", "STYLE", "SUB", "SUMMARY", "SUP", "SVG", "TABLE", "TBODY", "TD", "TEMPLATE", "TEXTAREA", "TFOOT", "TH", "THEAD", "TIME", "TITLE", "TR", "TRACK", "U", "UL", "VAR", "VIDEO", "WBR"
    ].forEach(tag => host[tag] = shorthand.bind(tag.toLowerCase()));
  }
}

class StringableDefinition extends Object {
  toString() {
    return luri.construct(this).outerHTML;
  }
}

/**
 * Register a class as a custom element. You only need to register
 * classes that are going to be directly mounted to the DOM.
 * JS does not yet support decorators so you need to call this 
 * after the class declaration, sadly
 * @param {typeof HTMLElement} constructor
 */
export function register(constructor) {
  let parent = constructor.parentx();

  customElements.define(luri.customElementsPrefix + constructor.namex().toLowerCase(), constructor, parent ? {
    extends: parent
  } : undefined);

  return registerListeners(constructor);
}

export function registerListeners(constructor) {
  // Add names of DOM event handlers to constructor Set
  // This loop is after customElements.define to make sure it will run only once per constructor
  let cloned = false;
  for (let prop of Object.getOwnPropertyNames(constructor.prototype)) {
    if (prop.indexOf("on") === 0) {
      if (!cloned) {
        cloned = true;
        constructor.handlersx = new Set(constructor.handlersx); // clone Set so names don't propagate to super class
      }
      constructor.handlersx.add(prop);
    }
  }
  return constructor;
}

// Make sure component classes are generated only once per HTMLElement type
let cClassCache = new Map();

function MixinComponent(base) {
  /**
   * @extends HTMLElement
   */
  class Component extends base {

    /**
     * Must return custom element nodeName
     * first argument to customElements.define
     */
    static namex() {
      return this.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    }

    /**
     * Must return custom element's parent nodeName
     */
    static parentx() {
      return null;
    }

    /**
     * Names of DOM event handlers to be added to each instance.
     * Populated automatically in the register() function.
     */
    static handlersx = new Set;

    // eventsx = {};

    constructor(props) {
      super();

      this.initx(props);

      if ((props = this.constructx(props))) {
        luri.apply(this, props, this.namespaceURI);
      }

      // kept for backwads compatibility
      // will be removed at some point
      let listeners = this.listenersx();
      for (let event in listeners) {
        // this.addListenerx(event, listeners[event]);
        this.addEventListener("x" + event, listeners[event]);
      }

      if (!this.ninjax()) {
        this.classList.add(luri.CLASS);
      }

      // Add DOM listeners because prototype functions 
      // as handlers do not work out of the box
      this.constructor.handlersx.forEach(prop => {
        this.addEventListener(prop.substring(2).toLowerCase(), this.constructor.prototype[prop]);
      });
    }

    /**
     * This gets called before constructx
     * @param {*} props 
     */
    initx(props) {

    }

    /**
     * if value is present then sets attribute x equal to value
     * if not and x is string then returns attribute x
     * if x is object assigns values to attributes from keys 
     * @param {string|Object} x 
     * @param {string} value
     */
    attrx(x, value) {
      if (value) {
        this.setAttribute(x, value);
        return this;
      } else if (typeof x === "string") {
        return this.getAttribute(x);
      } else if (x) {
        for (let a in x) {
          this.setAttribute(a, x[a]);
        }
        return this;
      }
    }

    /**
     * If true the component will not receive luri events
     */
    ninjax() {
      return false;
    }

    constructx(props) {
      return props;
    }

    /**
     * Utility method for defining listeners
     * @deprecated Use onX* functions. listenerx() will be removed at some point.
     */
    listenersx() {
      return {}
    }

    /**
     * 
     * @param {string} event 
     * @param  {...any} data 
     * @returns 
     */
    emit(event, ...data) {
      return luri.emit(luri.event.call(this, event, ...data));
    }
  }

  return Component;
}

/**
 * @mixin
 * @returns {ReturnType<MixinComponent>}
 */
export function Component(base = HTMLElement) {
  if (!cClassCache.has(base)) {
    cClassCache.set(base, MixinComponent(base));
  }

  return cClassCache.get(base);
}

let luri = new Luri;

export default luri;
