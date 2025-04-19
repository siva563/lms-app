// import React, { useEffect, useState } from "react";
// import { fetchAssignedSubjectsWithChapters } from "../../services/studentService";
// import { da } from "date-fns/locale";

// const StudentSubjects = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [expandedSubjectId, setExpandedSubjectId] = useState(null);

//   useEffect(() => {
//     loadSubjects();
//   }, []);

//   const loadSubjects = async () => {
//     try {
//       const data = await fetchAssignedSubjectsWithChapters();
//       console.log("data is:" + JSON.stringify(data));
//       setSubjects(data);
//     } catch (error) {
//       console.error("Failed to load assigned subjects:", error);
//     }
//   };

//   const toggleSubject = (subjectId) => {
//     setExpandedSubjectId(expandedSubjectId === subjectId ? null : subjectId);
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">📚 My Assigned Subjects</h2>

//       {subjects.length === 0 && (
//         <div className="text-muted">No subjects assigned yet.</div>
//       )}

//       {subjects.map((subject) => (
//         <div className="card mb-4 shadow-sm" key={subject._id}>
//           <div className="card-body">
//             <div className="d-flex justify-content-between align-items-center">
//               <h5 className="card-title mb-0">{subject.name}</h5>
//               <button
//                 className="btn btn-outline-primary btn-sm"
//                 onClick={() => toggleSubject(subject._id)}
//               >
//                 {expandedSubjectId === subject._id ? "Hide Chapters" : "View Chapters"}
//               </button>
//             </div>

//             {expandedSubjectId === subject._id && (
//               <div className="mt-4">
//                 {subject.chapters.length === 0 && (
//                   <div className="text-muted">No chapters available.</div>
//                 )}

//                 {subject.chapters.map((ch) => (
//                   <div
//                     key={ch._id}
//                     className={`card mb-3 ${ch.isLocked ? "opacity-50 pointer-events-none" : ""}`}
//                   >
//                     <div className="card-body">
//                       <h6 className="card-title">📘 {ch.title}</h6>
//                       {ch.description && <p className="card-text text-muted">{ch.description}</p>}

//                       <div className="row">
//                         {ch.videoUrl && (
//                           <div className="col-md-6 mb-3">
//                             <h6>🎥 Video</h6>
//                             <div className="ratio ratio-16x9">
//                               <iframe
//                                 src={ch.videoUrl}
//                                 title="Chapter Video"
//                                 allowFullScreen
//                               ></iframe>
//                             </div>
//                           </div>
//                         )}
//                         {ch.cheatsheetUrl && (
//                           <div className="col-md-6 mb-3">
//                             <h6>📄 Cheatsheet</h6>
//                             <a
//                               href={ch.cheatsheetUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="btn btn-sm btn-outline-secondary"
//                             >
//                               Open Cheatsheet
//                             </a>
//                           </div>
//                         )}
//                         {ch.imageUrl && (
//                           <div className="col-md-6 mb-3">
//                             <h6>🖼️ Reference Image</h6>
//                             <img
//                               src={ch.imageUrl}
//                               alt="Chapter Visual"
//                               className="img-fluid rounded border"
//                             />
//                           </div>
//                         )}
//                         {ch.quizId && (
//                           <div className="col-md-6 mb-3">
//                             <h6>📝 Quiz</h6>
//                             <button className="btn btn-sm btn-warning">Take Quiz</button>
//                           </div>
//                         )}
//                         {ch.assignmentId && (
//                           <div className="col-md-6 mb-3">
//                             <h6>🛠 Assignment</h6>
//                             <button className="btn btn-sm btn-info">View Assignment</button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentSubjects;

// import React, { useEffect, useState } from "react";
// import { fetchAssignedSubjectsWithChapters } from "../../services/studentService";

// const StudentSubjects = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [expandedSubjectId, setExpandedSubjectId] = useState(null);

//   useEffect(() => {
//     loadSubjects();
//   }, []);

//   const loadSubjects = async () => {
//     try {
//       const data = await fetchAssignedSubjectsWithChapters();
//       setSubjects(data);
//     } catch (error) {
//       console.error("Failed to load assigned subjects:", error);
//     }
//   };

