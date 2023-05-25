// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });


// Configura tu proyecto de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAq2LKJ8F2eG1OmGkcuVLMVbkidjq8lDMg",
    authDomain: "perfil-999ac.firebaseapp.com",
    projectId: "perfil-999ac",
    storageBucket: "perfil-999ac.appspot.com",
    messagingSenderId: "1015608397607",
    appId: "1:1015608397607:web:1bac96c6d874be35302302"
  };
  
  // Obtiene una referencia al formulario de inicio de sesión
  var loginForm = document.getElementById("loginForm");
  
  // Agrega un listener al formulario de inicio de sesión
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    // Obtiene los valores de los campos de correo electrónico y contraseña
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Inicia sesión con Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(userCredential) {
        // Inicio de sesión exitoso
        var user = userCredential.user;
        console.log("Inicio de sesión exitoso:", user);
        // Aquí puedes redirigir al usuario a otra página o realizar otras acciones
      })
      .catch(function(error) {
        // Error en el inicio de sesión
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error en el inicio de sesión:", errorCode, errorMessage);
        // Aquí puedes mostrar un mensaje de error al usuario
      });
  });

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  