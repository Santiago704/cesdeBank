import Cliente from './Cliente.js'

class Cuenta extends Cliente{
    //1.0 Constructor de la clase cuenta
    constructor(user, money){
        super(user, money)
    }

    //2.0 Metodos de la clase cuenta
    //2.1 Metodo ingreso a la cuenta
    ingreso(email, password){
        let retorno = false
        let amount= this.user.length
        for(let i=0; i<amount; i++){
            if(email===this.user[i].email && password===this.user[i].password){
                retorno=true
            }
        }
        return retorno
    }
    //2.1 Metodo para consultar saldo 


    //2.2 Metodo para realizar deposito
    realizarDeposito(moneyAdd){
        return this.money+moneyAdd
    }

    //2.3 Metodo para realizar retiros
    realizarRetiro(moneyReduce){
        return this.money-moneyReduce
    }

}export default Cuenta

