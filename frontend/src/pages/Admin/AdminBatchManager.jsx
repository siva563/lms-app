import React, { useEffect, useState } from "react";
import {
    fetchBatches,
    createBatch,
    updateBatch,
    deleteBatch,
} from "../../services/batchService";
import BatchForm from "../../components/admin/BatchForm";
import BatchList from "../../components/admin/BatchList";

const AdminBatchManager = () => {
    const [batches, setBatches] = useState([]);
    const [editingBatch, setEditingBatch] = useState(null);

    const loadBatches = async () => {
        const data = await fetchBatches();
        console.log("batch data is:" + JSON.stringify(data));
        setBatches(data);
    };

    useEffect(() => {
        loadBatches();
    }, []);

    const handleSubmit = async (formData) => {
        if (editingBatch) {
            await updateBatch(editingBatch._id, formData);
        } else {
            await createBatch(formData);
        }
        setEditingBatch(null);
        loadBatches();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this batch?")) {
            await deleteBatch(id);
            loadBatches();
        }
    };

    return (
        <div className="container py-4">
            <h3 className="mb-4">📅 Batch Management</h3>
            <BatchForm
                onSubmit={handleSubmit}
                editingBatch={editingBatch}
                clearEdit={() => setEditingBatch(null)}
            />
            <BatchList
                batches={batches}
                onEdit={setEditingBatch}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminBatchManager;
