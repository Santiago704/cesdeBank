class Cuenta{
    //0.0 Constructor  de la clase cuenta 
    constructor(){
    }

    //1.0 Metodo para guardar un usuario
    saveNewAccount(email) {
        let oldUsers = JSON.parse(localStorage.getItem('user'))

        // Encuentra el usuario por el email
        const user = oldUsers.find(user => user.email === email)

        let number = oldUsers.length + 1000; 
        user.numAccount = number;
        user.money = 0; 

        alert(`Cuenta registrada num cuenta: ${number}`)

        // Guarda vector en localStorage
        localStorage.setItem('user', JSON.stringify(oldUsers));
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

   //3.0 ---------------------Metodo para retiro de dinero--------------------------------
    withdrawMoney(amountMoney, emailSaved, numAccount) {
        let oldUsers = JSON.parse(localStorage.getItem('user'))
    
        // Encuentra el usuario y la cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)
    
        if (user===undefined) {
            alert('Número de cuenta incorrecto.')
        }else{
            // Realizo el retiro dependiendo de la cuenta
            if (user.typeAccount === 1) {                  // -------Cuenta ahorros
                if (user.money-amountMoney >= 0) {
                    user.money = user.money - amountMoney;
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return `Factura de retiro Retiraste: ${amountMoney}, nuevo saldo: ${user.money}`
                } else {
                    return 'Saldo insuficiente'
                }
            } else if (user.typeAccount === 2) {           // -------Cuenta corriente
                if (user.money - amountMoney >= -6000000) {
                    user.money =user.money - amountMoney
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return `Factura de retiro Retiraste: ${amountMoney}, nuevo saldo: ${user.money}`
                } else {

                    return 'no cuenta con suficiente saldo'
                }
            } 
        }

        
    }

    //4.0 Metodo para ingresar dinero
    depositeMoney(amountMoney, emailSaved, numAccount){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
        
        //Encontra el usuario y el num cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)

        if(user===undefined){
            alert('Numero nde cuenta incorrecto')
        }else{
            //Realiza deposito
            if(user.typeAccount === 1){    //----Cuenta ahorros
                user.money += amountMoney
                localStorage.setItem('user', JSON.stringify(oldUsers))
                return `Factura de deposito Monto: ${amountMoney}, nuevo saldo: ${user.money}`
            }else if(user.typeAccount === 2){  //----Cuenta corriente
                if(user.money + amountMoney <= 0){
                    user.money += amountMoney
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return `Factura de deposito Monto: ${amountMoney}, nuevo saldo: ${user.money}`
                }else{
                    return `Usted debe menos de ${amountMoney}`
                }
            }
        }


    }
}export default Cuenta

