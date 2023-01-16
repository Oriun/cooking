class CustomSelect {
  container = null;
  #search = "";
  #items = new Set();
  static template = document.querySelector("#custom_select").content;

  constructor(
    element,
    name,
    backgroundColor = "var(--main-color)",
    textColor = "white"
  ) {
    if (!element) throw new Error("Missing element");
    this.element = element;
    this.element.replaceChildren(CustomSelect.template.cloneNode(true));

    const container = this.element.querySelector(".custom-select");
    container.style.backgroundColor = backgroundColor;
    container.style.color = textColor;
    this.container = container;

    window.addEventListener("click", (event) => {
      if (!this.container.contains(event.target)) {
        this.container.classList.remove("open");
      }
    });

    const trigger = this.element.querySelector(".select-trigger");
    trigger.onclick = () => {
      this.container.classList.add("open");
    };

    const nameSpan = this.element.querySelector(".select-name");
    nameSpan.textContent = name;

    const searchInput = this.element.querySelector("input");
    searchInput.oninput = (event) => {
      this.search = event.target.value;
    };

    const openedContainer = this.element.querySelector(".select-options");
  }

  reset() {
    this.search = "";
  }

  get items() {
    return this.#items;
  }
  set items(items) {
    this.#items = items;
    this.render();
  }

  get search() {
    return this.#search;
  }

  set search(value) {
    this.#search = value;
    this.render();
  }

  getItemsToRender() {
    const lowerCaseSearch = this.search.toLowerCase();
    return Array.from(this.items).filter((item) => {
      return item.toLowerCase().includes(lowerCaseSearch);
    });
  }

  onselect(selection) {
    // To be implemented at runtime
    console.log("onselect", selection);
  }

  render() {
    const data = this.getItemsToRender();
    const optionsContainer = this.element.querySelector(".options");
    optionsContainer.replaceChildren(
      ...makeOptionElements(data, (item) => {
        this.onselect(item);
        this.container.classList.remove("open");
      })
    );
  }
}

function makeOptionElements(data, onclick) {
  return data.map((item) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = item;
    option.onclick = () => onclick(item);
    return option;
  });
}

function makeSelectedOptionElements(
  data,
  onclick,
  backgroundColor = "var(--main-color)",
  textColor = "white"
) {
  return data.map((item) => {
    const option = document.createElement("div");
    option.classList.add("selected-option");
    option.style.backgroundColor = backgroundColor;
    option.style.color = textColor;
    option.textContent = item;
    option.onclick = () => onclick(item);
    return option;
  });
}
