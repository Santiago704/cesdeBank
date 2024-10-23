import Cuenta from '../js/Cuenta.js'

class CuentaAhorros extends Cuenta{
    constructor(){
        super()
        this.interestRate
        this.percentaje = 0.012
    }
    
    calculateInterest(withdrawMoney, emailSaved, numAccount){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
    
        // Encuentra el usuario y la cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)

        if(withdrawMoney){
            this.interestRate = withdrawMoney*this.percentaje
            user.money -= this.interestRate
            localStorage.setItem('user', JSON.stringify(oldUsers))
            return `<h5 style="color: #ee237b;">FACTURA</h5><p>Retiraste: $${withdrawMoney}</p><p>Interes: $${this.interestRate}</p> <p>nuevo saldo: $${user.money}</p>`
        }else{
            return `<h5style="color: #ee237b;">ALERTA</h5><p>No cuenta con suficiente saldo</p>`
        }
    }
    
}export default CuentaAhorros