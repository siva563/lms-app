// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { fetchChaptersBySubject } from "../../services/studentService";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "bootstrap-icons/font/bootstrap-icons.css";

// // const StudentSubjectChapters = () => {
// //     const { subjectId } = useParams();
// //     const [chapters, setChapters] = useState([]);

// //     useEffect(() => {
// //         if (subjectId) {
// //             loadChapters();
// //         }
// //     }, [subjectId]);

// //     const loadChapters = async () => {
// //         try {
// //             const data = await fetchChaptersBySubject(subjectId);
// //             setChapters(data);
// //         } catch (err) {
// //             console.error("Error loading chapters:", err);
// //         }
// //     };

// //     const getProgress = (chapter) => {
// //         let total = 0;
// //         let completed = 0;

// //         if (chapter.videoUrl) {
// //             total++;
// //             completed += chapter.videoCompleted ? 1 : 0;
// //         }
// //         if (chapter.assignmentId) {
// //             total++;
// //             completed += chapter.assignmentCompleted ? 1 : 0;
// //         }
// //         if (chapter.quizId) {
// //             total++;
// //             completed += chapter.quizCompleted ? 1 : 0;
// //         }
// //         if (chapter.cheatsheetUrl) {
// //             total++;
// //             completed += chapter.cheatsheetViewed ? 1 : 0;
// //         }

// //         return total === 0 ? 0 : Math.round((completed / total) * 100);
// //     };

// //     return (
// //         <div className="container py-4">
// //             {/* <h4 className="fw-bold mb-4">📚 Chapters</h4> */}
// //             {chapters.length === 0 ? (
// //                 <p>No chapters available.</p>
// //             ) : (
// //                 <div className="d-flex flex-column gap-3">
// //                     {chapters.map((ch) => (
// //                         <div
// //                             key={ch._id}
// //                             className="card shadow-sm p-3 d-flex flex-row align-items-center justify-content-between gap-3"
// //                         >
// //                             {/* 1️⃣ Chapter Name */}
// //                             <div className="flex-grow-1">
// //                                 <h6 className="fw-bold mb-1">{ch.title}</h6>
// //                                 {/* <p className="text-muted small mb-0">{ch.description}</p> */}
// //                             </div>

// //                             {/* 2️⃣ Video Preview */}
// //                             <div>
// //                                 {ch.videoUrl ? (
// //                                     <video
// //                                         width="60"
// //                                         height="60"
// //                                         controls
// //                                         style={{ borderRadius: "8px", objectFit: "cover" }}
// //                                     >
// //                                         <source src={ch.videoUrl} type="video/mp4" />
// //                                         Your browser does not support the video tag.
// //                                     </video>
// //                                 ) : (
// //                                     <div
// //                                         className="d-flex align-items-center justify-content-center bg-light border rounded"
// //                                         style={{ width: "60px", height: "60px" }}
// //                                     >
// //                                         <i className="bi bi-camera-video-off text-muted"></i>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* 3️⃣ Assignment */}
// //                             <div>
// //                                 {ch.assignmentId ? (
// //                                     <button className="btn btn-sm btn-outline-primary">Start Assignment</button>
// //                                 ) : (
// //                                     <span className="text-muted small">No Assignment</span>
// //                                 )}
// //                             </div>

// //                             {/* 4️⃣ Quiz */}
// //                             <div>
// //                                 {ch.quizId ? (
// //                                     <button className="btn btn-sm btn-outline-success">Start Quiz</button>
// //                                 ) : (
// //                                     <span className="text-muted small">No Quiz</span>
// //                                 )}
// //                             </div>

// //                             {/* 5️⃣ Progress */}
// //                             <div style={{ width: "80px" }}>
// //                                 <div className="progress" style={{ height: "8px" }}>
// //                                     <div
// //                                         className="progress-bar bg-success"
// //                                         role="progressbar"
// //                                         style={{ width: `${getProgress(ch)}%` }}
// //                                         aria-valuenow={getProgress(ch)}
// //                                         aria-valuemin="0"
// //                                         aria-valuemax="100"
// //                                     ></div>
// //                                 </div>
// //                                 <div className="text-center small mt-1">{getProgress(ch)}%</div>
// //                             </div>

// //                             {/* 6️⃣ Cheatsheet */}
// //                             <div>
// //                                 {ch.cheatsheetUrl ? (
// //                                     <a
// //                                         href={ch.cheatsheetUrl}
// //                                         target="_blank"
// //                                         rel="noreferrer"
// //                                         className="btn btn-sm btn-outline-secondary"
// //                                     >
// //                                         View
// //                                     </a>
// //                                 ) : (
// //                                     <span className="text-muted small">No Cheatsheet</span>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default StudentSubjectChapters;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchChaptersBySubject } from "../../services/studentService";
// import ProgressBar from "react-bootstrap/ProgressBar";

// const StudentSubjectChapters = () => {
//   const { subjectId } = useParams();
//   const [chapters, setChapters] = useState([]);

//   useEffect(() => {
//     loadChapters();
//   }, [subjectId]);

//   const loadChapters = async () => {
//     try {
//       const data = await fetchChaptersBySubject(subjectId);
//       setChapters(data);
//     } catch (err) {
//       console.error("❌ Failed to fetch chapters:", err);
//     }
//   };

//   return (
//     <div className="container py-4">
//       <h3 className="mb-4 fw-bold">📘 Chapters</h3>

