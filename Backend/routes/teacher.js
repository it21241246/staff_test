const routerTeacher = require("express").Router();
const multer = require("multer");
let Teacher = require("../models/Teacher");

//store image
// const storage = multer.diskStorage({
//     destination: function(_req,_file, cb){
//         cb(null,path.join(__dirname, "../images"))
//     },
//     filename: function(_req,file,cb){
//         const timestamp =Date.now();
//         const ext = file.originalname.split(".").pop();
//         const filename=`${timestamp}-${file.originalname}`;
//         cb(null,filename);
//     }
// });
// const upload = (multer({storage:storage}).single("file"))

routerTeacher.route("/addT").post((req,res)=>{

    const name = req.body.name;
    const nic = Number(req.body.nic);
    const address = req.body.address;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const land = Number(req.body.land);
    const mobile = Number(req.body.mobile);
    const email = req.body.email;
    const subject = req.body.subject;
    const password = req.body.password;
    //const image = '/uploads/' + req.file.filename;


    const newTeacher = new Teacher({
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        subject,
        password,
        //image : file? file.filename :"",
    })

    newTeacher.save().then(()=>{
        res.json("Staff member added successfully!")
    }).catch((err)=>{
        console.log(err);
    })
})

routerTeacher.route("/T").get((req,res)=>{
    Teacher.find().then((teacher)=>{
        res.json(teacher)
    }).catch((err)=>{
        console.log(err)
    })
})


routerTeacher.route("/updateT/:id").put( async (req,res)=>{
    let userId = req.params.id;
    const {name,nic,address,age,gender,land,mobile,email,subject,password} = req.body;

    const updateTeacher = {
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        subject,
        password,
        //image: file ? file.filename : image ? image : "",
    }

    const update = await Teacher.findByIdAndUpdate(userId, updateTeacher)
    .then(()=>{
    res.status(200).send({status : "User updated successful!"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message})
})   
})


routerTeacher.route("/deleteT/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Teacher.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted successfully"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error in deleting!", user: update})
    })
})

routerTeacher.route("/getT/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Teacher.findByIdAndDelete(userId)
    .then((teacher)=>{
        res.status(200).send({status:"User feched successfully!",teacher})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error in fetching user",error :err.message})
    })
})

module.exports = routerTeacher;