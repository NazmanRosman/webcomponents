import { fixture, expect, html } from "@open-wc/testing";

import "../mdi-iconset-svg.js";

describe("mdi-iconset-svg test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <mdi-iconset-svg title="test-title"></mdi-iconset-svg>
    `);
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});

/*
describe("A11y/chai axe tests", () => {
  it("mdi-iconset-svg passes accessibility test", async () => {
    const el = await fixture(html` <mdi-iconset-svg></mdi-iconset-svg> `);
    await expect(el).to.be.accessible();
  });
  it("mdi-iconset-svg passes accessibility negation", async () => {
    const el = await fixture(
      html`<mdi-iconset-svg
        aria-labelledby="mdi-iconset-svg"
      ></mdi-iconset-svg>`
    );
    await assert.isNotAccessible(el);
  });
});

/*
// Custom properties test
describe("Custom Property Test", () => {
  it("mdi-iconset-svg can instantiate a element with custom properties", async () => {
    const el = await fixture(html`<mdi-iconset-svg .foo=${'bar'}></mdi-iconset-svg>`);
    expect(el.foo).to.equal('bar');
  })
})
*/

/*
// Test if element is mobile responsive
describe('Test Mobile Responsiveness', () => {
    before(async () => {z   
      await setViewport({width: 375, height: 750});
    })
    it('sizes down to 360px', async () => {
      const el = await fixture(html`<mdi-iconset-svg ></mdi-iconset-svg>`);
      const width = getComputedStyle(el).width;
      expect(width).to.equal('360px');
    })
}) */

/*
// Test if element sizes up for desktop behavior
describe('Test Desktop Responsiveness', () => {
    before(async () => {
      await setViewport({width: 1000, height: 1000});
    })
    it('sizes up to 410px', async () => {
      const el = await fixture(html`<mdi-iconset-svg></mdi-iconset-svg>`);
      const width = getComputedStyle(el).width;
      expect(width).to.equal('410px');
    })
    it('hides mobile menu', async () => {
      const el await fixture(html`<mdi-iconset-svg></mdi-iconset-svg>`);
      const hidden = el.getAttribute('hidden');
      expect(hidden).to.equal(true);
    })
}) */
