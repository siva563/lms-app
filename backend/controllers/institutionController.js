const Institution = require("../models/Institution");

// Create Institution
exports.createInstitution = async (req, res) => {
    try {
        const { name, code, logoUrl } = req.body;

        const exists = await Institution.findOne({ code });
        if (exists) return res.status(400).json({ message: "Institution code already exists" });

        const newInstitution = await Institution.create({ name, code, logoUrl });
        res.status(201).json({ message: "Institution created", institution: newInstitution });
    } catch (err) {
        console.error("Create Institution:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Institutions
exports.getInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.find().sort({ createdAt: -1 });
        res.json(institutions);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get One
exports.getInstitutionById = async (req, res) => {
    try {
        const institution = await Institution.findById(req.params.id);
        if (!institution) return res.status(404).json({ message: "Not found" });
        res.json(institution);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update
exports.updateInstitution = async (req, res) => {
    try {
        const updates = req.body;
        const institution = await Institution.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!institution) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Institution updated", institution });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete
exports.deleteInstitution = async (req, res) => {
    try {
        const result = await Institution.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Institution deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
