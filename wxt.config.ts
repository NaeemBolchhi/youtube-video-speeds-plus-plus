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
    browser_specific_settings: {
      gecko: {
        "id": "@youtube-video-speeds-plus-plus",
        "data_collection_permissions": {
          "required": ["none"]
        }
      }
    },
  },
  webExt: {
    startUrls: ["https://www.youtube.com"],
  },
});
