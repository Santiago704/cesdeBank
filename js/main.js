import Cliente from '../js/Cliente.js'
let user = []
let money = []
user = JSON.parse(localStorage.getItem("usuario"))
/* -------------------------------------------------------------------------------
                               BOTON REGISTRARSE
----------------------------------------------------------------------------------- */
//1.0 Obtener el formulario de registro
/* const form = document.getElementById('form-registro')    */
let btnRegistro = document.getElementById("registrarse")
if(btnRegistro){
    btnRegistro.onclick=saveDate
}

function saveDate(){
    //1.0 Obtener los valores del formulario
    let nameUsr = document.getElementById("first-name").value
    let lastName = document.getElementById("last-name").value
    let address = document.getElementById("inputAddress").value
    let idUser = document.getElementById("id-user").value
    let email = document.getElementById("inputEmail4").value
    let password = document.getElementById("inputPassword4").value
    let tipoCuenta
    if(document.getElementById("flexRadio1").checked){
        tipoCuenta=1
    }else if(document.getElementById("flexRadio2").checked){
        tipoCuenta=2
    }

    //2.0 Instancia de la clase Cliente
    let cliente = new Cliente(user, money)

    //3.0 llamar el metodo de la clase Cliente
    cliente.agregarDatos(nameUsr, lastName, address, idUser, email, password, tipoCuenta)
    cliente.alertDato()
}

/* --------------------------------------------------------------------------------
                               BOTON INGRESAR
----------------------------------------------------------------------------------- */
import Cuenta from '../js/Cuenta.js'
//2.0 Obtener el   
let btnIngreso = document.getElementById("Ingresar")
if(btnIngreso){
    btnIngreso.onclick = ingresar
}

function ingresar(){
    //1.0 Obtener los valores del formulario
    let email = document.getElementById("InputEmail1").value
    let password = document.getElementById("InputPassword1").value

    //2.0 Instancia de la clase cuenta
    let cuenta = new Cuenta(user, money)

    //3.0 llamar los metodos de la clase Cuenta
    let opcion = cuenta.ingreso(email, password)
    if(opcion){
        window.location.href = "cajero1.html"
    }else{
        alert("No se ha registrado o digito incorrectamente correo o contraseña")
    }
}