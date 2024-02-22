import { fixture, expect, html } from "@open-wc/testing";

import "../evo-to-wc.js";

describe("evo-to-wc test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(
      html` <script>
          window.onload = () => {
            let converter = window.EvoToWc.requestAvailability();
            console.log(converter, document.getElementById("demo"));
            converter.convert(document.getElementById("demo"));
          };
        </script>
        <table
          id="demo"
          border="1"
          cellpadding="3"
          cellspacing="0"
          width="100%"
          summary="Each row names a style in the first column and describes its use case in the next column."
        >
          <thead>
            <tr>
              <th scope="row">Course Icon Block(s)</th>
              <th scope="col">Suggested Use</th>
            </tr>
          </thead>
          <caption class="offScreen">
            Course Icon Block Code
          </caption>
          <tbody>
            <tr>
              <th scope="row">
                <div class="coursework assessment">
                  <p>Course Icon: Assessment</p>
                </div>
              </th>
              <td>
                <p>Icon for an <strong>assessment</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework brainstorm">
                  <p>Course Icon: Brainstorming</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>brainstorming activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework casestudy">
                  <p>Course Icon: Case Study</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>case study</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework discussion">
                  <p>Course Icon: Discussion</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>discussion</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework email">
                  <p>Course Icon: Email</p>
                </div>
              </th>
              <td>
                <p>Icon for an <strong>email activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework game">
                  <p>Course Icon: Game</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>game</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework group">
                  <p>Course Icon: Group</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>group</strong> activity.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework handson">
                  <p>Course Icon: Hands-on</p>
                </div>
              </th>
              <td>
                <p>
                  Icon for an <strong>hands-on activity</strong> (labs,
                  simulations, etc).
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework image">
                  <p>Course Icon: Image</p>
                </div>
              </th>
              <td>
                <p>Icon for an <strong>image</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework mobile">
                  <p>Course Icon: Mobile</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>mobile activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework presentation">
                  <p>Course Icon: Presentiation</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>narrated presentation</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework reading">
                  <p>Course Icon: Reading</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>reading activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework reflection">
                  <p>Course Icon: Reflection Question</p>
                </div>
              </th>
              <td>
                <p>Icon for an <strong>reflection question</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework rss">
                  <p>Course Icon: RSS</p>
                </div>
              </th>
              <td>
                <p>Icon for an <strong>RSS feed</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework selfcheck">
                  <p>Course Icon: Self-Check</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>self-check activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework survey">
                  <p>Course Icon: Survey</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>survey</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework transcript">
                  <p>Course Icon: Transcript</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>transcript</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework video">
                  <p>Course Icon: Video</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>video</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework webresource">
                  <p>Course Icon: Web</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>web activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework written">
                  <p>Course Icon: Written</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>written activity</strong>.</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <div class="coursework yammer">
                  <p>Course Icon: Yammer</p>
                </div>
              </th>
              <td>
                <p>Icon for a <strong>Yammer activity</strong>.</p>
              </td>
            </tr>
          </tbody>
        </table>`,
    );
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
