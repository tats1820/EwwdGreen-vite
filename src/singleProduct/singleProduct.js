import {
  getProdcuts
} from "../firebase.js";

const link = window.location.search;
const buscarPagina = new URLSearchParams(link);
const singleProduct = buscarPagina.get("id").replace('"', "");
const buttonComentario = document.getElementById("comentario-button");
const botonCarrito = document.getElementById("añadir");

traerProducto();

async function traerProducto() {
  let productos = await getProdcuts();
  console.log(productos);
  const productoPorSeparado = productos.find((data) => data.id == singleProduct);
  pintar(productoPorSeparado);
}

function pintar(productoPorSeparado) {
  const productosLink = document.getElementById("productos");
  productosLink.innerHTML = "";
  productosLink.innerHTML =
    `<section class="card_list">
      <figure class="card_figure"><img class="card_img" src="${productoPorSeparado.imagenProducto}"></figure>
      <article class="card_article">
          <h2 class="name_detail">${productoPorSeparado.item}</h2>
          <p class="descri_detail">${productoPorSeparado.sobreModelo}</p>
          <h5 class="price_detail">${productoPorSeparado.precio}</h5>
          <p class="collect_detail">Collection: ${productoPorSeparado.tipo}</p>
          
          <button id="añadir" class="button is-black button_añadir">Añadir</button>
  
          <h3>Comentarios</h3>
          <input type="text" id="comentario-input"></input>
          <button id="comentario-button" onclick="addTocomentarioArray()">Enviar comentario</button>
          <div id="error-message" style="display: none; color: red;">Por favor ingrese un texto</div>
          <div id="comentario-list"></div>
          <div id="comentarioRobot-list"></div>
          <div id="message-container" style="display: block;">No hay comentarios</div>
      </article>
  </section>`;
}

function addTocomentarioArray() {
  const inputText = document.getElementById("comentario-input").value.trim();
  document.getElementById("comentario-input").value = "";

  if (inputText === "") {
    document.getElementById("error-message").style.display = "block";
    return;
  }

  document.getElementById("error-message").style.display = "none";

  const currentProduct = productoPorSeparado;
  const comentarioArray = currentProduct.comentarioArray || [];

  comentarioArray.push(inputText);
  document.getElementById("message-container").style.display = "none";
  currentProduct.comentarioArray = comentarioArray;

  const outputList = document.getElementById("comentario-list");
  outputList.innerHTML = "";

  comentarioArray.forEach((item, i) => {
    const li = document.createElement("li");
    li.classList.add("comentario-item");

    const imgProfile = document.createElement("img");
    imgProfile.setAttribute(
      "src",
      "https://www.daysoftheyear.com/wp-content/uploads/international-cat-day1-scaled.jpg"
    );
    imgProfile.classList.add("image-profile");

    const nameProfile = document.createElement("p");
    nameProfile.innerHTML = "Lacho";
    nameProfile.classList.add("name-profile");

    const content = document.createElement("p");
    content.innerHTML = item;
    content.classList.add("comentario-content");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.onclick = () => deleteComment(i);
    deleteButton.classList.add("delete-button");

    li.appendChild(imgProfile);
    li.appendChild(nameProfile);
    li.appendChild(content);
    li.appendChild(deleteButton);

    outputList.appendChild(li);
  });
}

function deleteComment(index) {
  const currentProduct = productoPorSeparado;
  const comentarioArray = currentProduct.comentarioArray || [];
  comentarioArray.splice(index, 1);
  currentProduct.comentarioArray = comentarioArray;

  const outputList = document.getElementById("comentario-list");
  outputList.innerHTML = "";

  comentarioArray.forEach((item, i) => {
    const li = document.createElement("li");
    li.classList.add("comentario-item");

    const imgProfile = document.createElement("img");
    imgProfile.setAttribute(
      "src",
      "https://www.daysoftheyear.com/wp-content/uploads/international-cat-day1-scaled.jpg"
    );
    imgProfile.classList.add("image-profile");

    const nameProfile = document.createElement("p");
    nameProfile.innerHTML = "Lacho";
    nameProfile.classList.add("name-profile");

    const content = document.createElement("p");
    content.innerHTML = item;
    content.classList.add("comentario-content");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.onclick = () => deleteComment(i);
    deleteButton.classList.add("delete-button");

    li.appendChild(imgProfile);
    li.appendChild(nameProfile);
    li.appendChild(content);
    li.appendChild(deleteButton);

    outputList.appendChild(li);
  });

  if (comentarioArray.length === 0) {
    document.getElementById("message-container").style.display = "block";
  }
}

let commentPreDiv = document.createElement("div");
let commentList = "<ul>";

productoPorSeparado.comentarioArray.forEach((comment) => {
  if (productoPorSeparado.comentarioArray.length === 0) {
    // Do nothing
  } else {
    document.getElementById("message-container").style.display = "none";
    commentList += `
    <li class="comentarioRobotList">
      <img class="userRobotImg" src="${comment.profileUrl}" />
      <p class="userRobotName">${comment.name}</p>
      <p class="userRobotComment">${comment.comment}</p>
    </li>`;
  }
});

commentList += "</ul>";
commentPreDiv.innerHTML = commentList;
const comentarioRobot = document.getElementById("comentarioRobot-list");
comentarioRobot.appendChild(commentPreDiv);

const sizeSelector = document.getElementById("size-selector");

sizeSelector.addEventListener("change", function () {
  const selectedSize = sizeSelector.value;
  console.log("Selected size: " + selectedSize);
});
