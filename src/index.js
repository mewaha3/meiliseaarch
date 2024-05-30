/* global instantsearch */
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import injectScript from "scriptjs";

injectScript(
  `https://maps.googleapis.com/maps/api/js?v=quarterly&key=AIzaSyDOaUaar4GL0i99LpN2zQHzfWXL1wu_JQo`,
  () => {
    const search = instantsearch({
      indexName: "poi_pa",
      searchClient: instantMeiliSearch(
        "https://ms-c3c3ab0fbc52-10243.sgp.meilisearch.io",
        "a200313d943dd7329e2657920a625d4b896cfda1"
      )
    });
    search.addWidgets([
      instantsearch.widgets.stats({
        container: "#stats"
      }),
      instantsearch.widgets.searchBox({
        container: "#searchbox"
      }),
      instantsearch.widgets.configure({
        hitsPerPage: 10
      }),
      instantsearch.widgets.geoSearch({
        container: "#maps",
        googleReference: window.google,
        initialZoom: 7,
        initialPosition: {
          lat: 13.663005,
          lng: 100.438328
        },
      }),
      instantsearch.widgets.infiniteHits({
        container: "#hits",
        templates: {
          item: `
            <div>
              <div class="hit-name">
                {{#helpers.highlight}}{ "attribute": "name_e" }{{/helpers.highlight}}
              </div>
              <div class="hit-name">
                {{#helpers.highlight}}{ "attribute": "name_t" }{{/helpers.highlight}}
              </div>
              <div class="hit-name">
                type: {{#helpers.highlight}}{ "attribute": "type" }{{/helpers.highlight}}
              </div>
              <div class="hit-name">
                province: {{#helpers.highlight}}{ "attribute": "province" }{{/helpers.highlight}}
              </div>
            </div>
          `
        }
      })
    ]),
    
    search.start();
  }
);
