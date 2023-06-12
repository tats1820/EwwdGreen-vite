import { addItem } from "../carrito.js";
import {
  getProdcuts,
  addCommentToProduct,
  listenForComments,
  deleteComment,
} from "../firebase.js";

const link = window.location.search;
const buscarPagina = new URLSearchParams(link);
const singleProduct = buscarPagina.get("id").replace('"', "");
const botonCarrito = document.getElementById("addCarrito");

traerProducto();

async function traerProducto() {
  let productos = await getProdcuts();
  const productoPorSeparado = productos.find(
    (data) => data.id == singleProduct
  );
  pintar(productoPorSeparado);

  const comments = listenForComments(singleProduct, displayComments);
  displayComments(comments);
}

function displayComments(comments) {
  const comentarioList = document.getElementById("comentario-list");
  const messageContainer = document.getElementById("message-container");
  comentarioList.innerHTML = "";

  if (comments && comments.length > 0) {
    comments.forEach((comment) => {
      const commentItem = document.createElement("div");

      let commentText = document.createElement("p");
      commentText.innerHTML = comment.comment;

      let imgProfile = document.createElement("img");
      imgProfile.setAttribute("src", comment.profileImg);
      imgProfile.classList.add("image-profile");

      let nameProfile = document.createElement("p");
      nameProfile.innerHTML = comment.profileName;
      nameProfile.classList.add("name-profile");

      commentItem.appendChild(commentText);
      commentItem.appendChild(nameProfile);

      commentItem.appendChild(imgProfile);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async () => {
        try {
          await deleteComment(singleProduct, comment.id);
          commentItem.remove();
          console.log("Comment deleted successfully");
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      });

      console.log(comment.id + " id");
      commentItem.appendChild(deleteButton);
      comentarioList.appendChild(commentItem);

      messageContainer.style.display = "none";
    });
  } else {
    messageContainer.style.display = "block";
  }
}

async function addComment() {
  console.log("addComment");
  const inputText = document.getElementById("comentario-input").value.trim();
  const errorMessage = document.getElementById("error-message");

  if (inputText === "") {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  await addCommentToProduct(singleProduct, inputText);
}

function pintar(productoPorSeparado) {
  const productosLink = document.getElementById("productos");
  productosLink.innerHTML = "";
  productosLink.innerHTML = `<section class="card_list">
      <figure class="card_figure"><img class="card_img" src="${productoPorSeparado.imagenProducto}"></figure>
      <article class="card_article">
          <h2 class="name_detail">${productoPorSeparado.item}</h2>
          <p class="descri_detail">${productoPorSeparado.sobreModelo}</p>
          <h5 class="price_detail">${productoPorSeparado.precio}</h5>
          <p class="collect_detail">Collection: ${productoPorSeparado.tipo}</p>
          
          <button id="addCarrito" class="button is-black button_añadir">Añadir</button>
  
          <h3>Comentarios</h3>

          <input type="text" id="comentario-input"></input>

         <button id="comentario-button">Enviar comentario</button>
          <div id="error-message" style="display: none; color: red;">Por favor ingrese un texto</div>
          <div id="comentario-list"></div>
          <div id="comentarioRobot-list"></div>
          <div id="message-container" style="display: block;">No hay comentarios</div>
      </article>
  </section>`;
  const commentButton = document.getElementById("comentario-button");
  commentButton.addEventListener("click", addComment);

  const addCarritoButton = document.getElementById("addCarrito");
  addCarritoButton.addEventListener("click", showOffcanvas);
}

function showOffcanvas() {
  const offcanvas = document.getElementById("offcanvas");
  offcanvas.style.display = "block";
  const showBlock = document.getElementById("offcanvas");
  showBlock.innerHTML = "";
  showBlock.innerHTML = `
  
  
  <div class="carrito-body">
            <h2>Here's your cart</h2>
            <p>Enjoy your purchase!</p>
            <img id="logoButton2" src="../public/images/images lacho/Car.png">
            <!-- Contenido del offcanvas -->
        </div>
  
  `;
  /* await addItem(); */
}
