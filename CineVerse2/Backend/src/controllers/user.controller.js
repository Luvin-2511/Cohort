/**
 * @route POST api/user/addFavorite
 * @description Lets user add a favorite
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addFavoriteController(req, res) {
  
  return res.status(200).json({
    success:true,
    message:"Movie added favorite !"
  })
}


module.exports = {
    addFavoriteController
}