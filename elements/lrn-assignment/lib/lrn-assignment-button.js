import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button-lite.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
class LrnAssignmentButton extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        a {
          color: inherit;
          text-decoration: inherit;
        }
        button {
          background: #b0e6f9;
        }
        button[complete] {
          background: #e7ffe7;
        }
        simple-icon-lite {
          margin-left: 8px;
          opacity: 0.8;
        }
      `,
    ];
  }
  /**
   * LitElement render
   */
  render() {
    return html`
      <a href="${this.url}">
        ${this.open
          ? html`
              <button raised open>
                ${this.title}
                <simple-icon-lite icon="lrn-icons:input"></simple-icon-lite>
              </button>
            `
          : ``}
        ${this.complete
          ? html`
              <button raised complete>
                ${this.title}
                <simple-icon-lite icon="lrn-icons:done"></simple-icon-lite>
              </button>
            `
          : ``}
      </a>
    `;
  }
  static get tag() {
    return "lrn-assignment-button";
  }
  constructor() {
    super();
    this.open = false;
    this.complete = false;
  }
  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      open: {
        type: Boolean,
      },
      complete: {
        type: Boolean,
      },
    };
  }
}
customElements.define(LrnAssignmentButton.tag, LrnAssignmentButton);
export { LrnAssignmentButton };
