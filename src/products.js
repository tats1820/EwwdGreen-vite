import getData from "./json";



const filter_tipo_prenda = document.getElementById("filter_tipo_prenda");
const filter_tipo_material = document.getElementById("filter_tipo_material");
const filter_tipo_seccion = document.getElementById("filter_tipo_seccion");
const filter_tipo_sexo = document.getElementById("filter_tipo_sexo");

filter_tipo_prenda.addEventListener("change", (e) => {filtrado()});
filter_tipo_material.addEventListener("change", (e) => {filtrado()});
filter_tipo_seccion.addEventListener("change", (e) => {filtrado()});
filter_tipo_sexo.addEventListener("change", (e) => {filtrado()});

function filtrado () {
let filtradoDeProductos = [...list];
const tipo_prenda = filter_tipo_prenda.value || "";
const tipo_material = filter_tipo_material.value || "";
const tipo_seccion = filter_tipo_seccion.value || "";
const tipo_sexo = filter_tipo_sexo.value || "";
productosDestacados.innerHTML = "";


let filtros = {};

if(tipo_prenda === "TIPO_PRENDA" || tipo_prenda === "Todo"){
    filtrado_productos
} else {
    filtros["tipo_prenda"] = tipo_prenda
}

if(tipo_prenda === "MATERIAL" || tipo_material === "Todo"){
    filtrado_productos
} else {
    filtros["material"] = tipo_material
}

if(tipo_seccion === "SECCION" || tipo_seccion === "Todo"){
    filtrado_productos
} else {
    filtros["seccion"] = tipo_seccion
}

if(tipo_sexo === "SEXO" || tipo_sexo === "Todo"){
    filtrado_productos
} else {
    filtros["sexo"] = tipo_sexo
}

const filtracion = filtradoDeProductos.filter(
    p => {
        return ((filtros['tipo_prenda']? p.tipo === filtros['tipo_prenda']: true) &&
                (filtros['material']? p.material === filtros['material']: true) &&
                (filtros['seccion']? p.coleccion === filtros['seccion']: true) &&
                (filtros['sexo']? p.sexo === filtros['sexo']: true)
        )
    }
)

mostrar(filtracion);
mostrar();
    
}



const productosDestacados = document.getElementById("productos_destacados");
//let filtrado_productos = productsList;

getData().then((a)=>{filtrado_productos = a
    mostrar(filtrado_productos)})

function mostrar(productsList) {
    productsList.forEach((producto) => {
        
        productosDestacados.innerHTML += 
        
        `<a href= '../singleProduct/singleProduct.html?id=${producto.num}' class="card_fil">
        <figure class= "card_figure"><img class= "card_img" src="${producto.imagenProducto}"></figure>
        <article class="card_article">
            <h2>${producto.item}</h2>
            <p>${producto.tipo}</p>
            <h3 class="texto_precio">${producto.precio}</h3>
            <h5> ${producto.material}</h5>
        </article>
    </a>
    
    
    `
    
    })
}
