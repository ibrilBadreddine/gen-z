if (!customElements.get("ui-special-offer")) {
  class SpecialOffer extends HTMLElement {
    static observedAttributes = ["id", "default-open"];

    constructor() {
      super();

      this.timeout = null;
      this.content = this.querySelector("[ui-special-offer='content']");
      this.trigger = this.querySelector("[ui-special-offer='close']");
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.trigger.addEventListener("click", () => this.close());
      this.addEventListener(
        "keydown",
        (e) => e.key === "Escape" && this.close()
      );

      this.timeout = setTimeout(() => this.close(), 10000);
    }

    close() {
      this.content.dataset.state = "closed";
      clearTimeout(this.timeout);
    }
  }
  customElements.define("ui-special-offer", SpecialOffer);
}
