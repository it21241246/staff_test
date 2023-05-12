const router = require("express").Router();
let Staff = require("../models/Staff");
const PDFDocument = require("pdfkit-table");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const nic = req.body.nic;
    const address = req.body.address;
    const age = req.body.age;
    const gender = req.body.gender;
    const land = req.body.land;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const category = req.body.category;

    const newStaff = new Staff({
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        category,
    })

    newStaff.save().then(()=>{
        res.json("Staff member added successfully!")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/get").get((req,res)=>{
    Staff.find().then((staff)=>{
        res.json(staff)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put( async (req,res)=>{
    let userId = req.params.id;
    const {name,nic,address,age,gender,land,mobile,email,category} = req.body;

    const updateStaff = {
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        category,
    }

    const update = await Staff.findByIdAndUpdate(userId, updateStaff)
    .then(()=>{
    res.status(200).send({status : "User updated successful!"})
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message})
})   
})


router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Staff.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted successfully"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error in deleting!", user: update})
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    await Staff.findById(userId)
    .then((staff)=>{
        res.status(200).send({status:"User feched successfully!",staff})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error in fetching user",error :err.message})
    })
})

router.get("/reportstaff", async (_req, res, next) => {
    try {
      const staff = await Staff.find({}).sort({ CreatedAt: -1 });
      // start pdf document
      let doc = new PDFDocument({ margin: 30, size: "A4" });
  
  
      // -----------------------------------------------------------------------------------------------------
      // Simple Table with Array
      // -----------------------------------------------------------------------------------------------------
      if (!staff.length) {
        const error = new Error("No added staff members");
        error.status = 404;
        throw error;
      }
      const headers = [
        "Name",
        "NIC",
        "Address",
        "Age",
        "Gender",
        "Mobile number",
        "Land Number",
        "Email",
        "Category",
      ];
      const rows = [];
      staff.map((s) => {
        rows.push([
          s.name,
          s.nic,
          s.address,
          s.age,
          s.gender,
          s.mobile,
          s.land,
          s.email,
          s.category,
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



