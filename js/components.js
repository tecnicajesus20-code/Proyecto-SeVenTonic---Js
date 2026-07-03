class Btnprimario extends HTMLElement {
    constructor(){
        super();
        this.classList.add("btn-primary")
    }
}

customElements.define(
    "Btn-primario", Btnprimario
);