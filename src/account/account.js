$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

// Configura tu proyecto de Firebase
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_BUCKET.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  
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
  