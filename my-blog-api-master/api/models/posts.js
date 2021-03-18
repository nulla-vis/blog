const PATH = "./data.json";
const fs = require("fs"); //import fs library

class Post {

    get() {
        /* Get Post */
        return this.readData();
    }

    getIndividualBlog(postId){
        /* Get one Blog Post */
        const posts = this.readData();
        const foundPost = posts.find((post)=>post.id ==postId);
        return foundPost;

    }

    add(newPost) {
        /* Add new Post */
        const currentPost = this.readData(); //return JSON file
        currentPost.unshift(newPost) //add object to the front, append to the back
        this.storeData(currentPost); // if only this, it will overwrite the current data, se we ned to append/unshift, the code before this
    }

    readData() {
       let rawdata = fs.readFileSync(PATH);
       let posts = JSON.parse(rawdata);
       return posts;
    }

    storeData(rawdata) {
        let data = JSON.stringify(rawdata);
        fs.writeFileSync(PATH, data); //(the path, the data)
    }
}

//everytime import a module, that module has to be exported!

module.exports = Post;