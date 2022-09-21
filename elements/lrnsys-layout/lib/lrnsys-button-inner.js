import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
import "@lrnwebcomponents/paper-avatar/paper-avatar.js";
/**
 * `lrnsys-button-inner`
 * @element lrnsys-button-inner
 */
class LrnsysButtonInner extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        :host > div > * {
          vertical-align: middle;
        }
        .text-label {
          margin-left: 8px;
        }
        .text-label-only {
          margin-left: 0;
        }
      `,
    ];
  }
  constructor() {
    super();
    this.text = "";
    this.avatar = "";
    this.icon = "";
  }
  /**
   * LitElement render
   */
  render() {
    return html`
      <div>
        ${this.avatar != ""
          ? html`
              <paper-avatar
                part="lrnsys-button-inner-paper-avatar"
                src="${this.avatar}"
              ></paper-avatar>
            `
          : ""}
        ${this.icon != ""
          ? html`
              <simple-icon
                part="lrnsys-button-inner-simple-icon"
                icon="${this.icon}"
                accent-color="grey"
                contrast="4"
              ></simple-icon>
            `
          : ""}
        ${this.text != ""
          ? html`
              <span
                class="${this._getTextLabelClass(this.avatar, this.icon)}"
                part="lrnsys-button-inner-text-label"
                >${this.text}</span
              >
            `
          : ""}
      </div>
      <div><slot name="button"></slot><slot></slot></div>
    `;
  }

  static get tag() {
    return "lrnsys-button-inner";
  }
  /**
   * LitElement / popular convention
   */
  static get properties() {
    return {
      /**
       * Icon to present for clicking.
       */
      icon: {
        type: String,
      },
      /**
       * Icon to present for clicking.
       */
      avatar: {
        type: String,
      },
      /**
       * Text to present for clicking.
       */
      text: {
        type: String,
      },
    };
  }
  /**
   * Find out if the text does not have an avatar or an icon to the left,
   * and add a class to remove the left margin.
   */
  _getTextLabelClass(avatar, icon) {
    if (!avatar && !icon) {
      return "text-label-only";
    }
    return "text-label";
  }
}
window.customElements.define(LrnsysButtonInner.tag, LrnsysButtonInner);
export { LrnsysButtonInner };