//   const toggleSubject = (id) => {
//     setExpandedSubjectId(expandedSubjectId === id ? null : id);
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">📘 My Learning</h2>
//       <div className="row">
//         {subjects.length === 0 && (
//           <p className="text-muted">No subjects assigned yet.</p>
//         )}
//         {subjects.map((subject) => (
//           <div className="col-md-6 mb-4" key={subject._id}>
//             <div className="card shadow-sm">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">{subject.name}</h5>
//                 <button
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={() => toggleSubject(subject._id)}
//                 >
//                   {expandedSubjectId === subject._id ? "Hide Chapters" : "View Chapters"}
//                 </button>
//               </div>
//               {expandedSubjectId === subject._id && (
//                 <div className="card-body">
//                   {subject.chapters.length === 0 ? (
//                     <p className="text-muted">No chapters added yet.</p>
//                   ) : (
//                     subject.chapters.map((ch) => (
//                       <div
//                         className={`card mb-3 shadow-sm ${ch.isLocked ? "border-warning" : ""}`}
//                         key={ch._id}
//                       >
//                         <div className="card-header d-flex justify-content-between">
//                           <span>{ch.title}</span>
//                           {ch.isLocked && <span className="badge bg-warning">Locked</span>}
//                         </div>
//                         <div className="card-body">
//                           {ch.description && <p>{ch.description}</p>}

//                           <div className="row">
//                             {ch.videoUrl && (
//                               <div className="col-md-6 mb-3">
//                                 <strong>🎥 Video:</strong>
//                                 <iframe
//                                   className="w-100"
//                                   height="200"
//                                   src={ch.videoUrl}
//                                   title="Video"
//                                   frameBorder="0"
//                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                   allowFullScreen
//                                 ></iframe>
//                               </div>
//                             )}

//                             {ch.cheatsheetUrl && (
//                               <div className="col-md-6 mb-3">
//                                 <strong>📄 Cheatsheet:</strong>
//                                 <a href={ch.cheatsheetUrl} target="_blank" rel="noreferrer" className="d-block">
//                                   View Cheatsheet
//                                 </a>
//                               </div>
//                             )}

//                             {ch.imageUrl && (
//                               <div className="col-md-6 mb-3">
//                                 <strong>🖼 Image:</strong>
//                                 <img src={ch.imageUrl} alt="Chapter" className="img-fluid rounded shadow-sm" />
//                               </div>
//                             )}

//                             {ch.quizId && (
//                               <div className="col-md-6 mb-3">
//                                 <strong>📝 Quiz:</strong>
//                                 <button className="btn btn-outline-primary btn-sm d-block mt-1">Take Quiz</button>
//                               </div>
//                             )}

//                             {ch.assignmentId && (
//                               <div className="col-md-6 mb-3">
//                                 <strong>🛠 Assignment:</strong>
//                                 <button className="btn btn-outline-secondary btn-sm d-block mt-1">
//                                   View Assignment
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentSubjects;

import React, { useEffect, useState } from "react";
import { fetchAssignedSubjectsWithChapters } from "../../services/studentService";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const icons = {
  HTML5: "🌐",
  CSS: "🎨",
  JavaScript: "⚙️",
  React: "⚛️",
  DSA: "🧠",
  Git: "🔧"
};

const StudentSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAssignedSubjectsWithChapters();
        setSubjects(res || []);
      } catch (err) {
        console.error("Failed to load subjects", err);
      }
    };
    load();
  }, []);

  const handleCardClick = (id) => {
    console.log("id" + id);
    navigate(`/student/subjects/${id}`);
  };

  return (
    <Container className="py-4">

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {subjects.map((subj) => (
          <Col key={subj._id}>
            <Card className="shadow-sm h-100 text-center cursor-pointer" onClick={() => handleCardClick(subj._id)} role="button">
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>{icons[subj.name] || "📘"}</div>
                <Card.Title className="mt-2">{subj.name}</Card.Title>
                <Card.Text className="text-muted">{subj.chapters?.length || 0} Chapters</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentSubjects;
