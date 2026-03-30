import { aiResponseGenerator } from '../services/ai.service.js'

/**
 * @route GET api/game/ai-response
 * @description Fetches products from backend without min-price 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getResponseController(req, res, next) {
  try {
    const {messages,productId,userMessage} = req.body
    if(!userMessage || !productId) {
      return next({
        status: 400,
        message:"Invalid request !"
      })
    }
    const response = await aiResponseGenerator(messages, productId, userMessage)
    
    res.status(201).json({
      success:true,
      message:"Response Generated !",
      response
    })
  }catch(err){
    next(err)
  }

}