console.log('HOla soy el carrito')
import { onAuthStateChanged } from "firebase/auth";
import { auth, getCarrito } from "./firebase.js";
/*Carrito*/
const carritoBody = document.getElementById('carrito-body');
// Obtener referencia al elemento del DOM que contiene la tabla del carrito
/* const listaCarrito = document.getElementById('lista-carrito'); */
const tbody = document.getElementById('carrito-body');
//const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let carritoLista = {}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    let userId = user.uid;
    const userCart = await getCarrito(userId);
    carritoLista = userCart;
    renderCart(userCart.products)
  } else {
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

function addcart (){
  carritoLista.push 
}

// Agregar evento al botón "Vaciar Carrito"
//vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Llamar a la función de renderizado para pintar el carrito

