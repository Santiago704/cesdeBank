class Cuenta{
    //0.0 Constructor  de la clase cuenta 
    constructor(){
    }

    //1.0 Metodo para guardar un usuario
    saveNewAccount(){
        let account
        let oldAccount = localStorage.getItem('account')
        if(oldAccount && oldAccount !== 'null'){
            account = JSON.parse(oldAccount)
        }else{
            account = []
        }
        let number = account.length+1000
        account.push({ numAccount: number, money: 0})
        alert(`Cuenta registrada correctamente, numero de cuenta: ${number}`)
        // Guarda el vector en local storage 
        localStorage.setItem('account',JSON.stringify(account))
    }

    //2.0 Metodo para entrar a la app👍
    entryAtm(email, password){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
        let number = oldUsers.length
        let retorno = false
        for(let i=0; i<number; i++){
            if(email===oldUsers[i].email && password===oldUsers[i].password){
                retorno = true
                break;
            }
        }
        return retorno
    }


   //3.0 Metodo para retiro de dinero
    withdrawMoney(amountMoney, emailSaved, numAccount) {
        let oldAccount = JSON.parse(localStorage.getItem('account'))
        let oldUsers = JSON.parse(localStorage.getItem('user'))
    
        // Encuentra el usuario y la cuenta
        const user = oldUsers.find(user => user.email === emailSaved)
        const account = oldAccount.find(account => account.numAccount === numAccount)
    
        if (account===null) {
            alert('Número de cuenta incorrecto.')
        }

        // Realizo el retiro dependiendo de la cuenta
        if (user.typeAccount === 1) {                  // -------Cuenta ahorros
            if (account.money-amountMoney >= 0) {
                account.money = account.money - amountMoney;
                localStorage.setItem('account', JSON.stringify(oldAccount))
                return `Factura de retiro Retiraste: ${amountMoney}, nuevo saldo: ${account.money}`
            } else {
                return 'Saldo insuficiente'
            }
        } else if (user.typeAccount === 2) {           // -------Cuenta corriente
            if (account.money - amountMoney >= -2000000) {
                account.money =account.money - amountMoney
                alert(`Retiro exitoso. Nuevo saldo: ${account.money}`)
                localStorage.setItem('account', JSON.stringify(oldAccount))
                return `Factura de retiro Retiraste: ${amountMoney}, nuevo saldo: ${account.money}`
            } else {

                return 'no cuenta con suficiente saldo'
            }
        } 
    }
}export default Cuenta

