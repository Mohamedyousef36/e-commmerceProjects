import  Jwt  from "jsonwebtoken"
//generate token
export const createToken = (Id) => {

    Jwt.sign({
        id: Id

    }, process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_DATE })

}
    
  
export default createToken