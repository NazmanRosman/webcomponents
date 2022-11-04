/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import { autorun, toJS } from "mobx";
/**
 * `site-breadcrumb`
 * `A basic breadcrumb of links based on the active state in HAXcms on JSON Outline Schema`
 *
 * @demo demo/index.html
 */
class SiteBreadcrumb extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          font-size: var(--site-breadcrumb-font-size, 16px);
          color: var(--site-breadcrumb-color, #383f45);
        }
        a {
          display: inline-flex;
          font-size: var(--site-breadcrumb-font-size, 16px);
          color: inherit;
          display: inline-flex;
          padding: 0 8px 0 0;
          vertical-align: text-top;
          text-decoration: var(--site-breadcrumb-text-decoration, underline);
        }
        button {
          margin: 0;
          padding: 0;
          font-size: var(--site-breadcrumb-font-size, 16px);
          font-family: inherit;
          min-width: unset;
          display: inline-flex;
          text-transform: unset;
          background-color: transparent;
          border: none;
          letter-spacing: inherit;
          cursor: pointer;
          color: inherit;
        }
        a:hover,
        a:focus,
        a:active,
        button:hover,
        button:focus,
        button:active {
          background-color: var(--site-breadcrumb-hover-bg, transparent);
          color: var(--site-breadcrumb-hover-color, #222222);
        }
        span {
          margin: 0;
          font-size: var(--site-breadcrumb-font-size, 16px);
          padding: 0 8px 0 0;
          height: 24px;
          display: inline-flex;
        }
        simple-icon-lite {
          display: inline-flex;
          --simple-icon-height: 24px;
          --simple-icon-width: 24px;
          padding: 0 8px 0 0;
          color: inherit;
        }
      `,
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "site-breadcrumb";
  }
  constructor() {
    super();
    this.__disposer = [];
  }
  // render function
  render() {
    return html`
      <div
        id="space"
        itemscope
        itemtype="http://data-vocabulary.org/Breadcrumb"
      ></div>
    `;
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    // keep editMode in sync globally
    autorun((reaction) => {
      this.manifest = toJS(store.routerManifest);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this.editMode = toJS(store.editMode);
      this.__disposer.push(reaction);
    });
    autorun((reaction) => {
      this._activeItemChanged(toJS(store.activeItem));
      this.__disposer.push(reaction);
    });
  }
  /**
   * Notice the change and build
   */
  _activeItemChanged(active) {
    const activeItem = active;
    if (
      activeItem &&
      this.shadowRoot &&
      this.shadowRoot.querySelector("#space")
    ) {
      // wipe out the slot and rebuild it
      while (this.shadowRoot.querySelector("#space").firstChild !== null) {
        this.shadowRoot
          .querySelector("#space")
          .removeChild(this.shadowRoot.querySelector("#space").firstChild);
      }
      var items = [
        {
          title: activeItem.title,
          slug: null,
        },
      ];
      let itemBuilder = activeItem;
      // walk back through parent tree
      while (itemBuilder && itemBuilder.parent != null) {
        itemBuilder = this.manifest.items.find(
          (i) => i.id == itemBuilder.parent
        );
        // double check structure is sound
        if (itemBuilder) {
          items.unshift({
            title: itemBuilder.title,
            slug: itemBuilder.slug,
          });
        }
      }
      for (var i in items) {
        let icon = document.createElement("simple-icon-lite");
        icon.icon = "icons:chevron-right";
        if (items[i].slug != null) {
          let button = document.createElement("button");
          button.innerText = items[i].title;
          button.noink = true;
          // disable buttons if we ware editing
          if (this.editMode) {
            button.setAttribute("disabled", "disabled");
            this.shadowRoot.querySelector("#space").appendChild(button);
          } else {
            let link = document.createElement("a");
            link.setAttribute("href", items[i].slug);
            link.setAttribute("tabindex", "-1");
            link.setAttribute("itemprop", "url");
            link.appendChild(button);
            this.shadowRoot.querySelector("#space").appendChild(link);
          }
          this.shadowRoot.querySelector("#space").appendChild(icon);
        } else {
          let span = document.createElement("span");
          span.innerText = items[i].title;
          this.shadowRoot.querySelector("#space").appendChild(span);
        }
      }
    }
  }
  disconnectedCallback() {
    for (var i in this.__disposer) {
      this.__disposer[i].dispose();
    }
    super.disconnectedCallback();
  }
}
customElements.define(SiteBreadcrumb.tag, SiteBreadcrumb);
export { SiteBreadcrumb };
