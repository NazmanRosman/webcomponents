/**
 * Copyright 2021 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
/**
 * CSS reset and additional base styles for lrnwebcomponents and apps
 */
const LrnCssResetStyles = [
  css`
    @import url("https://unpkg.com/modern-css-reset/dist/reset.min.css");
    @import url("https://fonts.googleapis.com/css?family=Lato:400,700,900|Source+Code+Pro:400,700|Lora:400,400i,700,700i|Playfair+Display:700i,900");

    .off-screen {
      position: absolute;
      left: -9999999px;
      width: 0px;
      height: 0px;
      overflow: hidden;
    }

    html,
    body {
      margin: 0;
      width: 100%;
      font-size: var(--haxcms-base-styles-body-font-size, 18px);
      font-family: var(--haxcms-base-styles-body-font-family, "Lora");
      line-height: var(--haxcms-base-styles-body-line-height, 1.58);
      letter-spacing: var(--haxcms-base-styles-body-letter-spacing, -0.03px);
    }

    h1,
    h2,
    p,
    i,
    a,
    .first-letter,
    .authorName a {
      color: rgba(0, 0, 0, 0.84);
      text-rendering: optimizeLegibility;
    }

    h1 {
      font-family: var(
        --hax-base-styles-h1-font-family,
        var(--hax-base-styles-accent-font-family, "Playfair Display", serif)
      );
      font-size: var(
        --hax-base-styles-h1-font-size,
        calc(2.66666667 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      line-height: var(--hax-base-styles-h1-line-height, unset);
      text-align: left;
      margin-bottom: 8px;
      letter-spacing: unset;
    }

    h2 {
      font-family: var(
        --hax-base-styles-h2-font-family,
        var(--hax-base-styles-heading-font-family, "Lato", sans-serif)
      );
      font-size: var(
        --hax-base-styles-h2-font-size,
        calc(1.66666667 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      line-height: var(--hax-base-styles-h2-line-height, 34.5px);
      font-weight: 900;
      padding: 0;
      margin: 56px 0 -13px -1.883px;
      text-align: left;
      letter-spacing: -0.45px;
    }

    h3 {
      font-family: var(
        --hax-base-styles-h3-font-family,
        var(--hax-base-styles-heading-font-family, "Lato", sans-serif)
      );
      font-size: var(
        --hax-base-styles-h3-font-size,
        calc(1.44444444 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      line-height: var(--hax-base-styles-h3-line-height);
      font-weight: 700;
      margin: 56px 0 -13px -1.883px;
      color: #555;
    }

    h4 {
      font-family: var(
        --hax-base-styles-h4-font-family,
        var(--hax-base-styles-heading-font-family, "Lato", sans-serif)
      );
      font-size: var(
        --hax-base-styles-h4-font-size,
        calc(1.22222222 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      line-height: var(--hax-base-styles-h4-line-height);
      font-weight: 700;
      margin: 46px 0 -13px -1.883px;
      color: #777;
    }

    h5 {
      font-family: var(
        --hax-base-styles-h5-font-family,
        var(--hax-base-styles-heading-font-family, "Lato", sans-serif)
      );
      font-size: var(
        --hax-base-styles-h5-font-size,
        calc(1.11111111 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      line-height: var(--hax-base-styles-h5-line-height);
      font-weight: 700;
      margin: 36px 0 -13px -1.883px;
      color: #333;
    }

    h6 {
      font-family: var(
        --hax-base-styles-h5-font-family,
        var(--hax-base-styles-heading-font-family, "Lato", sans-serif)
      );
      font-size: var(
        --hax-base-styles-h5-font-size,
        var(--haxcms-base-styles-body-font-size, 18px)
      );
      line-height: var(--hax-base-styles-h5-line-height);
      font-weight: 700;
      margin: 26px 0 -13px -1.883px;
      color: #777;
    }

    p {
      min-height: var(--hax-base-styles-p-min-height);
      font-size: var(
        --hax-base-styles-p-font-size,
        var(--haxcms-base-styles-body-font-size, 18px)
      );
      font-family: var(--haxcms-base-styles-body-font-family, "Lora");
      line-height: var(
        --hax-base-styles-p-line-height,
        var(--haxcms-base-styles-body-line-height, 1.58)
      );
      letter-spacing: var(
        --hax-base-styles-p-letter-spacing,
        var(--haxcms-base-styles-body-letter-spacing, -0.03px)
      );
    }

    p,
    i,
    a {
      margin-top: 21px;
    }

    a {
      text-decoration: underline;
      font-size: var(
        --hax-base-styles-a-font-size,
        var(--hax-base-styles-p-font-size)
      );
    }

    blockquote {
      font-family: var(
        --hax-base-styles-accent-font-family,
        "Playfair Display",
        serif
      );
      font-size: var(
        --hax-base-styles-blockquote-font-size,
        calc(1.66666667 * var(--haxcms-base-styles-body-font-size, 18px))
      );
      font-style: italic;
      letter-spacing: -0.36px;
      line-height: 44.4px;
      overflow-wrap: break-word;
      margin: 55px 0 33px 0;
      color: rgba(0, 0, 0, 0.68);
      padding: 0 0 0 50px;
    }

    figcaption {
      font-family: var(
        --hax-base-styles-heading-font-family,
        "Lato",
        sans-serif
      );
      font-size: var(
        --hax-base-styles-small-font-size,
        calc(0.88888889 * var(--hax-base-styles-p-font-size))
      );
      font-weight: 400;
      color: #666;
    }

    ol ol {
      list-style-type: lower-alpha;
      font-size: 16px;
      color: #444;
      line-height: var(
        --hax-base-styles-list-line-height,
        var(--hax-base-styles-p-line-height)
      );
      font-size: var(
        --hax-base-styles-smal-font-size,
        calc(0.88888889 * var(--hax-base-styles-p-font-size))
      );
    }

    ol ol ol {
      list-style-type: lower-roman;
      font-size: var(
        --hax-base-styles-smaller-font-size,
        calc(0.77777778 * var(--hax-base-styles-p-font-size))
      );
    }

    code {
      font-size: 18px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      padding: 3px 5px;
      font-family: var(
        --hax-base-styles-code-font-family,
        "Source Code Pro",
        monospace
      );
    }

    pre {
      font-family: var(
        --hax-base-styles-code-font-family,
        "Source Code Pro",
        monospace
      );
    }

    kbd {
      font-family: var(
        --hax-base-styles-code-font-family,
        "Source Code Pro",
        monospace
      );
      font-weight: 700;
    }

    samp {
      font-family: var(
        --hax-base-styles-code-font-family,
        "Source Code Pro",
        monospace
      );
    }
  `,
];
const AttachStylesToHead = (
  styles = LrnCssResetStyles,
  id = "LrnCssResetStyles"
) => {
  if (!window.LrnCssResetStyles) {
    window[id] = document.createElement("div");
    let s = document.createElement("style"),
      css = LrnCssResetStyles.map((st) => st.cssText).join("");
    s.setAttribute("id", id);
    s.setAttribute("type", "text/css");
    if (s.styleSheet) {
      // IE
      s.styleSheet.cssText = css;
    } else {
      // the world
      s.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName("head")[0].appendChild(s);
  }
};
/**
 * `lrn-css-reset`
 * `an element that applies CSS reset and additional base styles
 * @microcopy - language worth noting:
 *  -
 *
 * @class LrnCssReset
 * @extends {LitElement}
 * @demo demo/index.html
 * @element lrn-css-reset
 */
class LrnCssReset extends LitElement {
  /**
   * Store the tag name to make it easier to obtain directly.
   * @notice function name must be here for tooling to operate correctly
   */
  static get tag() {
    return "lrn-css-reset";
  }
  static get styles() {
    return LrnCssResetStyles;
  }
  static get properties() {
    return {
      applyToHead: {
        type: Boolean,
        attribute: "apply-to-head",
      },
    };
  }
  /**
   * HTMLElement
   */
  constructor() {
    super();
  }
  firstUpdated(changedProperties) {
    if (super.firstUpdated) super.firstUpdated(changedProperties);
    if (this.applyToHead)
      AttachStylesToHead(LrnCssResetStyles, "LrnCssResetStyles");
  }
  render() {
    return html`<slot></slot>`;
  }
}
customElements.define(LrnCssReset.tag, LrnCssReset);
export { LrnCssResetStyles, AttachStylesToHead, LrnCssReset };
