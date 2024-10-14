class Cuenta{
    constructor(){}

    saveNewAccount(){
        let account
        let oldAccount = localStorage.getItem('account')
        if(oldAccount){
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
}export default Cuenta

