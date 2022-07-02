const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser") // fetchUser is a middleware. in this middleware we will check wheather the user is a legit user by using 
// token. and we will add this middleware to the route where we want to check user authentication and then we will run next() function in it. which will
// will run the next middleware.Next is used to pass control to the next middleware function. If not the request will be left hanging or open.
const Note = require("../modules/notes")

// Route to add Notes
router.post("/addnote",      

    fetchUser,

    async (req, res) => {
        // creating a variable which will store success = true or false. we will use it in front end to show something accordingly.
        // like if note is added succesfully in db then we will send true else if there is some problem while adding then we will send false.
        let success=false;

        const { title, description, tag } = req.body
        try {
          
        // To add items in database you can use either .create() or .save() both of them work fine.

        // First method :
            // newNote = await Note.create({
            //     title: title,
            //     description: description,
            //     tag: tag,
            //     user: req.user.id
            // });
            // res.json(newNote)
        // Second method :
            newNote=  new Note({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id   // Here user will act as foreign key. because we have defined it as foreign key in notes Schema. 
                                    // req.user.id we receive this from fetchUser middleware.           
            })
            const savedNote= await newNote.save()
            // here we have added note succesfully. now we can make success = true
            success=true
            res.json({success,savedNote})


        } catch (err) {
            res.status(500).json({success})
            
        }
    }

)

// Route to get notes
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    let success=false;
    try {
        // req.user.id we receive this from fetchUser middleware. we will get all the notes of user whose user id is equal to req.user.id.
        const allNotes = await Note.find({ user: req.user.id })
        res.json(allNotes)
    } catch (err) {
        res.status(500).json({success})
    }

})

// Route to update notes

router.put("/updatenote/:id",fetchUser,async(req,res)=>{
    let success=false;
const {title,description,tag}=req.body;

const newNoteValue={};

if(title){newNoteValue.title=title}
if(title){newNoteValue.description=description}
if(title){newNoteValue.tag=tag}
// console.log("newNoteValue",newNoteValue)
try {
    

const note = await Note.findById(req.params.id);


if(!note){return res.status(404).send("Not Found")}

// console.log("note.user",note.user)
// console.log(typeof(note.user))


if(note.user.toString() !== req.user.id){
return res.status(401).send("Not Allowed")
}
// const updatedNote=  Note.findByIdAndUpdate(req.params.id,{$set:newNoteValue},(err, obj) => {
//     if (err) {
//         res.send(err);
//     }
//     else {
//        res.send(obj);

//     }})
const updatedNote= await Note.findByIdAndUpdate(req.params.id,{$set:newNoteValue},{new:true})
success=true;
res.json({success,updatedNote})
} 

catch (err) {
    res.status(500).json({success})
}
})

router.delete("/deletenote/:id",fetchUser,async(req,res)=>{
let success=false;
    try {
    

        const note = await Note.findById(req.params.id);
        
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
        }

        await Note.findByIdAndDelete(req.params.id)
        success=true;
        res.json({success})
        } catch (err) {
            res.status(500).json(success)
        }

})


module.exports = router
