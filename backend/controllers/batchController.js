const Batch = require("../models/Batch");

exports.createBatch = async (req, res) => {
    try {
        const {
            name,
            startDate,
            endDate,
            courseId,
            batchSize,
            price,
            type
        } = req.body;

        const institutionId = req.user.institutionId;
        const createdBy = req.user.userId;

        const batch = await Batch.create({
            name,
            startDate,
            endDate,
            courseId,
            batchSize,
            price,
            type,
            institutionId,
            createdBy
        });

        res.status(201).json({ message: "Batch created successfully", batch });
    } catch (err) {
        console.error("❌ Error creating batch:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.getBatches = async (req, res) => {
//     try {
//         const institutionId = req.user.institutionId;

//         const batches = await Batch.find({ institutionId })
//             .populate("courseId", "title") // assuming Course has a title
//             .sort({ createdAt: -1 });

//         res.json(batches);
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

exports.getBatches = async (req, res) => {
    try {
        const institutionId = req.user.institutionId;

        const batches = await Batch.find({ institutionId })
            .populate("courseId", "name") // <-- fixed here
            .sort({ createdAt: -1 });

        res.json(batches);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getBatchById = async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id).populate("courseId", "title");
        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.json(batch);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.json({ message: "Batch updated", batch });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteBatch = async (req, res) => {
    try {
        const batch = await Batch.findByIdAndDelete(req.params.id);
        if (!batch) return res.status(404).json({ message: "Batch not found" });
        res.json({ message: "Batch deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
