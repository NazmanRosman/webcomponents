/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */

/**
 * `fluid-type`
 * @element fluid-type
 * `A simple fluid-type sizing wrapper element to apply to anything`
 * @demo demo/index.html
 */
class FluidType extends HTMLElement {
  // render function
  get html() {
    return `
<style>
:host {
  --fluid-type-min-size: 1;
  --fluid-type-max-size: 2;
  --fluid-type-min-screen: 20;
  --fluid-type-max-screen: 88;

  font-size: calc(
    (var(--fluid-type-min-size) * 1rem) + (var(--fluid-type-max-size) - var(--fluid-type-min-size)) * (100vw - (var(--fluid-type-min-screen) * 1rem)) /
      (var(--fluid-type-max-screen) - var(--fluid-type-min-screen))
  );
}
        </style>
<slot></slot>`;
  }

  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "fluid-type";
  }
  /**
   * life cycle
   */
  constructor(delayRender = false) {
    super();
    // set tag for later use
    this.tag = FluidType.tag;
    this.template = globalThis.document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (!delayRender) {
      this.render();
    }
  }
  /**
   * life cycle, element is afixed to the DOM
   */
  connectedCallback() {
    if (globalThis.ShadyCSS) {
      globalThis.ShadyCSS.styleElement(this);
    }
  }

  render() {
    this.shadowRoot.innerHTML = null;
    this.template.innerHTML = this.html;

    if (globalThis.ShadyCSS) {
      globalThis.ShadyCSS.prepareTemplate(this.template, this.tag);
    }
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}
globalThis.customElements.define(FluidType.tag, FluidType);
export { FluidType };
