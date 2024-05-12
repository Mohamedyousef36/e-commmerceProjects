 const sanitizeUser = (user) => {
    return ({
        _id:user._id,
        name:user.name,
        email: user.email,
        profileImage: user.profileImage,
        wishList: user.wishList
        
    })
}
export default sanitizeUser