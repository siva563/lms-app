// import React from "react";

// const AIResultViewer = ({ result }) => {
//     if (!result) return null;

//     return (
//         <div className="card mt-4 shadow-sm">
//             <div className="card-header bg-success text-white">
//                 <h6 className="mb-0">🧠 AI Evaluation Result</h6>
//             </div>
//             <div className="card-body">

//                 {/* Syntax Errors */}
//                 <div className="mb-3">
//                     <h6 className="text-secondary">🔍 Syntax Check</h6>
//                     <div className={result.syntaxErrors ? "alert alert-danger" : "alert alert-success"}>
//                         {result.syntaxErrors || "No syntax errors found."}
//                     </div>
//                 </div>

//                 {/* Compiled Output */}
//                 <div className="mb-3">
//                     <h6 className="text-secondary">📄 Compiled Output</h6>
//                     <div className="bg-light border rounded p-2" style={{ whiteSpace: 'pre-wrap' }}>
//                         {result.compiledOutput || 'No output'}
//                     </div>
//                 </div>

//                 {/* Test Case Results */}
//                 <div className="mb-3">
//                     <h6 className="text-secondary">🧪 Test Case Results</h6>
//                     <div className="table-responsive">
//                         <table className="table table-bordered table-sm">
//                             <thead className="table-light">
//                                 <tr>
//                                     <th style={{ width: '5%' }}>#</th>
//                                     <th>Input</th>
//                                     <th>Expected</th>
//                                     <th>Actual</th>
//                                     <th style={{ width: '10%' }}>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {result.testCaseResults?.map((tc, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>{tc.input}</td>
//                                         <td>{tc.expected}</td>
//                                         <td>{tc.actual}</td>
//                                         <td>
//                                             <span className={`badge ${tc.passed ? "bg-success" : "bg-danger"}`}>
//                                                 {tc.passed ? "Passed" : "Failed"}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Total Score */}
//                 <div className="mb-3">
//                     <h6 className="text-secondary">🎯 Total Score</h6>
//                     <div className="h5 text-primary">
//                         {result.totalScore} / {result.testCaseResults?.length}
//                     </div>
//                 </div>

//                 {/* Suggestions */}
//                 <div>
//                     <h6 className="text-secondary">💡 Suggestions</h6>
//                     <ul className="list-group list-group-flush">
//                         {result.suggestions?.map((s, i) => (
//                             <li key={i} className="list-group-item small text-muted">
//                                 {s}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default AIResultViewer;

import React from "react";

const AIResultViewer = ({ result }) => {
    if (!result) return null;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <div className="card shadow-sm border">
                        <div className="card-header bg-success text-white">
                            <h6 className="mb-0">🧠 AI Evaluation Result</h6>
                        </div>
                        <div className="card-body">

                            {/* 1. Syntax Errors */}
                            <div className="mb-4">
                                <h6 className="fw-semibold">🔍 Syntax Check</h6>
                                <p className={result.syntaxErrors ? "text-danger mb-0" : "text-success mb-0"}>
                                    {result.syntaxErrors || "✅ No syntax errors found"}
                                </p>
                            </div>

                            {/* 2. Compiled Output */}
                            <div className="mb-4">
                                <h6 className="fw-semibold">📄 Compiled Output</h6>
                                <div className="bg-light p-3 border rounded overflow-auto">
                                    <pre className="mb-0">{result.compiledOutput}</pre>
                                </div>
                            </div>

                            {/* 3. Test Case Results */}
                            <div className="mb-4">
                                <h6 className="fw-semibold">🧪 Test Case Results</h6>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Input</th>
                                                <th>Expected</th>
                                                <th>Actual</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.testCaseResults?.map((tc, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{tc.input}</td>
                                                    <td>{tc.expected}</td>
                                                    <td>{tc.actual}</td>
                                                    <td>
                                                        {tc.passed ? (
                                                            <span className="badge bg-success">Passed</span>
                                                        ) : (
                                                            <span className="badge bg-danger">Failed</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 4. Total Score */}
                            <div className="mb-4">
                                <h6 className="fw-semibold">🎯 Total Score</h6>
                                <h5 className="text-primary">
                                    {result.totalScore} / {result.testCaseResults?.length}
                                </h5>
                            </div>

                            {/* 5. Suggestions */}
                            <div>
                                <h6 className="fw-semibold">💡 Suggestions</h6>
                                <ul className="list-group list-group-flush">
                                    {result.suggestions?.map((s, i) => (
                                        <li className="list-group-item" key={i}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            {result.compiledOutput && (
                                <div className="mb-4">
                                    <h6 className="fw-semibold">👁️ Rendered Output Preview</h6>
                                    <div className="border rounded p-3 bg-white" style={{ minHeight: '100px' }}>
                                        <iframe
                                            title="Compiled Preview"
                                            sandbox=""
                                            style={{ width: "100%", minHeight: "200px", border: "none" }}
                                            srcDoc={result.compiledOutput}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIResultViewer;
