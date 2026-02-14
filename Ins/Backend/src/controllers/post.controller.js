const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')

const imageKit = ImageKit({
    privateKey:process.env.IMAGE_KIT
})

async function createPost(req,res){
    console.log(req.body)
    console.log(req.file)
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName : 'test'
    })

    res.send(file)
}

module.exports= {createPost}