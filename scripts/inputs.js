class CustomSelect {
  #search = "";
  #items = new Set();

  constructor(element) {
    this.element = element;
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
    console.log("onselect", selection);
  }

  render() {
    const data = this.getItemsToRender();
  }
}
