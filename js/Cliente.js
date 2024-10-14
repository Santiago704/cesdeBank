
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
        if(oldUser){
            user =JSON.parse(oldUser)
        }else{
            user = []
        }
        user.push({ userName: this.userName, lastName: this.lastName, email: this.email, password: this.password, address: this.address, userId: this.userId, typeAccount: this.typeAccount })

        localStorage.setItem('user',JSON.stringify(user))
    }

    //4.0 Actualizar usuario

}export default Cliente