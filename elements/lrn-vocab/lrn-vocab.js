/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import { SchemaBehaviors } from "@haxtheweb/schema-behaviors/schema-behaviors.js";
import "@haxtheweb/simple-modal/simple-modal.js";
/**
`lrn-vocab`
Vocabulary term with visual treatment and semantic meaning.

* @demo demo/index.html
*/
class LrnVocab extends SchemaBehaviors(LitElement) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: inline;
          --lrn-vocab-border: 1px dashed #ccc;
        }
        button {
          text-transform: none;
          min-width: unset;
          margin: 0;
          position: relative;
          top: 0px;
          border-radius: 0;
          border-bottom: var(--lrn-vocab-border);
          background: #f5f5f5;
          font-size: 1.1em;
          padding: 2px;
        }
        button:hover {
          background: #bbdefb;
          border-bottom: 1px dashed #2196f3;
        }
      `,
    ];
  }
  constructor() {
    super();
    setTimeout(() => {
      this.addEventListener("click", this.openDialog.bind(this));
    }, 0);
  }
  render() {
    return html` <button>${this.term}</button> `;
  }

  static get tag() {
    return "lrn-vocab";
  }
  static get properties() {
    return {
      ...super.properties,
      term: {
        type: String,
        reflect: true,
      },
    };
  }
  /**
   * Implements haxHooks to tie into life-cycle if hax exists.
   */
  haxHooks() {
    return {
      editModeChanged: "haxeditModeChanged",
      activeElementChanged: "haxactiveElementChanged",
    };
  }
  /**
   * double-check that we are set to inactivate click handlers
   * this is for when activated in a duplicate / adding new content state
   */
  haxactiveElementChanged(el, val) {
    if (val) {
      this._haxstate = val;
    }
  }
  /**
   * Set a flag to test if we should block link clicking on the entire card
   * otherwise when editing in hax you can't actually edit it bc its all clickable.
   * if editMode goes off this helps ensure we also become clickable again
   */
  haxeditModeChanged(val) {
    this._haxstate = val;
  }
  /**
   * Request the singleton dialog open
   */
  openDialog(e) {
    if (this._haxstate) {
      // do not do default
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    let c = globalThis.document.createElement("div");
    for (var id in this.children) {
      if (this.children[id].cloneNode) {
        c.appendChild(this.children[id].cloneNode(true));
      }
    }
    const evt = new CustomEvent("simple-modal-show", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        title: this.term,
        elements: {
          content: c,
        },
        styles: {
          "--simple-modal-width": "50vw",
          "--simple-modal-max-width": "50vw",
          "--simple-modal-z-index": "100000000",
          "--simple-modal-min-height": "50vh",
        },
        invokedBy: this,
      },
    });
    this.dispatchEvent(evt);
  }
  /**
   * Attached life cycle
   */
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    globalThis.SimpleModal.requestAvailability();
  }
  static get haxProperties() {
    return {
      canScale: false,

      canEditSource: true,
      gizmo: {
        title: "Vocab",
        description: "Vocabulary term",
        icon: "hax:vocab",
        color: "red",
        tags: ["Instructional", "vocab", "term", "definition", "glossary"],
        handles: [
          {
            type: "inline",
            text: "term",
          },
        ],
        meta: {
          author: "HAXTheWeb core team",
          inlineOnly: true,
        },
      },
      settings: {
        configure: [
          {
            property: "term",
            title: "Term",
            inputMethod: "textfield",
            icon: "editor:title",
            required: true,
          },
          {
            slot: "",
            title: "Definition",
            description:
              "The definitition to display when the term is clicked.",
            inputMethod: "code-editor",
            required: true,
          },
        ],
        advanced: [],
      },
    };
  }
}
globalThis.customElements.define(LrnVocab.tag, LrnVocab);
export { LrnVocab };
