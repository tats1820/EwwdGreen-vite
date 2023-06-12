console.log('HOla soy el carrito')
import { onAuthStateChanged } from "firebase/auth";
import { render } from "sass";
import { addCart, auth, getCarrito } from "./firebase.js";
/*Carrito*/
const carritoBody = document.getElementById('carrito-body');
// Obtener referencia al elemento del DOM que contiene la tabla del carrito
/* const listaCarrito = document.getElementById('lista-carrito'); */
const tbody = document.getElementById('carrito-body');
//const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let carritoLista = {}
let userID = ''
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userID = user.uid;
    const userCart = await getCarrito(userID);
    carritoLista = userCart;
    renderCart(userCart.products)
    addEventListener(click, addcart)
    addEventListener(vaciar)
  } else {
addEventListener(alert('registrate o inicia sesion'))
  }
});


// Función para renderizar los productos en el carrito
function renderCart(carritoUser) {

  // Limpiar el contenido existente del tbody
  tbody.innerHTML = '';

  // Recorrer los productos y crear las filas correspondientes en el tbody
  carritoUser.forEach((product) => {
    const row = document.createElement('tr');

    // Crear y configurar las celdas de la fila con los datos del producto
   /*  const imageCell = document.createElement('td'); */
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');

   /*  imageCell.innerHTML = `<img src="${product.imagen}" alt="${product.name}" width="50" height="50">`; */
    nameCell.textContent = product.name;
    priceCell.textContent = product.precio;

    // Añadir las celdas a la fila
    row.appendChild(imageCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);

    // Añadir la fila al tbody
    tbody.appendChild(row);
  });
}

// Función para vaciar el carrito
function vaciarCarrito() {
  // Vaciar el arreglo de productos
  carritoLista = [];

  // Limpiar el contenido del tbody
  tbody.innerHTML = '';
}

async function addItem (){
  const link = window.location.search;
  const buscarPagina = new URLSearchParams(link);
  const singleProduct = buscarPagina.get("id").replace('"', "");

    let productos = await getProdcuts();
      const productoPorSeparado = productos.find((data) => data.id == singleProduct);
    carritoLista.products.push (productoPorSeparado)
  
 addCart(carritoLista, userID)
 renderCart(carritoLista.products)
}

// Agregar evento al botón "Vaciar Carrito"
//vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Llamar a la función de renderizado para pintar el carrito

