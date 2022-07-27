import Mark from "mark.js";

const body = document.body;
const input_ele = document.createElement("input");
input_ele.style.position = "absolute";
input_ele.style.top = "0px";
input_ele.style.right = "0px";
input_ele.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
input_ele.onchange = (e: InputEvent) => {
  if (!input_ele.value || input_ele.value.trim() == "") return;
  const re = new RegExp(input_ele.value, "gi");
  const mark = new Mark(body);
  mark.markRegExp(re);
};
document.body.appendChild(input_ele);
input_ele.focus();
