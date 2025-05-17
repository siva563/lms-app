const mongoose = require('mongoose');
const AssignmentBank = require('./models/AssignmentBank'); // adjust path to your model

const MONGO_URI = 'mongodb://localhost:27017/codebegun_lms'; // replace with yours
const TARGET_INSTITUTION_ID = '67e56e0c1472636677c80654'; // 🔁 Your real institutionId here

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', async () => {
    console.log('✅ Connected to MongoDB');

    try {
        const result = await AssignmentBank.updateMany(
            { institutionId: { $exists: false } }, // only those missing it
            { $set: { institutionId: TARGET_INSTITUTION_ID } }
        );

        console.log(`✅ Updated ${result.modifiedCount} assignment(s)`);
    } catch (err) {
        console.error('❌ Error updating assignments:', err);
    } finally {
        mongoose.connection.close();
    }
});
