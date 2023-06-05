import '../components/firstComponent/style.css'
import { v4 as uuidv4 } from 'uuid';
import { getProductsAdded, addProduct, addProductWithId, logOut } from '../firebase.js';

let products = [];
await retrieveProducts();
renderProducts();

const productForm = document.querySelector('.productForm');
const submitbtn = document.getElementById('submit-btn');
const logOutBtn = document.getElementById('log-out');

submitbtn.addEventListener('click', (e) => uploadProduct(e));
logOutBtn.addEventListener('click', () => logOut());

async function retrieveProducts() {
  products = await getProductsAdded();
}

function renderProducts() {
  const container = document.querySelector('#products-container');

  container.innerHTML = '';

  products.forEach((product) => {
    const elem = document.createElement('div');
    elem.className = 'card';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'card-image';

    const image = document.createElement('img');
    image.src = product.imagenProducto;
    image.alt = 'reference Image for ' + product.name;

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.textContent = product.item;

    const material = document.createElement('p');
    material.textContent = product.material;


    let id = uuidv4();
    const sexo = document.createElement('p');
    sexo.textContent = product.sexo;

    const precio = document.createElement('p');
    precio.textContent = product.precio;

    const tipo = document.createElement('p');
    tipo.textContent = product.tipo;

    const sobreModelo = document.createElement('p');
    sobreModelo.textContent = product.sobreModelo;

    const coleccion = document.createElement('h1');
    coleccion.textContent = product.coleccion;

    const button = document.createElement('button');
    button.textContent = 'Ver detalles';

    imageContainer.appendChild(image);
    content.appendChild(title);
    content.appendChild(material);
    content.appendChild(sexo);
    content.appendChild(precio);
    content.appendChild(tipo);
    content.appendChild(sobreModelo);
    content.appendChild(coleccion);
    content.appendChild(button);

    elem.appendChild(imageContainer);
    elem.appendChild(content);

    container.appendChild(elem);
  });
}


async function uploadProduct(e) {
  e.preventDefault();

  const product = {
    coleccion: productForm.coleccion.value,
    imagenProducto: productForm.url.value,
    item: productForm.name.value,
    material: productForm.material.value,
    sexo: productForm.sexo.value,
    precio: productForm.precio.value,
    sobreModelo: productForm.sobreModelo.value,
    tipo: productForm.tipo.value,
  };

  let id = uuidv4();

  console.log('Subio producto', product);

  await addProductWithId(product, id);
  await retrieveProducts();
  renderProducts();
}
