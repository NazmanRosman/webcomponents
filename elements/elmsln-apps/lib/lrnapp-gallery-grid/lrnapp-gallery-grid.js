import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/iron-scroll-threshold/iron-scroll-threshold.js";
import "@polymer/polymer/lib/elements/dom-repeat.js";
import "../elmsln-base-deps.js";
import "@lrnwebcomponents/elmsln-loading/elmsln-loading.js";
import "@lrnwebcomponents/materializecss-styles/materializecss-styles.js";
class LrnappGalleryGrid extends PolymerElement {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._triggerDialog.bind(this));
  }
  disconnectedCallback() {
    this.removeEventListener("click", this._triggerDialog.bind(this));
    super.disconnectedCallback();
  }
  static get template() {
    return html`
      <style include="materializecss-styles">
        :host {
          display: block;
        }
        button {
          padding: 0;
          margin: 0;
          min-width: 1rem;
        }
        #details {
          opacity: 0.5;
          position: absolute;
          bottom: 0;
          right: 0;
          margin: 0 1rem 0 0;
          background-color: white;
          padding: 0.5em;
        }
        #details:hover {
          opacity: 1;
        }
        #details span {
          font-size: 0.6em;
          font-weight: normal;
        }
        #details .comment-on-work {
          font-size: 0.8em;
          background-color: white;
        }
      </style>
      <iron-ajax
      reject-with-request
      on-last-error-changed="lastErrorChanged"
        id="ajax"
        url="[[sourcePath]]"
        params=""
        handle-as="json"
        last-response="{{submissions}}"
      ></iron-ajax>
      <iron-scroll-threshold on-lower-threshold="_loadMoreData" id="threshold">
        <iron-list grid items="[[_toArray(submissions.data)]]" as="item">
          <template
            is="dom-repeat"
            items="[[_toArray(item.images)]]"
            as="image"
          >
            <button>
              <img
                open-url="{{item.url}}"
                title="{{item.title}}"
                alt="{{item.title}}"
                src="{{image.src}}"
                author="{{item.author}}"
                comments="{{item.comments}}"
                height="{{image.height}}"
                width="{{image.width}}"
              />
            </button>
          </template>
        </iron-list>
      </iron-scroll-threshold>
      <paper-dialog id="dialog">
        <div
          style="height:50vh;width:100%;overflow:scroll;"
          id="dialogResponse"
        >
          <img loading="lazy" src$="[[activeImage]]" />
          <div id="details">
            <div class="title">
              <span>Title:</span> <span>{{{activeTitle}}}</span>
            </div>
            <div class="author">
              <span>Author:</span> <span>{{activeAuthor}}</span>
            </div>
            <div class="comments">
              <span>Comments:</span> <span>{{activeComments}}</span>
            </div>
            <div class="comment-on-work">
              <a href$="[[activeUrl]]">
                <button raised>Comment on this work</button>
              </a>
            </div>
          </div>
        </div>
      </paper-dialog>
    `;
  }
  static get tag() {
    return "lrnapp-gallery-grid";
  }
  static get properties() {
    return {
      elmslnCourse: {
        type: String,
      },
      elmslnSection: {
        type: String,
      },
      basePath: {
        type: String,
      },
      csrfToken: {
        type: String,
      },
      endPoint: {
        type: String,
      },
      sourcePath: {
        type: String,
        notify: true,
      },
      submissions: {
        type: Array,
        notify: true,
      },
      activeImage: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      activeTitle: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      activeAuthor: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      activeComments: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
      activeUrl: {
        type: String,
        reflectToAttribute: true,
        notify: true,
      },
    };
  }
  /**
   * Handle the last error rolling in
   */
   lastErrorChanged(e) {
    if (e.detail.value) {
      console.error(e);
      const target = normalizeEventPath(e)[0];
      // check for JWT needing refreshed vs busted but must be 403
      switch (parseInt(e.detail.value.status)) {
        // cookie data not found, need to go get it
        // @notice this currently isn't possible but we could modify
        // the backend in the future to support throwing 401s dynamically
        // if we KNOW an event must expire the timing token
        case 401:
        case 401:
          // we know what the "target" is as an iron-ajax tag
          // so we know what call was just attempted. Let's await
          // a fetch against the top level site landing page with
          // no-cors will force a hit against the backend to refresh
          // the PHP session / bounce back from Azure as needed
          // so that when we reissue this call it'll go through (magically)
          fetch(window.Drupal.settings.basePath, { mode: 'no-cors'}).then((e) => {
            console.log(e);
            // delay just to be sure
            setTimeout(() => {
              target.generateRequest();
            }, 250);
          });
        break;
      }
    }
  }
  /**
   * When someone clicks if there is a url, then we need to
   * remote load whatever is in that url.
   */
  _triggerDialog(e) {
    // make sure we found an image as we're going through here
    if (e.target.nextElementSibling.nodeName == "IMG") {
      this.activeImage = e.target.nextElementSibling.src;
      this.activeTitle = e.target.parentElement.title;
      this.activeAuthor = e.target.parentElement.author;
      this.activeComments = e.target.parentElement.comments;
      this.activeUrl = e.target.parentElement.openUrl;
      this.shadowRoot.querySelector("#dialog").toggle();
    }
  }
  _loadMoreData(e) {
    this.shadowRoot.querySelector("#ajax").generateRequest();
    this.shadowRoot.querySelector("#threshold").clearTriggers();
  }
  /**
   * Simple way to convert from object to array.
   */
  _toArray(obj) {
    if (obj == null) {
      return [];
    }
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }
}
window.customElements.define(LrnappGalleryGrid.tag, LrnappGalleryGrid);
export { LrnappGalleryGrid };
