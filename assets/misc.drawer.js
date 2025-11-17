if (!customElements.get("ui-drawer")) {
  class Drawer extends HTMLElement {
    static observedAttributes = ["id", "default-open"];

    constructor() {
      super();
      this.isOpen = false;
      this.triggers = this.querySelectorAll(
        `[ui-drawer='trigger'][data-for='${this.getAttribute("id")}']`
      );
      this.content = this.querySelector("[ui-drawer='content']");
      this.content?.setAttribute("data-id", this.getAttribute("id"));
      this.content?.remove();
    }

    connectedCallback() {
      this.triggers.forEach((t) =>
        t.addEventListener("click", () =>
          this.toggle(t.dataset.state === "open")
        )
      );
      this.addEventListener(
        "keydown",
        (e) => e.key === "Escape" && this.toggle(false)
      );

      this.hasAttribute("default-open") && this.toggle(true);
    }

    toggle(state) {
      const body = document.body;
      const id = this.getAttribute("id");
      const overlayElement = `[ui-drawer="overlay"][data-for='${id}']`;

      this.isOpen = state ?? !this.isOpen;

      if (!this.isOpen) {
        const content = `[ui-drawer="content"][data-id='${id}']`;
        body.querySelector(content)?.setAttribute("data-state", "closed");

        setTimeout(() => body.querySelector(overlayElement)?.remove(), 300);
        setTimeout(() => body.querySelector(content)?.remove(), 500);

        return;
      }

      if (body.querySelector(overlayElement)) return;

      const overlay = document.createElement("div");
      overlay.setAttribute("ui-drawer", "overlay");
      overlay.dataset.for = id;
      overlay.addEventListener("click", () => this.toggle(false));

      body.append(overlay, this.content);
      this.content.setAttribute("data-state", "open");
    }
  }
  customElements.define("ui-drawer", Drawer);
}
