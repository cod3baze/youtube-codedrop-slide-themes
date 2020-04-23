const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");

const getStyle = (element, value) =>
  window.getComputedStyle(element).getPropertyValue(value);

// light theme
const initialColors = {
  bg: getStyle(html, "--bg"),
  bgPanel: getStyle(html, "--bg-panel"),
  colorHeadings: getStyle(html, "--color-headings"),
  colorText: getStyle(html, "--color-text"),
};

// dark theme
const elias = {
  bg: "#333333",
  bgPanel: "#434343",
  colorHeadings: "#3664ff",
  colorText: "#b5b5b5",
};

const transformKey = (key) =>
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

// muda o theme no html
const changeColors = (colors) => {
  Object.keys(colors).map((key) =>
    html.style.setProperty(transformKey(key), colors[key])
  );
};

// manipula os modos no estado
const setState = (mode = "light") => {
  if (mode === "light") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
};

// pega o modo atual
const useState = () => localStorage.getItem("theme");

// muda o modo conforme o slider
checkbox.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(elias) : changeColors(initialColors);
  if (target.checked) {
    setState("dark");
  } else {
    setState();
  }
});

// verifica qual o modo definido: dark | light
const initial = () => {
  const on = useState();
  if (on === "dark") {
    changeColors(elias);
    checkbox.checked = true;
  } else {
    changeColors(initialColors);
  }
};

initial();
