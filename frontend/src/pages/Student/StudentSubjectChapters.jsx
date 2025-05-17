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
              <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/student/assignment/${chapter._id}`)} >Start Assignment</button>
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
