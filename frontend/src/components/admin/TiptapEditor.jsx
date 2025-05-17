// import React, { useState } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { lowlight } from 'lowlight/lib/common.js';

// import Heading from '@tiptap/extension-heading';
// import TextStyle from '@tiptap/extension-text-style';
// import Color from '@tiptap/extension-color';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import Image from '@tiptap/extension-image';

// import 'highlight.js/styles/github.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const TiptapEditor = ({ content, onChange }) => {
//     const [previewMode, setPreviewMode] = useState(false);

//     const editor = useEditor({
//         extensions: [
//             StarterKit.configure({ codeBlock: false }),
//             CodeBlockLowlight.configure({ lowlight }),
//             Heading.configure({ levels: [1, 2] }),
//             TextStyle,
//             Color,
//             BulletList,
//             OrderedList,
//             Image,
//         ],
//         content,
//         onUpdate: ({ editor }) => onChange(editor.getHTML()),
//         editorProps: {
//             attributes: {
//                 class: 'form-control editor-area',
//             },
//             style: {
//                 minHeight: '250px',
//                 height: 'auto',
//             },
//         },
//     });

//     if (!editor) return <p>Loading editor...</p>;

//     const handleImageUpload = () => {
//         const url = prompt('Enter image URL');
//         if (url) {
//             editor.chain().focus().setImage({ src: url }).run();
//         }
//     };

//     const handleFileAttach = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const url = URL.createObjectURL(file);
//             const filename = file.name;
//             editor.chain().focus().insertContent(
//                 `<a href="${url}" target="_blank" rel="noopener noreferrer">${filename}</a><br/>`
//             ).run();
//         }
//     };

//     const fetchImprovedVersion = async (text) => {
//         try {
//             const res = await fetch("/api/improve-text", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ prompt: text }),
//             });
//             const data = await res.json();
//             return data.improved || text;
//         } catch (err) {
//             console.error("AI improvement failed:", err);
//             return text;
//         }
//     };

//     const handleImproveText = async () => {
//         const plainText = editor.getText();
//         const improved = await fetchImprovedVersion(plainText);
//         editor.commands.setContent(improved);
//     };

//     return (
//         <div className="card border-0 shadow-sm">
//             <div className="card-header bg-white border-bottom d-flex flex-wrap align-items-center gap-2 py-2">
//                 <div className="btn-group btn-group-sm me-2" role="group">
//                     <button type='button' className="btn btn-outline-dark" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
//                         <i className="bi bi-type-bold"></i>
//                     </button>
//                     <button type='button' className="btn btn-outline-dark" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
//                         <i className="bi bi-type-italic"></i>
//                     </button>
//                     <button type='button' className="btn btn-outline-dark" title="Code" onClick={() => editor.chain().focus().toggleCode().run()}>
//                         <i className="bi bi-code-slash"></i>
//                     </button>
//                     <button type='button' className="btn btn-outline-dark" title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
//                         <i className="bi bi-file-code"></i>
//                     </button>
//                 </div>

//                 <div className="btn-group btn-group-sm me-2" role="group">
//                     <button type='button' className="btn btn-outline-secondary" title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}>
//                         <i className="bi bi-list-ul"></i>
//                     </button>
//                     <button type='button' className="btn btn-outline-secondary" title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
//                         <i className="bi bi-list-ol"></i>
//                     </button>
//                 </div>

//                 <div className="btn-group btn-group-sm me-2" role="group">
//                     <button type='button' className="btn btn-outline-primary" title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
//                         H1
//                     </button>
//                     <button type='button' className="btn btn-outline-primary" title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
//                         H2
//                     </button>
//                 </div>

//                 <input
//                     type="color"
//                     className="form-control form-control-color form-control-sm me-2"
//                     title="Choose font color"
//                     onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
//                 />

//                 <button type='button' className="btn btn-outline-success btn-sm me-2" title="Insert Image" onClick={handleImageUpload}>
//                     <i className="bi bi-image"></i>
//                 </button>

//                 <label className="btn btn-outline-secondary btn-sm mb-0 me-2" title="Attach File">
//                     <i className="bi bi-paperclip"></i>
//                     <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleFileAttach} />
//                 </label>

//                 <button type='button' className="btn btn-outline-warning btn-sm me-2" onClick={() => setPreviewMode(!previewMode)}>
//                     {previewMode ? <i className="bi bi-pencil-square"></i> : <i className="bi bi-eye"></i>}
//                 </button>

//                 <button type='button' className="btn btn-outline-info btn-sm text-white" title="AI Improve Writing" onClick={handleImproveText}>
//                     🤖 Improve
//                 </button>
//             </div>

//             <div className="card-body bg-white p-3">
//                 {previewMode ? (
//                     <div className="p-3 border rounded bg-light" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
//                 ) : (
//                     <EditorContent editor={editor} />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default TiptapEditor;

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common.js';

