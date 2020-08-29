const router = require('express').Router();
const Post = require("../Model/Post");

/* get route here */
router.get("/getpost",async(req,res)=>{
    try {
        let post = await Post.find({}).sort({date:'-1'});
        res.status(201).json({post});
    } catch (err) {
        console.error(err);
        res.status(500).json("SERVER ERROR");
    }
});
/* post route here */
router.post('/addpost',async(req,res)=>{
    let {title , content} = req.body;   
    try {
        let newPost = new Post({
            title,
            content,
        });
        await newPost.save()
        return res.status(201).json({msg:"successfully post created"});
    } catch (err) {
        console.error(err);
        res.status(500).json("SERVER ERROR");
    }
});

/* put route here */
    router.put('/editpost/:id',async (req,res)=>{
          try {
            let updatePost = Post.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                content:req.body.content,
            },
                { new: true}
            );

            //save  or update into database
            await (await updatePost).save();
            return res.status(201).json({msg: " successfully update"});
          } catch (err) {
              console.error(err);
              res.status(500).json("SERVER ERROR")
          }
    });
/* delete route here */
router.delete('/deletepost/:id',async(req,res)=>{
    try {
        await Post.findByIdAndDelete({_id:req.params.id})
        return res.status(201).json({msg:"successfully deleted"})
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;

