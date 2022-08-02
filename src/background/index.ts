chrome.commands.onCommand.addListener(async (command) => {
  chrome.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    for (const tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: false },
        files: ["js/script.js"],
      });
    }
  });
});
