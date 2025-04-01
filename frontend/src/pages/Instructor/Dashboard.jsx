import React, { useState } from "react";
import UploadCheatsheet from "./UploadCheatsheet";
import UploadMCQ from "./UploadMCQ";
import UploadAssignment from "./UploadAssignment";
import { Container, Tabs, Tab } from "react-bootstrap";

const Dashboard = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    return (
        <Container className="py-4">
            <h3 className="mb-4">Instructor Dashboard</h3>

            {/* Subject and Chapter Dropdowns */}
            <div className="d-flex gap-3 mb-4">
                {/* Later we'll make SubjectSelector and ChapterSelector reusable */}
                <select className="form-select" onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value="">Select Subject</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                </select>

                <select className="form-select" onChange={(e) => setSelectedChapter(e.target.value)}>
                    <option value="">Select Chapter</option>
                    <option value="html-basics">HTML Basics</option>
                    <option value="js-dom">JS DOM</option>
                </select>
            </div>

            {/* Tabs for upload sections */}
            <Tabs defaultActiveKey="cheatsheet" id="instructor-tabs" className="mb-3">
                <Tab eventKey="cheatsheet" title="Upload Cheatsheet">
                    <UploadCheatsheet subject={selectedSubject} chapter={selectedChapter} />
                </Tab>
                <Tab eventKey="mcq" title="Add MCQs">
                    <UploadMCQ subject={selectedSubject} chapter={selectedChapter} />
                </Tab>
                <Tab eventKey="assignment" title="Upload Assignment">
                    <UploadAssignment subject={selectedSubject} chapter={selectedChapter} />
                </Tab>
            </Tabs>
        </Container>
    );
};

export default Dashboard;
