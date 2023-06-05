import '../components/firstComponent/style.css'
import {
    getProdcuts,
    addProduct,
    addProductWithId,
    logOut
} from '../firebase.js'

let products = []
await retrieveProducts()
renderProducts()

// const nameInput = document.getElementById('name-input')
// const precioInput = document.getElementById('precio-input')
// const urlInput = document.getElementById('url-input')
// const sexoInput = document.getElementById('sexo-input')
// const coleccionInput = document.getElementById('coleccion-input')
// const tipoInput = document.getElementById('tipo-input')
// const sobreModeloInput = document.getElementById('sobreModelo-input')
// const materialInput = document.getElementById('material-input')
const productForm = document.querySelector('.productForm');


const submitbtn = document.getElementById('submit-btn')
const logOutBtn = document.getElementById('log-out')

submitbtn.addEventListener('click', (e) => uploadProduct(e))
logOutBtn.addEventListener('click', () => logOut())

async function retrieveProducts() {
    products = await getProdcuts()
}

function renderProducts() {
    const container = document.querySelector('#products-container')

    container.innerHTML = ''

    products.forEach((product) => {
        const elem = document.createElement('div')
        elem.className = 'product'
        elem.innerHTML = `
    <h2>${product.item}</h2>
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

    // const newObj = {
    //     coleccion: coleccionInput.value,
    //     imagenProducto: urlInput.value,
    //     item: nameInput.value,
    //     material: materialInput.value,
    //     precio: precioInput.value,
    //     sexo: sexoInput.value,
    //     sobreModelo: sobreModelo.value,
    //     tipo: tipoInput.value,
    // }





    let id = "30";
    console.log('Subio producto', product)

    // await addProduct(newObj)
    await addProductWithId(product,id)
    await retrieveProducts()
    renderProducts()
}