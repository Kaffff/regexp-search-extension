console.log("background");
const script = () => {
  console.log("script");
  const observer = new MutationObserver((mutations) => {
    mutations.map((m) => {
      switch (m.type) {
        case "childList": {
        }
        case "attributes": {
          console.log("attributes", m);
        }
        case "characterData": {
          console.log("characterData", m);
        }
      }
    });
  });
  document.body.style.background = "#ff0000";
  const inputElements = document.getElementsByTagName("input");
  for (let i = 0; i < inputElements.length; i++) {
    inputElements.item(i).oninput = (e: InputEvent) => {
      console.log(e.data);
    };
  }
  // observer.observe(document.body, {
  //   childList: true,
  //   characterData: true,
  //   attributes: true,
  //   subtree: true,
  // });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status == "complete") {
    chrome.scripting.executeScript({
      target: { tabId, allFrames: false },
      func: script,
    });
  }
});
