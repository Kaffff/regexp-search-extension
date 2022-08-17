import { Search } from "./search";

const body = document.body;
const input_ele = document.createElement("input");
input_ele.className = ".regexp-search";
input_ele.style.position = "fixed";
input_ele.style.top = "0px";
input_ele.style.right = "0px";
input_ele.style.height = "20px";
input_ele.style.color = "#dddddd";
input_ele.style.backgroundColor = "#222222";
input_ele.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
input_ele.onchange = (e: InputEvent) => {
  if (!input_ele.value || input_ele.value.trim() == "") return;
  const re = new RegExp(input_ele.value, "gi");
  const search = new Search();
  search.search(body, re);
};
const _input_ele = document.body.getElementsByClassName(".regexp-search");
const is_input_ele = _input_ele.length != 0;
if (is_input_ele) {
  (_input_ele[0] as HTMLInputElement).focus();
} else {
  document.body.appendChild(input_ele);
  input_ele.focus();
}
