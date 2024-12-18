class Cuenta{
    //0.0 Constructor  de la clase cuenta 
    constructor(){
    }

    //1.0 Metodo para guardar un usuario
    saveNewAccount(email) {
        let oldUsers = JSON.parse(localStorage.getItem('user')) || []

        // Encuentra el usuario por el email
        const user = oldUsers.find(user => user.email === email)

        let number = oldUsers.length + 1000 
        user.numAccount = number
        user.money = 0 
        user.date = new Date()
        user.save = {   //Elemento para guardar movim del usuario
            amount: [],
            type: []
        }

        alert(`Cuenta registrada num cuenta: ${number}`)

        // Guarda vector en localStorage
        localStorage.setItem('user', JSON.stringify(oldUsers));
    }

    //2.0 Metodo para entrar a la app👍
    entryAtm(email, password){
        let oldUsers = JSON.parse(localStorage.getItem('user')) || []
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
    withdrawMoney(amountMoney, emailSaved, numAccount, discount) {
        let oldUsers = JSON.parse(localStorage.getItem('user'))
    
        // Encuentra el usuario y la cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)
    
        if (user===undefined) {
            alert('Número de cuenta incorrecto.')
        }else{
            // Realizo el retiro dependiendo de la cuenta
            if (user.typeAccount === 1) {                  // -------Cuenta ahorros
                if (user.money-amountMoney >= 0) {
                    user.money = user.money - amountMoney
                    user.save.type.push('Retiro')
                    user.save.amount.push(amountMoney)
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return amountMoney
                } else {
                    return undefined
                }
            } else if (user.typeAccount === 2) {           // -------Cuenta corriente
                if (user.money - amountMoney >= -discount) {
                    user.money =user.money - amountMoney
                    user.save.type.push('Retiro')
                    user.save.amount.push(amountMoney)
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return `<h5 style="color: #ee237b;">FACTURA</h5>
                            <p>Retiraste: $ ${amountMoney}</p>
                            <p>Nuevo saldo: ${user.money}</p>
                            <p>Cupo: ${discount}</p>`
                } else {

                    return '<h5style="color: #ee237b;">ALERTA</h5><p>No cuenta con suficiente saldo</p>'
                }
            } 
        }

        
    }

    //4.0 ------------------------Metodo para ingresar dinero-----------------------------------
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
                user.save.type.push('Deposito')
                user.save.amount.push(amountMoney)
                localStorage.setItem('user', JSON.stringify(oldUsers))
                return `<h5 style="color: #ee237b;">FACTURA</h5>
                        <p>Depositoe: $ ${amountMoney}</p>
                        <p>Nuevo saldo: ${user.money}</p>
                        `
            }else if(user.typeAccount === 2){  //----Cuenta corriente
                if(user.money + amountMoney <= 0){
                    user.money += amountMoney
                    user.save.type.push('Deposito')
                    user.save.amount.push(amountMoney)
                    localStorage.setItem('user', JSON.stringify(oldUsers))
                    return `<h5 style="color: #ee237b;">FACTURA</h5>
                            <p>Depositoe: $ ${amountMoney}</p>
                            <p>Nuevo saldo: ${user.money}</p>
                            `
                }else{
                    return `<h5 style="color: #ee237b;">EROR</h5>
                            Usted debe menos de ${amountMoney}`
                }
            }
        }
    }

    //5.0 ----------------------Metodo para mostrar transacciones -------------------------------
    transactions(emailSaved, numAccount){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
        
        //Encontra el usuario y el num cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)

        const number = user.save.type.length
        let transaction = ''
        for(let i=0; i<number; i++){
            transaction = transaction + `<p><b>${user.save.type[i]}:</b> cantidad $${user.save.amount[i]}</p><br>`
        }
        return transaction
    }

    //6.0 --------------------------- Metodo para mostrar saldo ---------------------------------
    money(emailSaved, numAccount){
        let oldUsers = JSON.parse(localStorage.getItem('user'))
        
        //Encontra el usuario y el num cuenta
        const user = oldUsers.find(user => user.email === emailSaved && user.numAccount === numAccount)
        let retorno
        if(!user){
            retorno = 'Numero de cuenta incorrecta'
        }else{
            retorno = `<h4 style="color: #ee237b;">Hola ${user.userName}</h4><ul style="list-style-type:disc;"><li>Saldo: $${user.money}</li></ul>`
        }
         return retorno
    }

}export default Cuenta

