
class Cliente{
    //1.0 Constructor de la clase cliente
    constructor(user, money){
       this.user=user
       this.money=money
    }

    //2.0 Metodo para llenar el vector de usuarios
    agregarDatos(name, lastName, address, idUser, email, password, tipoCuenta){
        let nuevoUsuario ={name, lastName, address, idUser, email, password, tipoCuenta, numCuenta: this.user.length+1}
        this.user.push(nuevoUsuario)
        this.money.push(0)
        localStorage.setItem("usuario", JSON.stringify(this.user))
        /* console.log(this.user);  */
    }

    //Falta corrregir
    alertDato(){
        alert(`Hola ${this.user[this.user.length-1].name} registro correcto con numero de cuenta ${this.user[this.user.length-1].numCuenta}`)
    }

}export default Cliente