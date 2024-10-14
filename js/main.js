import Cliente from '../js/Cliente.js'
import Cuenta from '../js/Cuenta.js'

document.addEventListener('DOMContentLoaded', () => {
    //1.0 Boton de registro de formulario
    const formRegistro = document.getElementById('form-registro')
        if(formRegistro){
            formRegistro.addEventListener('submit', function(event){
            //1.1 Evitar que el formulario se envie vacio
            event.preventDefault()

            //1.2 Recibir la informacion del formulario
             const userName = document.getElementById('first-name').value
            const lastName = document.getElementById('last-name').value
            const email = document.getElementById('inputEmail4').value
            const password = document.getElementById('inputPassword4').value
            const address = document.getElementById('inputAddress').value
            const userId = document.getElementById('id-user').value
            let typeAccount
            if(document.getElementById('flexRadio1').checked){
                typeAccount = 1 //1 para cuenta de ahorros
            }else if(document.getElementById('flexRadio2').checked){
                typeAccount = 2 //2 para cuenta corriente
            }

            //1.3 Instancia de la clase Cliente
            const cliente = new Cliente(userName, lastName, email, password, address, userId, typeAccount)
            cliente.saveNewUser()

            //1.4 Instancia de la clase Cuenta 
            const cuenta = new Cuenta()
            cuenta.saveNewAccount()

            //1.5 Volver a la pagina de login
            window.location.href="index.html"
        }) // fin submit
    } // fin iff
})