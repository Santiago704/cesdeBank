import Cuenta from '../js/Cuenta.js'

class CuentaCorriente extends Cuenta{
    constructor(){
        super()
        this.discountAllowed
    }

    calculateDiscountAllowed(emailSaved, numAccount){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
    
        // Encuentra el usuario y la cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)

        let actualDate = new Date()
        let userDate = new Date(user.date)

        let diference = Math.floor((actualDate - userDate)/(1000 * 60 * 60 * 24 * 365.25))

        this.discountAllowed=(diference+1)*1000000
        return this.discountAllowed
    }    
}export default CuentaCorriente