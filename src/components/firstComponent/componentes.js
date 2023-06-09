import { getProdcuts } from "../../firebase.js";
import getData from "../../json.js"   

let list = [];


class firstComponent extends HTMLElement {
    static get observedAttributes(){
        return['class']
    }
    constructor(){
        super();
        
        this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.printData();
    }
    attributeChangeCallback(propName, oldValue, newValue){
        this[propName] = newValue;
        this.printData();
        
}


render(){
    this.shadowRoot.style = "display: flex; flex-direction: row; flex-wrap: wrap;"
    this.shadowRoot.innerHTML =`
    <link rel="stylesheet" href="../components/firstComponent/style.css">
 `;
 
    list.forEach((item)=>{

        this.shadowRoot.innerHTML +=`  
        <a href= '../singleProduct/singleProduct.html?id=${item.id}' class="card_fil">          
        <div class="container">
    
    <div class="card">
        <div class="card-image">
            <img src="${item.imagenProducto}">
        </div>
        <div class="card-content">
            <h3>${item.item}</h3>
            <p>${item.precio} COP</p>
            <p>${item.coleccion}</p>
            <button class="add-to-cart">
                Add To Cart
            </button>
        </div>
    </div> 
    </a>
        `;
    })
}

    async printData () {

    list = await getProdcuts()
    this.render()
    
}


}
customElements.define("app-header", firstComponent);
export default firstComponent;


