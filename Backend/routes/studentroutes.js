const router = require("express").Router();
let Student = require("../models/Student");
const PDFDocument = require("pdfkit-table");


// router.post("/add", async (req, res, next) => {
   
//         const { name,address,dob,gender,mobile,email,password} = req.body;
        
//     try {

//         // check if inventory already exists
//         const studentexits = await Student.findOne({ email });
//         if (studentexits) {
//           const error = new Error("Student already exists");
//           error.status = 404;
//           throw error;
//         }
  
//         let student = new Student({
//             name,
//             address,
//             dob,
//             gender,
//             mobile,
//             email,
//             password });

//         await student.save();
//         return res.status(200).send("student added successfully");
//       }
//         catch (err) {
//       console.error(err.message);
//       next(err);
//     }
//   });
  






router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const address = req.body.address;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const password = req.body.password;

    const newStudent = new Student({
        name,
        address,
        dob,
        gender,
        mobile,
        email,
        password,
    })

    newStudent.save().then(()=>{
        res.json("Student member added successfully!")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/").get((req,res)=>{
    Student.find().then((Student)=>{
        res.json(Student)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put( async (req,res)=>{
    let userId = req.params.id;
    const {name,address,dob,gender,mobile,email,password} = req.body;

    const updateStudent = {
        name,
        address,
        dob,
        gender,
        mobile,
        email,
        password,
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(()=>{
    res.status(200).send({status : "User updated successful!"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message})
})   
})


router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted successfully"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error in deleting!", user: update})
    })
})




router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
   
    await Student.find(userId)
    .then((student)=>{
        res.status(200).send({status:"User feched successfully!",student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error in fetching user",error :err.message})
    })
})


router.get("/search", (req, res) => {
    const searchQuery = req.query.name;
    Student.find({ name: new RegExp(searchQuery, "i") }, (err, student) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error retrieving students");
      }
      res.json(student);
    });
  });



  router.get("/report", async (_req, res, next) => {
    try {
      const students = await Student.find({}).sort({ CreatedAt: -1 });
      // start pdf document
      let doc = new PDFDocument({ margin: 30, size: "A4" });
  
  
      // -----------------------------------------------------------------------------------------------------
      // Simple Table with Array
      // -----------------------------------------------------------------------------------------------------
      if (!students.length) {
        const error = new Error("No Inventoris exists");
        error.status = 404;
        throw error;
      }
      const headers = [
        "Name",
        "Quantity",
        "Init Qty Different",
        "Price",
        "Purchase Date",
      ];
      const rows = [];
      students.map((i) => {
        rows.push([
          i.name,
          i.email,
          i.dob,
          i.mobile,
          i.address
        ]);
      });
      const tableArray = {
        headers: headers,
        rows: rows,
      };
      doc.table(tableArray, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (_row, indexColumn, indexRow, rectRow) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 &&
            doc.addBackground(rectRow, indexRow % 2 ? "blue" : "green", 0.15);
        },
      });
      // create a buffer from the PDF document
    let chunks = [];
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      const pdfBlob = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="myfile.pdf"');
      res.send(pdfBlob);
    });
  
  
      // done
      doc.end();
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  });
 

  

module.exports = router;