import Heading from '@tiptap/extension-heading';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';

import 'highlight.js/styles/github.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TiptapEditor = ({ content, onChange }) => {
    const [previewMode, setPreviewMode] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlockLowlight.configure({ lowlight }),
            Heading.configure({ levels: [1, 2] }),
            TextStyle,
            Color,
            BulletList,
            OrderedList,
            Image,
        ],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'form-control editor-area',
                style: "min-height: 250px; line-height: 1.7; font-family: 'Open Sans', sans-serif;",
            },
            handlePaste(view, event) {
                const clipboardData = event.clipboardData.getData('text/plain');
                if (clipboardData.includes('<') && clipboardData.includes('>')) {
                    event.preventDefault();
                    view.dispatch(
                        view.state.tr.insertText(
                            clipboardData.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                        )
                    );
                    return true;
                }
                return false;
            }
        },
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content || '');
        }
    }, [content]);

    if (!editor) return <p>Loading editor...</p>;

    const handleImageUpload = () => {
        const url = prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const handleFileAttach = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const filename = file.name;
            editor.chain().focus().insertContent(
                `<a href="${url}" target="_blank" rel="noopener noreferrer">${filename}</a><br/>`
            ).run();
        }
    };

    const fetchImprovedVersion = async (text) => {
        try {
            const res = await fetch("/api/improve-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text }),
            });
            const data = await res.json();
            return data.improved || text;
        } catch (err) {
            console.error("AI improvement failed:", err);
            return text;
        }
    };

    const handleImproveText = async () => {
        const plainText = editor.getText();
        const improved = await fetchImprovedVersion(plainText);
        editor.commands.setContent(improved);
    };

    const activeButton = (type, attrs = {}) =>
        editor.isActive(type, attrs) ? 'btn-primary' : 'btn-outline-dark';

    const activeListButton = (type) =>
        editor.isActive(type) ? 'btn-primary' : 'btn-outline-secondary';

    const activeHeadingButton = (level) =>
        editor.isActive('heading', { level }) ? 'btn-primary' : 'btn-outline-primary';

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom d-flex flex-wrap align-items-center gap-2 py-2">
                {/* Text Styles */}
                <div className="btn-group btn-group-sm me-2" role="group">
                    <button type='button' className={`btn ${activeButton('bold')}`} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                        <i className="bi bi-type-bold"></i>
                    </button>
                    <button type='button' className={`btn ${activeButton('italic')}`} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <i className="bi bi-type-italic"></i>
                    </button>
                    <button type='button' className={`btn ${activeButton('code')}`} title="Inline Code" onClick={() => editor.chain().focus().toggleCode().run()}>
                        <i className="bi bi-code-slash"></i>
                    </button>
                    <button type='button' className={`btn ${activeButton('codeBlock')}`} title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        <i className="bi bi-file-code"></i>
                    </button>
                </div>

                {/* Lists */}
                <div className="btn-group btn-group-sm me-2" role="group">
                    <button type='button' className={`btn ${activeListButton('bulletList')}`} title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        <i className="bi bi-list-ul"></i>
                    </button>
                    <button type='button' className={`btn ${activeListButton('orderedList')}`} title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        <i className="bi bi-list-ol"></i>
                    </button>
                </div>

                {/* Headings */}
                <div className="btn-group btn-group-sm me-2" role="group">
                    <button type='button' className={`btn ${activeHeadingButton(1)}`} title="Heading 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        H1
                    </button>
                    <button type='button' className={`btn ${activeHeadingButton(2)}`} title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                        H2
                    </button>
                </div>

                {/* Color Picker */}
                <input
                    type="color"
                    className="form-control form-control-color form-control-sm me-2"
                    title="Choose font color"
                    onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                />

                {/* Media */}
                <button type='button' className="btn btn-outline-success btn-sm me-2" title="Insert Image" onClick={handleImageUpload}>
                    <i className="bi bi-image"></i>
                </button>

                <label className="btn btn-outline-secondary btn-sm mb-0 me-2" title="Attach File">
                    <i className="bi bi-paperclip"></i>
                    <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleFileAttach} />
                </label>

                {/* View Modes */}
                <button type='button' className="btn btn-outline-warning btn-sm me-2" onClick={() => setPreviewMode(!previewMode)}>
                    {previewMode ? <i className="bi bi-pencil-square"></i> : <i className="bi bi-eye"></i>}
                </button>

                {/* AI Writing Improve */}
                <button type='button' className="btn btn-info btn-sm text-white" title="AI Improve Writing" onClick={handleImproveText}>
                    🤖 Improve
                </button>
            </div>

            {/* Editor / Preview Area */}
            <div className="card-body bg-white p-3">
                {previewMode ? (
                    <div className="p-3 border rounded bg-light" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
        </div>
    );
};

export default TiptapEditor;
