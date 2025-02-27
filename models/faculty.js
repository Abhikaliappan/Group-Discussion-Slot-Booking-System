const mongoose = require("mongoose");
const facultySchema = new mongoose.Schema;(
{
    userId:{
        type:String,
        required : true,
    },
        firstName: {
        type:String,
        required : true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber:{
        typr: String,
        required: true,
    },
    department: {
        type:String,
        required : true,
    },
    designation:{
        type:String,
        required: true,

    },
    date: {
        type: String, 
        required: true,
    },
    timings:{
        type:Array,
        required:true,
    }
},
{
    timestamps : true,
});

const facultyModel = mongoose.model("faculties",facultySchema);
module.exports = facultyModel; 
