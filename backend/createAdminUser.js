const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    passwordHash: String,
    role: String,
    institutionId: mongoose.Schema.Types.ObjectId,
    assignedSubjects: [String],
    createdAt: Date,
    __v: Number
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
    await mongoose.connect(process.env.MONGO_URI);

    // const adminUser = new User({
    //     name: "Super Admin",
    //     email: "admin@codebegun.com",
    //     mobile: "9999999999",
    //     passwordHash: "$2b$10$J/bHPcps/A2RxUz71oDzU.gcuHWVN2NXUkj.FLBZhA0WNFsNskeha",
    //     role: "superadmin",
    //     institutionId: "67f1502525cadd85837fd461",
    //     assignedSubjects: [],
    //     createdAt: new Date("2025-03-27T15:26:04.513Z"),
    //     __v: 0
    // });

      const adminUser = new User({
        name: "Super Admin",
        email: "admin1@codebegun.com",
        mobile: "9999999899",
        passwordHash: "$2a$12$CCIWuLdhJAqj9.6RDWf82Ok5Zlr9Ji4XTsCUcbXIedAk2BjTcIXxO",
        role: "superadmin",
        institutionId: "67f1502525cadd85837fd461",
        assignedSubjects: [],
        createdAt: new Date("2025-03-27T15:26:04.513Z"),
        __v: 0
    });



    await adminUser.save();
    console.log("✅ Super Admin Created");
    mongoose.disconnect();
}

createAdminUser().catch(console.error);
