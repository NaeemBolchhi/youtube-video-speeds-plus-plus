import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "YouTube Video Speeds++",
    short_name: "YT Speeds++",
    description: "Unlock more video speed options on YouTube.",
    web_accessible_resources: [
      {
        resources: ["injected.js"],
        matches: ["*://*/*"],
      },
    ],
    data_collection_permissions: {
      is_storing_data: false,
      is_collecting_personally_identifiable_information: false,
    },
  },
  webExt: {
    startUrls: ["https://www.youtube.com"],
  },
});
