const express = require("express"); //take "express" data from node_module
const app = express();
const path = require('path');
const Post = require("./api/models/posts");
var multer = require('multer'); //search multer npm (this is for uploading files)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads');  //upload folder destination
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)  //filename so it wont become binary (machine language)
    }
  })
//${file.fieldname}-${Date.now()}${getExt(file.mimetype)}
const getExt = (mimeType) => {//specify what type of file it is can see in terminal
    switch(mimeType){
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
    }

} 
var upload = multer({ storage: storage })

const postsData = new Post();

/* const posts = [{
    "id": "1581461442206",
    "title": "This is a New Blog Post",
    "content": "this is the content!",
    "post_image": "upload/post-image-1581461442199.jpg",
    "added_date": "1581461442206"
}] */

app.use(express.json());//convert json to js object

app.use('/uploads',express.static('uploads'));

app.use((req,res,next)=>{ //set header so it allow the front-end to connect to back-end
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});

app.use('/uploads', express.static('uploads')); //to make upload folder (and all inside) are visible to other/ not private "publicly available"



//===========================================================endpoint list===========================================================
app.get("/api/posts",(req,res)=>{ // "/ - doang" = homepage  ---- this is GET request (app.get)\

    /* TEST AREA 

    const test = {
        "Test" : "tESTING",
    }

    postsData.add(test);
    */
    res.status(200).send(postsData.get());
});



app.get("/api/posts/:post_id",(req,res)=>{
    const postId = req.params.post_id; //to get the inputted post id then store it in the vpostId variable
    const foundPost = postsData.getIndividualBlog(postId);
    if(foundPost) {
        res.status(200).send(foundPost);
    }else {
        res.status(404).send("Not Found");
    }
    // console.log(postId);

})

app.post("/api/posts",upload.single('post-image'),(req,res)=>{ //upload.single is to specify which parameter/file we use
    // console.log(req.body);
    console.log("TEMPATNYA : ", req.file.path);
    const newPost = {
        "id" : `${Date.now()}`,
        "title" :req.body.title,
        "content" : req.body.content,
        "post_image" : `${req.file.destination}/${req.file.filename}`,
        // "post_image":req.file.path,
        "added_date": `${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send("OK"); //status 201 means something has been created
    // console.log(req.body);
    // res.send("ok")
})
app.listen(3000,()=>console.log("Listening on http://localhost:3000"));


//to launct app/server -> nodemon app.js (nodemon js file name);

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass