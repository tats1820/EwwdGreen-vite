import '../global.css'
import { createUser } from '../firebase.js'

const buttonSignIn = document.querySelector('#button-sign-in')
buttonSignIn.addEventListener('click', (e) => signUp(e))

async function signUp(e) {
    e.preventDefault()
    const email = document.getElementById('email-input').value
    const pass = document.getElementById('pass-input').value
    const confPass = document.getElementById('confirm-pass-input').value
    const image = document.getElementById('profile-img').files[0]
    const username = document.getElementById('username-input').value

    if (pass !== confPass) alert('Las contraseñas no coinciden')
    else {
        const userCreated = await createUser(email, pass, username, image)
        if (userCreated.status) {
            alert('usuario creado con exito, uid: ' + userCreated.info)
            window.location.href ="../index.html"
        } else {
            alert(userCreated.info)
        }

    }

}