const mongoose = require('mongoose');
require('dotenv').config();

// Institution Schema
const institutionSchema = new mongoose.Schema({
    name: String,
    code: String,
    createdAt: Date,
    __v: Number
});

const Institution = mongoose.model('Institution', institutionSchema);

async function createInstitution() {
    await mongoose.connect(process.env.MONGO_URI);

    const newInstitution = new Institution({
        name: "CodeBegun",
        code: "CB2025",
        createdAt: new Date("2025-03-27T15:26:04.440Z"),
        __v: 0
    });

    const savedInstitution = await newInstitution.save();

    console.log("✅ Institution Created Successfully:");
    console.log("Institution ID:", savedInstitution._id);

    mongoose.disconnect();
}

createInstitution().catch(console.error);
