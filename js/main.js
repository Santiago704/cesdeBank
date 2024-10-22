import Cliente from '../js/Cliente.js'
import Cuenta from '../js/Cuenta.js'

document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------- 1.0 Boton de registro de formulario --------------------------*/
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
            cuenta.saveNewAccount(email)

            //1.5 Volver a la pagina de login
            window.location.href="index.html"
        }) // fin submit
    } // fin iff

    /* -------------------------- 2.0 Boton de ingreso al cajero --------------------------*/
    const formIngreso = document.getElementById('form-ingreso')
    if(formIngreso){
        formIngreso.addEventListener('submit', function(event){
            //2.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //2.2 Recibir la info del formulario de ingreso
            const email = document.getElementById('InputEmail1').value
            const password = document.getElementById('InputPassword1').value

            //2.3 Instacia de la clase Cuenta
            const cuenta = new Cuenta()
            if(cuenta.entryAtm(email, password)){
                window.location.href="cajero1.html"
                localStorage.setItem('emailSaved', email)
            }else{
                alert('Usted ha digitado mal o no se encuentra registrado😣')
            }
            
        })
    } // fin

    /* ---------------------------- 3.0 Boton de retiro ----------------------------*/
    const formRetiro = document.getElementById('form-retirar')
    if(formRetiro){
        formRetiro.addEventListener('submit', function(event){
            //3.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //3.2 Recupero email  y users del local storag
            const savedEmail = localStorage.getItem('emailSaved')

            //3.3 Recibe la informacion del formulario de retiro
            const amountMoney = parseFloat(document.getElementById('dinero-retiro').value)
            const numAccount = parseInt(document.getElementById('confirmar-cuenta').value)

            //3.4 Area de resultado 
            const textArea = document.getElementById('Textarea2')

            //3.5 Instancia de la clase Cuenta
            const cuenta = new Cuenta()
            textArea.value = cuenta.withdrawMoney(amountMoney, savedEmail, numAccount)

        })
    }

    /* ---------------------------- 4.0 BOTON INGRESO DINERO ----------------------------*/
    const formConsignar = document.getElementById('form-consignar')
    if(formConsignar){
        formConsignar.addEventListener('submit', function(event){
            //4.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //4.2 Recupero email  y users del local storag
            const savedEmail = localStorage.getItem('emailSaved')

            //4.3 Recibe la informacion del formulario de retiro
            const amountMoney = parseFloat(document.getElementById('dinero-consignacion').value)
            const numAccount = parseInt(document.getElementById('confirmar-cuenta2').value) 

            /* const user =  */
            //4.4 Area de resultado 
            const textArea = document.getElementById('Textarea1')

            //4.5 Instancia de la clase Cuenta
            const cuenta = new Cuenta()
            textArea.value = cuenta.depositeMoney(amountMoney, savedEmail, numAccount)

        })
    }

    /* ---------------------------- 5.0 BOTON INGRESO DINERO ----------------------------*/
    const formConsultar = document.getElementById('form-consultar')
    if(formConsultar){
        formConsultar.addEventListener('submit', function(event){
            //5.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //5.2 Recupero email  y users del local storag
            const savedEmail = localStorage.getItem('emailSaved')

            //5.3 Recibe la informacion del formulario de retiro
            const numAccount = parseInt(document.getElementById('confirmar-cuenta3').value) 

            //5.4 Area de resultado 
            const textArea = document.getElementById('Textarea3')

            //5.5 Instancia de la clase Cuenta
            const cuenta = new Cuenta()
           textArea.innerHTML = cuenta.transactions(savedEmail, numAccount)

        })
    }
})

