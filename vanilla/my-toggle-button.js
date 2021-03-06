const htmlStructure = `<div class='switch'><div class='slider round'></div></div>`;
const style = `<style>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
:host(.toggle-on) .slider {
  background-color: #2196f3;
}
:host(.toggle-on) .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>`;

const tmpl = document.createElement("template");
tmpl.innerHTML = `${style}${htmlStructure}`;

class MyToggleButton extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        this.addEventListener("click", () => {
            this.changeToggleButtonState();
        });

        this.onToggleButtonChange = new Event("toggleButtonChanged", {
            bubbles: true,
            composed: true,
        });
    }

    connectedCallback() {
        console.log("Connected callback");
        this.value = true;
        this.setAttribute("class", "toggle-on");
    }

    static get observedAttributes() {
        return ["checked"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(name, oldVal, newVal);
        this.changeToggleButtonState();
    }

    changeToggleButtonState() {
        this.value = !this.value;
        this.value ?
            this.setAttribute("class", "toggle-on") :
            this.removeAttribute("class");
        this.dispatchEvent(this.onToggleButtonChange);
    }

    disconnectedCallback() {
        console.log("Disconnected callback");
    }
}

customElements.define("my-toggle-button", MyToggleButton);