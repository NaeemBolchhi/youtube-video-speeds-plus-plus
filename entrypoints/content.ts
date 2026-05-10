import './style.css';

export default defineContentScript({
    matches: ["*://www.youtube.com/*", "*://youtube.com/*"],
    runAt: "document_end",
    async main() {
        // console.log("Injecting script...");
        await injectScript("/injected.js", {
            keepInDom: true,
        });
        // console.log("Done!");
    },
});
