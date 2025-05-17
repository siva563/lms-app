// import React, { useState } from 'react';
// import TiptapEditor from './TiptapEditor';
// import { v4 as uuidv4 } from 'uuid';
// import { createAssignment } from '../../services/assignmentService';

// const languageOptions = [
//     "HTML", "CSS", "JavaScript", "Bootstrap", "React JS", "Angular",
//     "Java", "Python", "C#", ".NET", "Spring Boot", "MySQL",
//     "Aptitude", "Reasoning", "Communication"
// ];

// const AssignmentForm = ({ selectedSubject, selectedChapter }) => {
//     const [title, setTitle] = useState('');
//     const [languages, setLanguages] = useState([]);
//     const [isCoding, setIsCoding] = useState(false);
//     const [timeLimit, setTimeLimit] = useState('');
//     const [totalMarks, setTotalMarks] = useState('');
//     const [description, setDescription] = useState('');
//     const [testCases, setTestCases] = useState([
//         { id: uuidv4(), input: '', expectedOutput: '', marks: '' },
//     ]);

//     const subjectId = selectedSubject;
//     const chapterId = selectedChapter;

//     const handleTestCaseChange = (id, field, value) => {
//         setTestCases(testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc));
//     };

//     const addTestCase = () => {
//         setTestCases([...testCases, { id: uuidv4(), input: '', expectedOutput: '', marks: '' }]);
//     };

