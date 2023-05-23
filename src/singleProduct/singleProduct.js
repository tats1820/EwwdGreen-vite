const link = window.location.search;
/* const buscarPagina = new URLSearchParams(link); */
const buscarPagina = new URLSearchParams(link);
const singleProduct = buscarPagina.get("id").replace('"', "");
const buttonComentario = document.getElementById("comentario-button");

/* const productoPorSeparado = productsList.find((object) => object.id == singleProduct) */

const productoPorSeparado = productsList.find(
  (data) => data.num == singleProduct
);

/////

function addTocomentarioArray() {
  // Obtener el texto de entrada del usuario
  const inputText = document.getElementById("comentario-input").value.trim();

  // Limpiar el campo de entrada del usuario
  document.getElementById("comentario-input").value = "";

  // Mostrar un mensaje de error si el usuario no ingresó nada
  if (inputText === "") {
    document.getElementById("error-message").style.display = "block";
    return;
  }

  // Ocultar el mensaje de error
  document.getElementById("error-message").style.display = "none";

  // Obtener el ID del producto actual y su lista de comentarios
  const currentId = singleProduct;
  const currentProduct = productsList.find((data) => data.num == currentId);
  const comentarioArray = currentProduct.comentarioArray || [];

  // Agregar el nuevo comentario a la lista de comentarios
  comentarioArray.push(inputText);
  document.getElementById("message-container").style.display = "none";
  currentProduct.comentarioArray = comentarioArray;

  // Mostrar todos los comentarios, incluido el nuevo
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
  let currentId = singleProduct;
  let currentProduct = productsList.find((data) => data.num == currentId);
  let comentarioArray = currentProduct.comentarioArray || [];
  comentarioArray.splice(index, 1);
  currentProduct.comentarioArray = comentarioArray;

  let outputList = document.getElementById("comentario-list");
  outputList.innerHTML = "";

  comentarioArray.forEach((item, i) => {
    let li = document.createElement("li");
    li.classList.add("comentario-item");

    let imgProfile = document.createElement("img");
    imgProfile.setAttribute(
      "src",
      "https://www.daysoftheyear.com/wp-content/uploads/international-cat-day1-scaled.jpg"
    );
    imgProfile.classList.add("image-profile");

    let nameProfile = document.createElement("p");
    nameProfile.innerHTML = "Lacho";
    nameProfile.classList.add("name-profile");

    let content = document.createElement("p");
    content.innerHTML = item;
    content.classList.add("comentario-content");

    let deleteButton = document.createElement("button");
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

const productosLink = document.getElementById("productos");
productosLink.innerHTML = "";
productosLink.innerHTML =
  /* productosLink.innerHTML +=  */
  `<section class="card_list">
    <figure class= "card_figure"><img class= "card_img" src="${productoPorSeparado.imagenProducto}"></figure>
    <article class="card_article">
        <h2 class="name_detail">${productoPorSeparado.item}</h2>
        <p class='descri_detail'>${productoPorSeparado.sobreModelo}</p>
        <h5 class="price_detail"> ${productoPorSeparado.precio}</h5>
        <p class="collect_detail">Collection: ${productoPorSeparado.tipo}</p>
        
        <button id="añadir" class="button is-black button_añadir">Añadir</button>

        <h3>Comentarios</h3>
        <input type="text" id="comentario-input"></input>
        <button id="comentario-button" onclick="addTocomentarioArray()">Enviar comentario</button>
        <div id="error-message" style="display: none; color: red;">Por favor ingrese un texto</div>
        <div id = "comentario-list">
        </div>
        <div id = "comentarioRobot-list"></div>
        <div id="message-container" style="display: block;">No hay comentarios</div>
    
        </article>
</section>`;

let commentPreDiv = document.createElement("div");
let commentList = "<ul>";
productoPorSeparado.comments.forEach((comment) => {
  if (productoPorSeparado.comments.length === 0) {
  } else {
    document.getElementById("message-container").style.display = "none";

    commentList += `
    <li class= "comentarioRobotList">
    <img class="userRobotImg" src="${comment.profileUrl}" />
      <p class= "userRobotName">${comment.name}</p>
      <p class= "userRobotComment">${comment.comment}</p>
    </li>
  `;
  }
});
commentList += "</ul>";
commentPreDiv.innerHTML = commentList;
const comentarioRobot = document.getElementById("comentarioRobot-list");
comentarioRobot.appendChild(commentPreDiv);



// get the size selector element
const sizeSelector = document.getElementById("size-selector");

// add an event listener to the size selector
sizeSelector.addEventListener("change", function () {
  // get the selected value
  const selectedSize = sizeSelector.value;

  // do something with the selected value
  console.log("Selected size: " + selectedSize);
});
