import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAssignmentByChapter } from '../../services/assignmentService';
import { evaluateStudentCode } from '../../services/aiService';
import Editor from '@monaco-editor/react';
import AIResultViewer from './AIResultViewer';

const StudentAssignment = () => {
    const [assignment, setAssignment] = useState(null);
    const [files, setFiles] = useState({
        'index.js': '// Write your JavaScript code here',
        'style.css': '/* CSS */',
        'index.html': '<!-- HTML -->',
    });
    const [activeFile, setActiveFile] = useState('index.js');
    const [selectedLang, setSelectedLang] = useState('javascript');
    const [resultOutput, setResultOutput] = useState('');
    const [submittedCode, setSubmittedCode] = useState('');
    const [editorRef, setEditorRef] = useState(null);
    const [aiResult, setAiResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const { chapterId } = useParams();

    useEffect(() => {
        const loadAssignment = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const institutionId = user?.institutionId || user?.institution?.id;
            if (!institutionId) {
                alert('❌ Institution ID missing. Please login again.');
                return;
            }

            try {
                const data = await fetchAssignmentByChapter(chapterId, institutionId);
                setAssignment(data);
            } catch (err) {
                console.error('❌ Error loading assignment', err);
            }
        };

        if (chapterId) loadAssignment();
    }, [chapterId]);

    const handleRun = () => {
        setResultOutput('▶ Running code... (not implemented)');
    };

    const handleSubmit = async () => {
        // setSubmittedCode(files[activeFile]);

        const currentCode = files[activeFile]?.trim();
        const hasRealHTML = /<\\s*([a-zA-Z]+)[^>]*>/g.test(currentCode);

        if (!currentCode || !hasRealHTML) {
            setResultOutput("⚠️ Please write some code before submitting.");
            return;
        }
        setLoading(true);
        setSubmittedCode(currentCode);
        setAiResult(null);

        try {
            const res = await evaluateStudentCode({
                problemStatement: assignment?.description,
                studentCode: files[activeFile],
                testCases: assignment?.testCases,
                language: selectedLang,
            });
            setResultOutput(JSON.stringify(res.result, null, 2));
            setAiResult(res.result);
        } catch (err) {
            console.error("AI Evaluation Failed", err);
            setResultOutput("❌ AI Evaluation failed. Please try again.");
            setAiResult(null);
        } finally {
            setLoading(false); // ✅ hide loader
        }
    };

    const handleSaveDraft = () => {
        setResultOutput('💾 Draft saved (mock)');
    };

    const handleFormat = () => {
        editorRef?.getAction('editor.action.formatDocument').run();
    };

    const getLangFromFile = (fileName) => {
        if (fileName.endsWith('.js')) return 'javascript';
        if (fileName.endsWith('.css')) return 'css';
        if (fileName.endsWith('.html')) return 'html';
        return 'plaintext';
    };

    if (!assignment) return <p>📭 No assignment found</p>;

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-5">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white py-2">
                            <strong>Problem</strong>
                        </div>
                        <div className="card-body p-2">
                            <ul className="nav nav-tabs mb-2">
                                <li className="nav-item">
                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#problemTab">Problem</button>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#submittedTab">Submitted</button>
                                </li>
                            </ul>
                            <div className="tab-content small" style={{ minHeight: '250px', maxHeight: '350px', overflowY: 'auto' }}>
                                <div className="tab-pane fade show active" id="problemTab">
                                    <div dangerouslySetInnerHTML={{ __html: assignment?.description }} />
                                </div>
                                <div className="tab-pane fade" id="submittedTab">
                                    <pre>{submittedCode || '// No code submitted yet'}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="card h-100">
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <strong>Code Editor</strong>
                            <select
                                className="form-select form-select-sm w-auto"
                                value={activeFile}
                                onChange={(e) => setActiveFile(e.target.value)}
                            >
                                {Object.keys(files).map((file) => (
                                    <option key={file} value={file}>{file}</option>
                                ))}
                            </select>
                        </div>

                        <div className="card-body p-0" style={{ height: '300px' }}>
                            <Editor
                                height="100%"
                                theme="vs-dark"
                                language={getLangFromFile(activeFile)}
                                value={files[activeFile]}
                                onChange={(val) => setFiles(prev => ({ ...prev, [activeFile]: val || '' }))}
                                onMount={(editor) => setEditorRef(editor)}
                                options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: 'on' }}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center p-2 bg-light border-top">
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleRun}>
                                    ▶ Run
                                </button>
                                <button className="btn btn-outline-primary btn-sm" type="button" onClick={handleSaveDraft}>
                                    💾 Save Draft
                                </button>

                            </div>

                            <div>
                                <button className="btn btn-success btn-sm" type="button" onClick={handleSubmit}>
                                    🚀 Submit
                                </button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            {resultOutput && (

                <div className='row'>
                    <div className="p-2 small bg-white border-top" style={{ minHeight: '100px' }}>
                        <strong>Result:</strong>
                        <pre className="text-muted">
                            {/* <AIResultViewer result={JSON.parse(resultOutput)} /> */}
                            {aiResult && <AIResultViewer result={aiResult} />}
                        </pre>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="d-flex align-items-center gap-2 py-2 text-info">
                    <div className="spinner-border spinner-border-sm text-primary" role="status" />
                    <span>🧠 Evaluating your code...</span>
                </div>
            ) : (
                resultOutput && (
                    <div className="p-2 small bg-white border-top">
                        <strong>Status:</strong>
                        <pre className="text-muted mb-0">{resultOutput}</pre>
                    </div>
                )
            )}

        </div>
    );
};

export default StudentAssignment;
