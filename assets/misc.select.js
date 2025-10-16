if (!customElements.get("ui-select")) {
  class Select extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.input = this.querySelector("[ui-select='input']");
      this.clearButton = this.querySelector("[ui-select='clear']");
      this.options = this.querySelectorAll("[ui-select='options'] label");

      this.style.setProperty(
        "--select-height",
        this.getBoundingClientRect().height + "px"
      );

      this.input.addEventListener("input", (e) => {
        this.filter(e.currentTarget.value);
      });

      this.clearButton.addEventListener("click", () => {
        (this.input.value = ""), this.filter("");
      });
    }

    filter(searchValue) {
      this.options.forEach((opt) => {
        const isMatched = opt.textContent.toLowerCase().includes(searchValue);

        !isMatched
          ? opt.setAttribute("hidden", "")
          : opt.removeAttribute("hidden");
      });
    }
  }

  customElements.define("ui-select", Select);
}
