const mongoose = require("mongoose");

const schema = mongoose.Schema;

const categorySchema = new schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema);