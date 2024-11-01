
class Cliente{
    //1.0 Constructor de la clase cliente
    constructor(userName, lastName, email, password, address, userId, typeAccount){
       this.userName=userName
       this.lastName=lastName
       this.email=email
       this.password=password
       this.address=address
       this.userId=userId
       this.typeAccount=typeAccount
    }

    //2.0 Metodo para agregar un usuario
    saveNewUser(){
        let user
        let oldUser = localStorage.getItem('user') // vector con datos antiguos
        if(oldUser && oldUser !== null){
            user =JSON.parse(oldUser)
        }else{
            user = []
        }
        user.push({ userName: this.userName, lastName: this.lastName, email: this.email, password: this.password, address: this.address, userId: this.userId, typeAccount: this.typeAccount })

        localStorage.setItem('user',JSON.stringify(user))
    }

    //3.0 Actualizar usuario
    updateUser(userName, lastName, password, address, email){
        let oldUser = JSON.parse(localStorage.getItem('user'))
        const user = oldUser.find(user => user.email === email)

        if(userName){
            user.userName = userName
        }
        if(lastName){
            user.lastName = lastName
        }
        if(password){
            user.password = password
        }
        if(address){
            user.address = address
        }

        localStorage.setItem('user', JSON.stringify(oldUser))
    }

}export default Cliente