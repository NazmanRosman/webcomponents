import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import { I18NMixin } from "@lrnwebcomponents/i18n-manager/lib/I18NMixin.js";
class MapMenuHeader extends I18NMixin(LitElement) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
          transition: 0.1s all ease-in-out;
          --map-menu-item-height: 24px;
        }
        :host([active]) {
          background: var(--map-menu-active-color);
          color: var(--map-menu-item-active-item-color, #000000);
        }
        #container {
          display: flex;
          align-items: center;
        }

        .avatarlabel {
          margin-right: 10px;
        }

        #center {
          flex: 1 1 auto;
        }
        a,
        a:visited {
          display: block;
          color: var(--map-menu-item-a-color, inherit);
          text-decoration: var(--map-menu-header-a-text-decoration, none);
        }
        a:hover button,
        a:active button,
        a:focus button {
          color: var(
            --map-menu-item-a-active-color,
            var(--map-menu-item-a-color, inherit)
          );
          text-decoration: var(
            --map-menu-header-a-text-decoration-hover,
            underline
          );
        }
        lrndesign-avatar {
          display: inline-block;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
          padding: 2px;
          position: relative;
          margin-top: -2px;
          transform: translateY(2px);
        }

        #link {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;
        }

        #right simple-icon-lite {
          display: inline-block;
          color: gray;
        }

        simple-icon-lite {
          color: inherit;
          display: inline-block;
          --simple-icon-height: var(--map-menu-item-height);
          --simple-icon-width: var(--map-menu-item-height);
        }

        button {
          cursor: pointer;
          color: inherit;
          background-color: transparent;
          text-transform: none;
          width: 100%;
          justify-content: left;
          margin: 0px;
          border: 0;
          min-height: var(--map-menu-header-button-min-height, 48px);
          padding: 4px;
          text-align: left;
          border-radius: 0;
        }
        :host([status="new"]) a::after {
          border-right: 8px solid green;
          content: "";
          margin-left: -8px;
        }
        :host([status="modified"]) a::after {
          border-right: 8px solid orange;
          content: "";
          margin-left: -8px;
        }
        :host([status="delete"]) a::after {
          border-right: 8px solid red;
          content: "";
          margin-left: -8px;
        }
        #unpublished {
          --simple-icon-width: 20px;
          --simple-icon-height: 20px;
          color: orange;
          float: right;
          margin: -4px 32px 0px 0px;
          vertical-align: top;
          height: 0px;
          width: 0px;
        }
      `,
    ];
  }
  /**
   * LitElement life cycle - render callback
   */
  render() {
    return html`
      <div id="container">
        ${this.avatarLabel
          ? html`
              <div class="avatarlabel">
                <lrndesign-avatar
                  label="${this.avatarLabel}"
                ></lrndesign-avatar>
              </div>
            `
          : ``}
        <div id="center">
          <a tabindex="-1" href="${this.url}">
            <button class="title">
              ${this.icon
                ? html`
                    <simple-icon-lite icon="${this.icon}"></simple-icon-lite>
                  `
                : ``}
              <div id="label">${this.label}</div>
              <div class="title">${this.title}</div>
              ${!this.published
                ? html`<simple-icon-lite
                    id="unpublished"
                    title="${this.t.pageIsUnpublished}"
                    icon="icons:visibility-off"
                  ></simple-icon-lite>`
                : ``}
            </button>
          </a>
        </div>
      </div>
    `;
  }

  static get tag() {
    return "map-menu-header";
  }
  /**
   * HTMLElement
   */
  constructor() {
    super();
    this.avatarLabel = "";
    this.icon = null;
    this.url = "";
    this.status = "";
    this.opened = false;
    this.active = false;
    this.published = true;
    this.locked = false;
    this.t = {
      pageIsUnpublished: "Page is unpublished",
    };
    this.registerLocalization({
      context: this,
      namespace: "map-menu",
      localesPath: new URL("../locales", import.meta.url).href,
      locales: ["es"],
    });
    setTimeout(() => {
      this.addEventListener("click", this.__tap.bind(this));
      this.addEventListener("keypress", this.__keypress.bind(this));
    }, 0);
  }
  /**
   * LitElement life cycle - properties changed callback
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "opened") {
        this._openedChanged(this[propName], oldValue);
      }
      if (["id", "selected"].includes(propName)) {
        this.__selectedChanged(this.selected, this.id);
      }
      // only import avatar if we absolutely need it since its heavy
      if (propName == "avatarLabel" && this[propName] != "") {
        import("@lrnwebcomponents/lrndesign-avatar/lrndesign-avatar.js");
      }
    });
  }
  /**
   * LitElement life cycle - properties definition
   */
  static get properties() {
    return {
      title: {
        type: String,
      },
      label: {
        type: String,
      },
      avatarLabel: {
        type: String,
        attribute: "avatar-label",
      },
      opened: {
        type: Boolean,
      },
      url: {
        type: String,
      },
      id: {
        type: String,
        reflect: true,
      },
      icon: {
        type: String,
      },
      active: {
        type: Boolean,
        reflect: true,
      },
      published: {
        type: Boolean,
      },
      locked: {
        type: Boolean,
      },
      status: {
        type: String,
        reflect: true,
      },
      selected: {
        type: String,
        reflect: true,
      },
      __collapseIcon: {
        type: String,
      },
      __collapseAria: {
        type: String,
      },
    };
  }
  _openedChanged(newValue, oldValue) {
    if (newValue) {
      this.__collapseIcon = "icons:expand-more";
      this.__collapseAria = "collapse menu";
    } else {
      this.__collapseIcon = "icons:chevron-right";
      this.__collapseAria = "expand menu";
    }
  }
  __selectedChanged(selected, id) {
    if (selected === id) {
      if (!this.parentNode.expanded) {
        this.dispatchEvent(
          new CustomEvent("toggle-header", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: true,
          })
        );
      }
      this.dispatchEvent(
        new CustomEvent("active-item", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: this,
        })
      );
    }
  }

  __tap(e) {
    // send to toggle event
    this.__toggleEventHandler(e);
  }

  __keypress(e) {
    // send to toggle event
    if (e.code === "Enter") {
      this.__toggleEventHandler(e);
    }
  }

  __toggleEventHandler(e) {
    if (!this.parentNode.expanded) {
      this.dispatchEvent(
        new CustomEvent("toggle-header", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: true,
        })
      );
    }
  }
}
customElements.define(MapMenuHeader.tag, MapMenuHeader);
export { MapMenuHeader };
