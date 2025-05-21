/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import { SchemaBehaviors } from "@haxtheweb/schema-behaviors/schema-behaviors.js";
import "@haxtheweb/es-global-bridge/es-global-bridge.js";
/**
 * `aframe-player`
 * `A wrapper to do data binding into aframe`
 *
 * @demo demo/index.html
 * @element aframe-player
 */
class AframePlayer extends SchemaBehaviors(LitElement) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
        }
        .a-hidden {
          display: hidden;
        }
      `,
    ];
  }
  render() {
    return html`
      <a-scene
        id="scene"
        class="embedded"
        embedded
        ?arjs="${this.ar}"
        style="height:${this.height};width:${this.width};"
      >
        <a-sky color="${this.skyColor}"></a-sky>
        <a-marker-camera preset="hiro"></a-marker-camera>
      </a-scene>
    `;
  }

  static get tag() {
    return "aframe-player";
  }
  constructor() {
    super();
    this.windowControllers = new AbortController();
    this.course = "";
    this.height = "480px";
    this.width = "640px";
    this.skyColor = "#DCDCDC";
    this.ar = false;
    this.x = "0";
    this.y = "0";
    this.z = "0";
    this.position = {};
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (["x", "y", "z", "width", "height"].includes(propName)) {
        this.position = this._computePosition(
          this.x,
          this.y,
          this.z,
          this.width,
          this.height,
        );
      }
      if (propName == "position") {
        this._positionChanged(this[propName]);
      }
    });
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * Source to reference for the 3D object
       */
      source: {
        type: String,
      },
      /**
       * height of the element
       */
      height: {
        type: String,
      },
      /**
       * width of the element
       */
      width: {
        type: String,
      },
      /**
       * Color of the sky / background.
       */
      skyColor: {
        type: String,
        attribute: "sky-color",
      },
      /**
       * If this is for augmented reality or not.
       */
      ar: {
        type: Boolean,
      },
      /**
       * x position for the AR element.
       */
      x: {
        type: String,
      },
      /**
       * y position for the AR element.
       */
      y: {
        type: String,
      },
      /**
       * z position for the AR element.
       */
      z: {
        type: String,
      },
      /**
       * Generate a position object when coordinates change.
       */
      position: {
        type: Object,
      },
    };
  }
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    this.windowControllers.abort();
    super.disconnectedCallback();
  }
  static get haxProperties() {
    return {
      canScale: false,

      canEditSource: true,
      gizmo: {
        title: "3D player",
        description: "A 3D file / augmented reality player.",
        icon: "av:play-circle-filled",
        color: "amber",
        tags: [
          "3D",
          "augmented reality",
          "AR",
          "VR",
          "video",
          "aframe",
          "webxr",
          "webvr",
        ],
        handles: [
          {
            type: "3d",
            source: "source",
          },
        ],
        meta: {
          author: "HAXTheWeb core team",
        },
      },
      settings: {
        configure: [
          {
            property: "source",
            title: "Source",
            description: "The URL for this AR file.",
            inputMethod: "textfield",
            type: "bar",
            icon: "link",
            required: true,
          },
          {
            property: "x",
            title: "X",
            description: "X position of the element in AR.",
            inputMethod: "textfield",
            type: "bar",
            icon: "communication:location-on",
            required: true,
          },
          {
            property: "y",
            title: "Y",
            description: "Y position of the element in AR.",
            inputMethod: "textfield",
            type: "bar",
            icon: "communication:location-on",
            required: true,
          },
          {
            property: "z",
            title: "Z",
            description: "Z position of the element in AR.",
            inputMethod: "textfield",
            type: "bar",
            icon: "communication:location-on",
            required: true,
          },
          {
            property: "skyColor",
            title: "Sky color",
            description: "Select the color of the sky in the scene.",
            inputMethod: "colorpicker",
            type: "bar",
            icon: "editor:format-color-fill",
          },
        ],
        advanced: [],
      },
    };
  }
  /**
   * Attached.
   */
  connectedCallback() {
    super.connectedCallback();
    let location = "https://aframe.io/releases/0.9.2/aframe.min.js";
    if (typeof TWEEN === "object") this._aframeLoaded.bind(this);
    globalThis.addEventListener(
      "es-bridge-aframePlayer-loaded",
      this._aframeLoaded.bind(this),
      { signal: this.windowControllers.signal },
    );
    globalThis.ESGlobalBridge.requestAvailability().load(
      "aframePlayer",
      location,
    );
  }

  _aframeLoaded(el) {
    // ensure that this doesn't put full screen styles on the page!
    this.querySelector("#scene").removeFullScreenStyles();
    this.__entity = globalThis.document.createElement("a-entity");
    this.__entity.setAttribute("gltf-model", "url(" + this.source + ")");
    this._positionChanged(this.position);
    this.querySelector("#scene").appendChild(this.__entity);
  }

  /**
   * Generate position object based on format a-frame expects.
   */
  _computePosition(x, y, z, width, height) {
    return {
      x: x,
      y: y,
      z: z,
    };
  }

  /**
   * When position is updated, inject this into a-frame tag.
   */
  _positionChanged(position) {
    if (this.__entity !== undefined)
      this.__entity.setAttribute("position", position);
  }
}
globalThis.customElements.define(AframePlayer.tag, AframePlayer);
export { AframePlayer };
