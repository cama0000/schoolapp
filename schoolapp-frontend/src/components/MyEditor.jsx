import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MyEditor;
