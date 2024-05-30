/* global instantsearch */
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import injectScript from "scriptjs";

injectScript(
  `https://maps.googleapis.com/maps/api/js?v=quarterly&key=AIzaSyDOaUaar4GL0i99LpN2zQHzfWXL1wu_JQo`,
  () => {
    const search = instantsearch({
      indexName: "poi_last",
      searchClient: instantMeiliSearch(
        "https://ms-6265b132cf97-9584.sgp.meilisearch.io",
        "61fa3ffe68a4a33adfc3a62afb552a7a27fcc84f"
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
