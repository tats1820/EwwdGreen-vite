import '../components/firstComponent/style.css'
import {
    v4 as uuidv4
} from 'uuid';
import {
    getProductsAdded,
    addProduct,
    addProductWithId,
    logOut
} from '../firebase.js'

let products = []
await retrieveProducts()
renderProducts()

const productForm = document.querySelector('.productForm');
const submitbtn = document.getElementById('submit-btn')
const logOutBtn = document.getElementById('log-out')

submitbtn.addEventListener('click', (e) => uploadProduct(e))
logOutBtn.addEventListener('click', () => logOut())

async function retrieveProducts() {
    products = await getProductsAdded()
}

function renderProducts() {
    const container = document.querySelector('#products-container')

    container.innerHTML = ''

    products.forEach((product) => {

        const elem = document.createElement('div')
        elem.className = 'product'
        elem.innerHTML = `
    <h2>${product.item}</h2>
    <p>${product.material}</p>
    <p>${product.sexo}</p>
    <p>${product.precio}</p>
    <p>${product.tipo}</p>
    <p>${product.sobreModelo}</p>
    <h1>${product.coleccion}</h1>
    <img src="${product.imagenProducto}" alt="${'reference Image for '+ product.name}" />    
    `
        container.append(elem)
    })
}


async function uploadProduct(e) {
    // const file = productForm.img.files[0]
    e.preventDefault()

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

    console.log('Subio producto', product)

    // await addProduct(newObj)
    await addProductWithId(product, id)
    await retrieveProducts()
    renderProducts()
}