//       {chapters.length === 0 ? (
//         <div className="text-muted">No chapters available.</div>
//       ) : (
//         <div className="d-flex flex-column gap-3">
//           {chapters.map((chapter) => (
//             <div
//               key={chapter._id}
//               className="border rounded shadow-sm p-3 d-flex align-items-center justify-content-between bg-white"
//               style={{ gap: "20px" }}
//             >
//               {/* 1️⃣ Chapter Name */}
//               <div className="flex-grow-1" style={{ minWidth: "150px" }}>
//                 <h6 className="fw-semibold mb-1">📄 {chapter.title}</h6>
//                 {/* <p className="text-muted small mb-0">{chapter.description}</p> */}
//               </div>

//               {/* 2️⃣ Video Preview */}
//               <div>
//                 {chapter.videoUrl ? (
//                   <video
//                     width="60"
//                     height="60"
//                     controls
//                     style={{ borderRadius: "6px", objectFit: "cover" }}
//                   >
//                     <source src={chapter.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 ) : (
//                   <div
//                     className="d-flex align-items-center justify-content-center bg-light border rounded"
//                     style={{ width: "60px", height: "60px" }}
//                   >
//                     <i className="bi bi-camera-video-off text-muted fs-5"></i>
//                   </div>
//                 )}
//               </div>

//               {/* 3️⃣ Assignment Button */}
//               <div>
//                 {chapter.assignmentId ? (
//                   <button className="btn btn-outline-primary btn-sm">Start Assignment</button>
//                 ) : (
//                   <button className="btn btn-outline-secondary btn-sm" disabled>
//                     No Assignment
//                   </button>
//                 )}
//               </div>

//               {/* 4️⃣ Quiz Button */}
//               <div>
//                 {chapter.quizId ? (
//                   <button className="btn btn-outline-success btn-sm">Start Quiz</button>
//                 ) : (
//                   <button className="btn btn-outline-secondary btn-sm" disabled>
//                     No Quiz
//                   </button>
//                 )}
//               </div>

//               {/* 5️⃣ Progress */}
//               <div style={{ width: "120px" }}>
//                 <ProgressBar
//                   now={chapter.progress || 0}
//                   label={`${chapter.progress || 0}%`}
//                   variant="info"
//                 />
//               </div>

//               {/* 6️⃣ Cheatsheet */}
//               <div>
//                 {chapter.cheatsheetUrl ? (
//                   <a
//                     className="btn btn-outline-dark btn-sm"
//                     href={chapter.cheatsheetUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Cheatsheet
//                   </a>
//                 ) : (
//                   <button className="btn btn-outline-secondary btn-sm" disabled>
//                     No Cheatsheet
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentSubjectChapters;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChaptersBySubject } from "../../services/studentService";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const StudentSubjectChapters = () => {
  const { subjectId } = useParams();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadChapters();
  }, [subjectId]);

  const loadChapters = async () => {
    try {
      const data = await fetchChaptersBySubject(subjectId);
      console.log("chapters data is:" + JSON.stringify(data));
      setChapters(data || []);
    } catch (err) {
      console.error("❌ Failed to load chapters", err);
    }
  };

  const renderVideo = (url) => {
    if (!url) return null;

    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    if (isYouTube) {
      let embedUrl = url;
      if (url.includes("watch?v=")) {
        embedUrl = url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1];
        embedUrl = `https://www.youtube.com/embed/${id}`;
      }

      return (
        <iframe
          width="100"
          height="60"
          src={embedUrl}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "6px" }}
        ></iframe>
      );
    }

    return (
      <video width="60" height="60" controls style={{ borderRadius: "6px", objectFit: "cover" }}>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  const getProgress = (chapter) => {
    let total = 0;
    let done = 0;

    if (chapter.videoUrl) {
      total++;
      done++; // mark as watched for now
    }
    if (chapter.assignmentId) {
      total++;
      done++; // simulate done
    }
    if (chapter.quizId) {
      total++;
      done++;
    }
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">📘 Chapters</h4>

      {chapters.map((chapter, idx) => (
        <div
          key={chapter._id}
          className="d-flex align-items-center gap-3 p-3 mb-3 bg-white border rounded shadow-sm"
        >
          {/* 1️⃣ Title */}
          <div className="flex-grow-1" style={{ flexBasis: "15%" }}>
            <strong>{idx + 1}. {chapter.title}</strong>
            <div className="text-muted small">{chapter.description}</div>
          </div>

          {/* 2️⃣ Video */}
          <div style={{ flexBasis: "12%" }}>
            {renderVideo(chapter.videoUrl)}
          </div>

          {/* 3️⃣ Assignment */}
          <div style={{ flexBasis: "12%" }}>
            {chapter.assignmentId ? (
              <button className="btn btn-outline-primary btn-sm" >Start Assignment</button>
            ) : (
              <span className="text-muted small">No Assignment</span>
            )}
          </div>

          {/* 4️⃣ Quiz */}
          <div style={{ flexBasis: "12%" }}>
            {chapter.quizId ? (
              <button className="btn btn-outline-success btn-sm" onClick={() => navigate(`/student/quiz/${chapter.quizId}`)}>Start Quiz</button>
            ) : (
              <span className="text-muted small">No Quiz</span>
            )}
          </div>

          {/* 5️⃣ Progress */}
          <div style={{ flexBasis: "25%" }}>
            <ProgressBar now={getProgress(chapter)} label={`${getProgress(chapter)}%`} />
          </div>

          {/* 6️⃣ Cheatsheet */}
          <div style={{ flexBasis: "12%" }}>
            {chapter.cheatsheetUrl ? (
              <a
                href={chapter.cheatsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-secondary btn-sm"
              >
                Cheatsheet
              </a>
            ) : (
              <span className="text-muted small">No Cheatsheet</span>
            )}
          </div>
        </div>
      ))}

      {chapters.length === 0 && <p className="text-muted">No chapters found for this subject.</p>}
    </div>
  );
};

export default StudentSubjectChapters;
