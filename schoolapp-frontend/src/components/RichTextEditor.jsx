import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import './RichText.css';
import { loadPageContent, savePageContent } from '@/services/client';

const RichTextEditor = forwardRef((props, ref) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef(null);

    const focus = () => editorRef.current.focus();
    const onChange = (editorState) => setEditorState(editorState);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    };

    const toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    };

    const toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    };

    const save = async (rawContent) => {
        if(rawContent == ""){
            const contentState = editorState.getCurrentContent();

            // console.log("SAVED. THE CONTENT STATE: " + contentState);
            rawContent = JSON.stringify(convertToRaw(contentState));
        }
        else{
            const contentState = ContentState.createFromText(rawContent);
            const editorStateFromText = EditorState.createWithContent(contentState);
            rawContent = JSON.stringify(convertToRaw(editorStateFromText.getCurrentContent()));
        }

        const pageId = props.pageId;

        // console.log("SAVED: THE RAW CONTENT: " + rawContent);

        try {
            const response = await savePageContent(pageId, rawContent);
            // console.log('Content saved successfully:', response);
        } catch (err) {
            console.error('Failed to save content:', err);
        }
    };

    const load = async () => {
      try{
        const pageId = props.pageId;

        const response = await loadPageContent(pageId);

        if(response) {
          const contentState = convertFromRaw(response);
          setEditorState(EditorState.createWithContent(contentState));
        }

        // console.log('LOAD: Content loaded successfully:', response);
      } catch (err) {
        console.error('Failed to load content:', err);
      }  
  };

    // Expose the save method to parent components
    useImperativeHandle(ref, () => ({
        save, load
    }));

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    return (
        <div className="RichEditor-root">
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />
            <div className={className} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    placeholder="Enter text here. Press Ctrl + S to save text."
                    ref={editorRef}
                    spellCheck={true}
                />
            </div>
        </div>
    );
});

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;

