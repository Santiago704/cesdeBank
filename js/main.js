import Cliente from '../js/Cliente.js'
import Cuenta from '../js/Cuenta.js'
import CuentaAhorros from '../js/CuentaAhorros.js'
import CuentaCorriente from '../js/CuentaCorriente.js'


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

            let oldUsers = JSON.parse(localStorage.getItem('user'))
            const user = oldUsers.find(user => user.email === savedEmail && user.numAccount === numAccount)
            
            //3.5 Instancia de la clase Cuenta y cuenta de ahorro
            if(user.typeAccount === 1){
                const cuentaAhorros = new CuentaAhorros()
                let withdrawMoney = cuentaAhorros.withdrawMoney(amountMoney, savedEmail, numAccount, 0)
                textArea.innerHTML = cuentaAhorros.calculateInterest(withdrawMoney, savedEmail, numAccount)
            }else if(user.typeAccount === 2){
                const cuentaCorriente = new CuentaCorriente()
                let discount = cuentaCorriente.calculateDiscountAllowed(savedEmail, numAccount)
                console.log(discount);
                textArea.innerHTML = cuentaCorriente.withdrawMoney(amountMoney, savedEmail, numAccount ,discount)
            }
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
            textArea.innerHTML = cuenta.depositeMoney(amountMoney, savedEmail, numAccount)

        })
    }

    /* ------------------------- 5.0 BOTON CONSULTAR MOVIMIENTOS -------------------------*/
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

    /* ------------------------- 6.0 BOTON CONSULTAR SALDO -------------------------*/
    const formConsultarSaldo = document.getElementById('form-consultar-saldo')
    if(formConsultarSaldo){
        formConsultarSaldo.addEventListener('submit', function(event){
            //6.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //6.2 Recupero email  y users del local storag
            const savedEmail = localStorage.getItem('emailSaved')

            //6.3 Recibe la informacion del formulario de retiro
            const numAccount = parseInt(document.getElementById('confirmar-cuenta4').value) 

            //6.4 Area de resultado 
            const textArea = document.getElementById('Textarea4')

            //6.5 Instancia de la clase Cuenta
            const cuenta = new Cuenta()
            textArea.innerHTML = cuenta.money(savedEmail, numAccount) 

        })
    }

    /* ------------------------- 7.0 ACTUALIZAR USUARIO -------------------------*/
    const formActualizar = document.getElementById('form-actualizar')
    if(formActualizar){
        formActualizar.addEventListener('submit', function(event){
            //7.1 Evita que el formulario se envie vacio
            event.preventDefault()

            //7.2 Recupero email  y users del local storag
            const savedEmail = localStorage.getItem('emailSaved')

            //7.3 Recibir la informacion del formulario
            const userName = document.getElementById('first-name').value
            const lastName = document.getElementById('last-name').value
            const password = document.getElementById('inputPassword4').value
            const address = document.getElementById('inputAddress').value
            
            //
            const cliente = new Cliente()
            cliente.updateUser(userName, lastName, password, address, savedEmail)

            //7.5 Volver a la pagina de login
            window.location.href="cajero1.html"
        })
    }
})