//     const removeTestCase = (id) => {
//         setTestCases(testCases.filter(tc => tc.id !== id));
//     };

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     const payload = {
//     //         title,
//     //         languages,
//     //         isCoding,
//     //         timeLimit,
//     //         totalMarks,
//     //         description,
//     //         testCases,
//     //         subjectId,
//     //         chapterId,
//     //     };
//     //     console.log("Assignment Payload:", payload);
//     // };



//     const handleSubmit = async (e) => {
//         console.log("subjectId is" + subjectId);
//         console.log("chapterId is" + chapterId);
//         e.preventDefault();

//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!subjectId || !chapterId) {
//             alert("Please select a Subject and Chapter first.");
//             return;
//         }
//         const assignmentPayload = {
//             title,
//             subjectId,       // from props
//             chapterId,       // from props
//             languages,
//             isCoding,
//             description,
//             testCases,
//             timeLimit,
//             tags: [],        // if you have tags field
//             createdBy: user?._id,         // optional, dynamic in real
//             institutionId: user?.institutionId?._id, // optional, dynamic in real  user.institution.id
//         };

//         try {
//             console.log("results is" + JSON.stringify(assignmentPayload));
//             const result = await createAssignment(assignmentPayload);
//             console.log("results is" + JSON.stringify(result));
//             alert("✅ Assignment Created");
//             console.log(result.assignment);
//         } catch (err) {
//             console.error("❌ Failed to create assignment", err);
//             alert("Failed to create assignment");
//         }
//     };

//     return (
//         <form className="card border-0 shadow-sm p-3" onSubmit={handleSubmit}>
//             <h6 className="fw-bold mb-3">Assignment Form</h6>
//             <div className="row g-2 align-items-center mb-2">
//                 <div className="col-md-3">
//                     <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="col-md-1">
//                     <input
//                         type="number"
//                         className="form-control form-control-sm"
//                         placeholder="Marks"
//                         value={totalMarks}
//                         onChange={(e) => setTotalMarks(e.target.value)}
//                     />
//                 </div>

//                 <div className="col-md-1">
//                     <input
//                         type="number"
//                         className="form-control form-control-sm"
//                         placeholder="Time"
//                         value={timeLimit}
//                         onChange={(e) => setTimeLimit(e.target.value)}
//                     />
//                 </div>

//                 <div className="col-md-1 text-center">
//                     <div className="form-check form-switch d-flex justify-content-center">
//                         <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id="isCoding"
//                             checked={isCoding}
//                             onChange={(e) => setIsCoding(e.target.checked)}
//                         />
//                     </div>
//                     <label htmlFor="isCoding" className="form-label small text-center">Coding?</label>
//                 </div>

//                 <div className="col-md-6">
//                     <select
//                         multiple
//                         className="form-select form-select-sm"
//                         value={languages}
//                         onChange={(e) => setLanguages([...e.target.selectedOptions].map(opt => opt.value))}
//                     >
//                         {languageOptions.map((lang) => (
//                             <option key={lang} value={lang}>{lang}</option>
//                         ))}
//                     </select>
//                 </div>
//             </div>

//             <div className="mb-2" >
//                 <TiptapEditor content={description} onChange={setDescription} />
//             </div>


//             <div className="mb-2">
//                 <h6 className="fw-semibold small text-muted mb-2">Test Cases</h6>

//                 {testCases.map((tc, index) => (
//                     <div key={tc.id} className="row g-2 align-items-center mb-2">
//                         <div className="col-md-4">
//                             <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Input"
//                                 value={tc.input}
//                                 onChange={(e) => handleTestCaseChange(tc.id, 'input', e.target.value)}
//                             />
//                         </div>

//                         <div className="col-md-4">
//                             <input
//                                 type="text"
//                                 className="form-control form-control-sm"
//                                 placeholder="Expected Output"
//                                 value={tc.expectedOutput}
//                                 onChange={(e) => handleTestCaseChange(tc.id, 'expectedOutput', e.target.value)}
//                             />
//                         </div>

//                         <div className="col-md-1">
//                             <input
//                                 type="number"
//                                 className="form-control form-control-sm"
//                                 placeholder="Marks"
//                                 value={tc.marks}
//                                 onChange={(e) => handleTestCaseChange(tc.id, 'marks', e.target.value)}
//                             />
//                         </div>

//                         <div className="col-md-2 text-center">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={tc.required || false}
//                                 onChange={(e) => handleTestCaseChange(tc.id, 'required', e.target.checked)}
//                             />
//                             <div className="small text-muted">Required</div>
//                         </div>

//                         <div className="col-md-1 text-end">
//                             <button
//                                 type="button"
//                                 className="btn btn-outline-danger btn-sm w-100"
//                                 onClick={() => removeTestCase(tc.id)}
//                             >
//                                 <i className="bi bi-x-lg"></i>
//                             </button>
//                         </div>
//                     </div>
//                 ))}

//                 <button
//                     type="button"
//                     className="btn btn-outline-success btn-sm"
//                     onClick={addTestCase}
//                 >
//                     + Add Test Case
//                 </button>
//             </div>


//             <div className="mt-3 text-end">
//                 <button type="submit" className="btn btn-primary btn-sm px-4">Save</button>
//             </div>
//         </form>
//     );
// };

// export default AssignmentForm;

import React, { useState } from 'react';
import TiptapEditor from './TiptapEditor';
import { v4 as uuidv4 } from 'uuid';
import { createAssignment } from '../../services/assignmentService';
import Editor from '@monaco-editor/react'; // for default code

const languageOptions = [
    "HTML", "CSS", "JavaScript", "Bootstrap", "React JS", "Angular",
    "Java", "Python", "C#", ".NET", "Spring Boot", "MySQL",
    "Aptitude", "Reasoning", "Communication"
];

const AssignmentForm = ({ selectedSubject, selectedChapter }) => {
    const [title, setTitle] = useState('');
    const [languages, setLanguages] = useState([]);
    const [isCoding, setIsCoding] = useState(false);
    const [timeLimit, setTimeLimit] = useState('');
    const [totalMarks, setTotalMarks] = useState('');
    const [description, setDescription] = useState('');
    const [defaultCode, setDefaultCode] = useState('// Start writing your code here...');
    const [testCases, setTestCases] = useState([{ id: uuidv4(), input: '', expectedOutput: '', marks: '' }]);

    const subjectId = selectedSubject;
    const chapterId = selectedChapter;

    const handleTestCaseChange = (id, field, value) => {
        setTestCases(testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc));
    };

    const addTestCase = () => {
        setTestCases([...testCases, { id: uuidv4(), input: '', expectedOutput: '', marks: '' }]);
    };

    const removeTestCase = (id) => {
        setTestCases(testCases.filter(tc => tc.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        if (!subjectId || !chapterId) {
            alert("Please select a Subject and Chapter first.");
            return;
        }
        const assignmentPayload = {
            title,
            subjectId,
            chapterId,
            languages,
            isCoding,
            description,
            defaultCode,
            testCases,
            timeLimit,
            tags: [],
            createdBy: user?._id,
            institutionId: user?.institutionId?._id,
        };

        try {
            const result = await createAssignment(assignmentPayload);
            alert("✅ Assignment Created Successfully!");
            console.log(result.assignment);
        } catch (err) {
            console.error("❌ Failed to create assignment", err);
            alert("Failed to create assignment");
        }
    };

    return (
        <form className="card border-0 shadow-sm p-3" onSubmit={handleSubmit}>
            <h6 className="fw-bold mb-3">Assignment Form</h6>

            {/* Basic Details */}
            <div className="row g-2 align-items-center mb-2">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-1">
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Marks"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                    />
                </div>
                <div className="col-md-1">
                    <input
                        type="number"
                        className="form-control form-control-sm"
                        placeholder="Time"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                    />
                </div>
                <div className="col-md-1 text-center">
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="isCoding"
                            checked={isCoding}
                            onChange={(e) => setIsCoding(e.target.checked)}
                        />
                    </div>
                    <label htmlFor="isCoding" className="form-label small text-center">Coding?</label>
                </div>
                <div className="col-md-6">
                    <select
                        multiple
                        className="form-select form-select-sm"
                        value={languages}
                        onChange={(e) => setLanguages([...e.target.selectedOptions].map(opt => opt.value))}
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Description Editor */}
            <div className="mb-2">
                <TiptapEditor content={description} onChange={setDescription} />
            </div>

            {/* Default Code Editor */}
            <div className="mb-2">
                <h6 className="fw-semibold small text-muted mb-1">Default Code (Optional)</h6>
                <Editor
                    height="200px"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    value={defaultCode}
                    onChange={(val) => setDefaultCode(val || '')}
                    options={{
                        fontSize: 14,
                        lineHeight: 22,
                        wordWrap: 'on',
                        minimap: { enabled: false },
                        fontFamily: 'Fira Code, monospace',
                    }}
                />
            </div>

            {/* Test Cases Section */}
            <div className="mb-2">
                <h6 className="fw-semibold small text-muted mb-2">Test Cases</h6>
                {testCases.map((tc) => (
                    <div key={tc.id} className="row g-2 align-items-center mb-2">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Input"
                                value={tc.input}
                                onChange={(e) => handleTestCaseChange(tc.id, 'input', e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Expected Output"
                                value={tc.expectedOutput}
                                onChange={(e) => handleTestCaseChange(tc.id, 'expectedOutput', e.target.value)}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control form-control-sm"
                                placeholder="Marks"
                                value={tc.marks}
                                onChange={(e) => handleTestCaseChange(tc.id, 'marks', e.target.value)}
                            />
                        </div>
                        <div className="col-md-2 text-end">
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm w-100"
                                onClick={() => removeTestCase(tc.id)}
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={addTestCase}
                >
                    + Add Test Case
                </button>
            </div>

            <div className="mt-3 text-end">
                <button type="submit" className="btn btn-primary btn-sm px-4">Save</button>
            </div>
        </form>
    );
};

export default AssignmentForm;
