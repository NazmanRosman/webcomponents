import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/cms-hax/cms-hax.js";
import { HAXStore } from "@lrnwebcomponents/hax-body/lib/hax-store.js";
/**
 * `wysiwyg-hax`
 * `Integration of wysiwyg edit form for a page with HAX.`
 * @demo demo/index.html
 * @element wysiwyg-hax
 */
class WysiwygHax extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }
  render() {
    return html`
      <textarea
        class="${this.fieldClass}"
        id="${this.fieldId}"
        name="${this.fieldName}"
        hidden=""
      >
      ${this.bodyValue}
      </textarea
      >
      <cms-hax
        hide-message=""
        redirect-location="${this.redirectLocation}"
        update-page-data="${this.updatePageData}"
        .end-point="${this.endPoint}"
        app-store-connection="${this.appStoreConnection}"
        offset-margin="${this.offsetMargin}"
        .allowed-tags="${this.allowedTags}"
        ?open-default="${this.openDefault}"
        ?sync-body="${this.syncBody}"
        ?hide-panel-ops="${this.hidePanelOps}"
        element-align="${this.elementAlign}"
      >
      </cms-hax>
    `;
  }

  static get tag() {
    return "wysiwyg-hax";
  }
  constructor() {
    super();
    this.windowControllers = new AbortController();
    // import child nodes before things start deleting whats in there
    let template = this.querySelector("template");
    if (template) {
      this.__importContent = template.cloneNode(true);
    }
    this.openDefault = false;
    this.elementAlign = "left";
    this.fieldId = "textarea-input-field";
    this.fieldName = "data[content]";
    this.endPoint = null;
    this.allowedTags = [];
    this.redirectLocation = "";
    this.updatePageData = "";
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "saveButtonSelector" && this[propName].tagName) {
        this.saveButtonSelector.addEventListener(
          "click",
          this.__saveClicked.bind(this),
        );
      }
    });
  }
  static get properties() {
    return {
      /**
       * Default the panel to open
       */
      openDefault: {
        type: Boolean,
        attribute: "open-default",
      },
      redirectLocation: {
        type: String,
        attribute: "redirect-location",
      },
      /**
       * Hide the panel operations (save and cancel),
       */
      hidePanelOps: {
        type: Boolean,
        attribute: "hide-panel-ops",
      },
      /**
       * Direction to align the hax edit panel
       */
      elementAlign: {
        type: String,
        attribute: "element-align",
      },
      offsetMargin: {
        type: String,
        attribute: "offset-margin",
      },
      /**
       * Data binding of a hidden text area with the value from the hax-body tag
       */
      bodyValue: {
        type: String,
        attribute: "body-value",
      },
      /**
       * allowed Tags, usually as dictated by the input filtering
       * layer of the backend system that HAX is riding on.
       * While not fullproof, this at least will enforce front-end
       * filtering to match what actually is going to be allowed
       * to be saved in the first place.
       */
      allowedTags: {
        type: Array,
        attribute: "allowed-tags",
      },
      /**
       * Connection object for talking to an app store.
       */
      appStoreConnection: {
        type: String,
        attribute: "app-store-connection",
      },
      /**
       * Object reference that will get clicked on
       */
      saveButtonSelector: {
        type: Object,
      },
      /**
       * class on the field
       */
      fieldClass: {
        type: String,
        attribute: "field-class",
      },
      /**
       * fieldId, id value on the input field.
       */
      fieldId: {
        type: String,
        attribute: "field-id",
      },
      /**
       * fieldName, internal to the form in whatever system it's in.
       */
      fieldName: {
        type: String,
        attribute: "field-name",
      },
      syncBody: {
        type: Boolean,
        attribute: "sync-body",
        reflect: true,
      },
      /**
       * Location to save content to.
       */
      endPoint: {
        type: String,
        attribute: "end-point",
      },
      /**
       * Page data, body of text as a string.
       */
      updatePageData: {
        type: String,
        attribute: "update-page-data",
      },
    };
  }
  /**
   * forces the creation of a light dom node
   */
  createRenderRoot() {
    return this;
  }
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    if (this.__importContent) {
      this.querySelector("cms-hax").appendChild(this.__importContent);
    }
  }
  /**
   * HTMLElement
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      "hax-save-body-value",
      this._bodyContentUpdated.bind(this),
      { signal: this.windowControllers.signal },
    );
  }
  /**
   * HTMLElement
   */
  disconnectedCallback() {
    this.windowControllers.abort();
    if (this.saveButtonSelector && this.saveButtonSelector.tagName) {
      this.saveButtonSelector.removeEventListener(
        "click",
        this.__saveClicked.bind(this),
      );
    }
    super.disconnectedCallback();
  }
  async __saveClicked(e) {
    HAXStore.skipExitTrap = true;
    HAXStore.editMode = false;
    this.dispatchEvent(
      new CustomEvent("hax-save", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: e.detail,
      }),
    );
    window.dispatchEvent(
      new CustomEvent("simple-modal-hide", {
        bubbles: true,
        cancelable: true,
        detail: {},
      }),
    );
  }

  /**
   * Set the bubbled up event to the body value that just got changed
   */
  async _bodyContentUpdated(e) {
    this.bodyValue = e.detail.value;
  }
}
customElements.define(WysiwygHax.tag, WysiwygHax);
export { WysiwygHax };
