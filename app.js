const form = document.querySelector("#searchForm");
const input = document.querySelector("input");
const content = document.querySelector("#content");
const breakTag = document.createElement("br");
const body = document.querySelector("body");
const search = document.querySelector("#search");
const cngClr = document.querySelector("#cngClr");

function randColor() {
  return Math.floor(Math.random() * 256);
}

function changeColor() {
  const r = randColor(),
    g = randColor(),
    b = randColor();
  body.style.background = `rgb(${r}, ${g}, ${b})`;
  body.style.color = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
  console.log(r);
  console.log(g);
  console.log(b);
}
changeColor();

cngClr.addEventListener("click", (e) => {
  e.preventDefault();
  changeColor();
});

search.addEventListener("click", async (e) => {
  e.preventDefault();
  const searchText = form.elements.query.value;
  if (searchText) {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`
      );
      const data = res.data;
      console.log(data);
      const header = document.createElement("h1");
      header.innerText = `${data[0].word.toUpperCase()}`;
      content.innerHTML = "";
      content.appendChild(header);
      for (const d of data) {
        const meanings = d.meanings;
        const para = document.createElement("p");
        for (const m of meanings) {
          const definitions = m.definitions;
          for (const d of definitions) {
            const def = d.definition;
            const span = document.createElement("span");
            span.innerText = def;
            para.appendChild(span);
            para.appendChild(breakTag);
          }
        }
        content.appendChild(para);
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  }
});
