import { createTableListView } from "./TableListView";

export { createTableListView };

const featuredCommunitiesDomContainer = document.getElementById(
  "featured-communities-table-view-widget"
);
const communityDomContainer = document.getElementById(
  "community-table-view-widget"
);
const oaipmhDomContainer = document.getElementById("oaipmh-table-view-widget");

const communityProps = {
  header: "New communities",
  apiEndpoint: "api/communities",
  fields: {
    "metadata.title": { text: "Title", order: 1 },
    "metadata.type.title.en": { text: "Type", order: 2 },
    "access.visibility": { text: "Restriction", order: 3 },
  },
};

const featuredCommunitiesProps = {
  header: "Featured communities",
  apiEndpoint: "/api/communities/featured",
  fields: {
    "metadata.title": { text: "Title", order: 1 },
  },
};

const oaipmhProps = {
  header: "OAI-PMH Sets",
  apiEndpoint: "api/oaipmh/sets",
  fields: {
    name: { text: "Name", order: 1 },
    spec: { text: "Spec", order: 2 },
    description: { text: "Description", order: 2 },
  },
  sort: "created",
};

createTableListView(featuredCommunitiesDomContainer, featuredCommunitiesProps);
createTableListView(communityDomContainer, communityProps);
createTableListView(oaipmhDomContainer, oaipmhProps);
