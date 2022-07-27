const script = () => {
  const textContent = document.body.textContent;
  const input_ele = document.createElement("input");
  input_ele.style.position = "absolute";
  input_ele.style.top = "0px";
  input_ele.style.right = "0px";
  input_ele.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
  input_ele.onchange = (e: InputEvent) => {
    if (!input_ele.value || input_ele.value.trim() == "") return;
    const re = new RegExp(input_ele.value, "gi");
    const match = [...textContent.matchAll(re)];
    if (!match || match.length == 0) console.log(`${input_ele.value} 0件`);
    else console.log(`${input_ele.value} ${match.length}件\n${match}`);
  };
  document.body.appendChild(input_ele);
  input_ele.focus();
};

chrome.commands.onCommand.addListener(async (command) => {
  chrome.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    console.log(tabs);
    for (const tab of tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: false },
        func: script,
      });
    }
  });
});
