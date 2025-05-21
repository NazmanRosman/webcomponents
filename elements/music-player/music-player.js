/**
 * Copyright 2020 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
/**
 * `music-player`
 * `Visualize different types of music and simple format player`
 *
 * @demo demo/index.html
 * @element music-player
 */
class MusicPlayer extends LitElement {
  /**
   * Convention we use
   */
  static get tag() {
    return "music-player";
  }

  /**
   * HTMLElement
   */
  constructor() {
    super();
    this.noWaterfall = false;
    this.noVisual = false;
    this.visualizer = "staff";
  }
  //styles function
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
        midi-player {
          display: block;
          width: var(--music-player-midi-player-width, unset);
          margin: var(--music-player-midi-player-margin, 4px);
        }
        :host([no-visual]) midi-visualizer {
          display: none;
        }

        :host([no-waterfall]) midi-visualizer .waterfall-notes-container {
          display: none;
        }
        midi-visualizer .waterfall-visualizer {
          overflow: auto;
        }
      `,
    ];
  }

  // render function
  render() {
    return html`
      <midi-visualizer
        type="${this.visualizer}"
        src="${this.source}"
      ></midi-visualizer>
      <midi-player src="${this.source}" sound-font></midi-player>
    `;
  }

  // properties available to the custom element for data binding
  static get properties() {
    return {
      source: {
        type: String,
      },
      visualizer: {
        type: String,
      },
      noWaterfall: {
        type: Boolean,
        attribute: "no-waterfall",
        reflect: true,
      },
      noVisual: {
        type: Boolean,
        attribute: "no-visual",
        reflect: true,
      },
    };
  }

  /**
   * LitElement life cycle - 1st updated
   */
  firstUpdated() {
    this.visualizerElement = this.shadowRoot.querySelector("midi-visualizer");
    setTimeout(() => {
      import("./lib/html-midi-player.js").then((module) => {
        // associate the visualizer to the player
        this.shadowRoot
          .querySelector("midi-player")
          .addVisualizer(this.visualizerElement);
      });
    }, 0);
  }
  /**
   * Attached to the DOM, now fire.
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}
globalThis.customElements.define(MusicPlayer.tag, MusicPlayer);
export { MusicPlayer };
