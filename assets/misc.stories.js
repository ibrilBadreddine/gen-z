if (!customElements.get("ui-stories")) {
  class Stories extends HTMLElement {
    constructor() {
      super();

      this.isOpen = false;
      this.ESC_KEY = "Escape";
      this.DURATION = 5000;
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.triggers = this.querySelectorAll("[ui-stories='trigger']");
      this.content = this.querySelector("[ui-stories='content']");
      this.items = this.querySelector("[ui-stories='items']");
      this.bars = this.querySelector("[ui-stories='bars']");

      this.triggers.forEach((trigger) =>
        trigger.addEventListener("click", () => this.toggle())
      );
      this.addEventListener(
        "keydown",
        (e) => e.key === this.ESC_KEY && this.toggle(false)
      );
    }

    toggle(state) {
      this.isOpen = state ?? !this.isOpen;
      this.content.setAttribute("data-state", this.isOpen ? "open" : "closed");
    }
  }

  customElements.define("ui-stories", Stories);
}
