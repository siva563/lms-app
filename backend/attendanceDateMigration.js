const mongoose = require("mongoose");
const Attendance = require("./models/Attendance"); // ✅ adjust path if needed

// 🔧 Replace with your actual local MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/codebegun_lms";

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const records = await Attendance.find({});
        let updatedCount = 0;

        for (const record of records) {
            if (typeof record.date === "string") {
                const convertedDate = new Date(record.date);
                await Attendance.updateOne(
                    { _id: record._id },
                    { $set: { date: convertedDate } }
                );
                updatedCount++;
            }
        }

        console.log(`✅ Migration complete. ${updatedCount} records updated.`);
    } catch (err) {
        console.error("❌ Migration failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
})();
