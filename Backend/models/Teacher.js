const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema ({

    name : {
        type : String,
        required :true
    },

    nic : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },
    
    age : {
        type : String,
        required :true
    },

    gender : {
        type : String,
        required : true
    },

    land : {
        type :String,
        requred : true
    },

    mobile : {
        type : String,
        required : true
    },

    email :{
        type : String,
        required : true
    },

    subject : {
        type : String,
        required : true
    },

    password: {
        type : String,
        required : true
    }

    // image:{
    //     type : String,
    //     required :false
    //}
})

const Teacher =  mongoose.model("teachers",teacherSchema);
module.exports = Teacher;