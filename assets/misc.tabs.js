if (!customElements.get("ui-tabs")) {
  class Tabs extends HTMLElement {
    constructor() {
      super();
      this.index = 0;
      this.scrollRAF = null;
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.tabsGroup = this.querySelector("[ui-tabs='group']");
      this.tabsContent = this.tabsGroup.querySelectorAll("[ui-tabs='content']");
      this.tabsTrigger = this.querySelectorAll("[ui-tabs='trigger']");

      this.style.setProperty("--length", this.tabsTrigger.length);

      this.tabsTrigger.forEach((trigger, i) =>
        trigger.addEventListener("click", () => this.move(i))
      );

      this.tabsGroup.addEventListener("scroll", () => this.onScroll("left"));
    }

    move(i) {
      if (this.index === i) return;

      this.setIndex(i);
      this.setPosition();
      this.setState();
    }

    setPosition() {
      this.tabsGroup.scrollTo({
        left: this.tabsGroup.clientWidth * this.index * (1 | -this.isRTL()),
      });
    }

    setState() {
      this.tabsTrigger.forEach((trigger, i) =>
        trigger.setAttribute("data-active", String(i === this.index))
      );
    }

    setIndex(index) {
      const max = Math.max(0, this.tabsContent.length - 1);
      this.index = Math.min(Math.max(0, index), max);
      this.style.setProperty("--active-index", this.index);
    }

    isRTL() {
      return document.dir === "rtl";
    }

    onScroll() {
      if (this.scrollRAF) return;

      this.scrollRAF = requestAnimationFrame(() => {
        let newIndex = Math.abs(
          Math.round(
            this.tabsGroup.scrollLeft / Math.max(1, this.tabsGroup.clientWidth)
          )
        );
        const max = Math.max(0, this.tabsContent.length - 1);
        if (newIndex > max) newIndex = max;

        if (newIndex !== this.index) {
          this.setIndex(newIndex);
          this.setState();
        }
        this.scrollRAF = null;
      });
    }
  }

  customElements.define("ui-tabs", Tabs);
}
