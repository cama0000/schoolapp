// import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
// import React from 'react';
// import './RichText.css';


// class RichTextEditor extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {editorState: EditorState.createEmpty()};

//       this.focus = () => this.refs.editor.focus();
//       this.onChange = (editorState) => this.setState({editorState});

//       this.handleKeyCommand = this._handleKeyCommand.bind(this);
//       this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//       this.toggleBlockType = this._toggleBlockType.bind(this);
//       this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//     }

//     _handleKeyCommand(command, editorState) {
//       const newState = RichUtils.handleKeyCommand(editorState, command);
//       if (newState) {
//         this.onChange(newState);
//         return true;
//       }
//       return false;
//     }

//     _mapKeyToEditorCommand(e) {
//       if (e.keyCode === 9 /* TAB */) {
//         const newEditorState = RichUtils.onTab(
//           e,
//           this.state.editorState,
//           4, /* maxDepth */
//         );
//         if (newEditorState !== this.state.editorState) {
//           this.onChange(newEditorState);
//         }
//         return;
//       }
//       return getDefaultKeyBinding(e);
//     }

//     _toggleBlockType(blockType) {
//       this.onChange(
//         RichUtils.toggleBlockType(
//           this.state.editorState,
//           blockType
//         )
//       );
//     }

//     _toggleInlineStyle(inlineStyle) {
//       this.onChange(
//         RichUtils.toggleInlineStyle(
//           this.state.editorState,
//           inlineStyle
//         )
//       );
//     }

//     async save(){
//         const contentState = this.state.editorState.getCurrentContent();
//         const rawContent = JSON.stringify(convertToRaw(contentState));
//         const pageId = this.props.pageId;

//         try{
//             console.log("THE ID FROM TEXTEDITOR IS " + pageId)
//             const response = await savePageContent(pageId, rawContent);
//             console.log('Content saved successfully:', response);
//           }
//           catch(err){
//             console.error('Failed to save content:', err);
//           }
//     }

//     render() {
//       const {editorState} = this.state;

//       // If the user changes block type before entering any text, we can
//       // either style the placeholder or hide it. Let's just hide it now.
//       let className = 'RichEditor-editor';
//       var contentState = editorState.getCurrentContent();
//       if (!contentState.hasText()) {
//         if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//           className += ' RichEditor-hidePlaceholder';
//         }
//       }

//       return (
//         <div className="RichEditor-root">
//           <BlockStyleControls
//             editorState={editorState}
//             onToggle={this.toggleBlockType}
//           />
//           <InlineStyleControls
//             editorState={editorState}
//             onToggle={this.toggleInlineStyle}
//           />
//           <div className={className} onClick={this.focus}>
//             <Editor
//               blockStyleFn={getBlockStyle}
//               customStyleMap={styleMap}
//               editorState={editorState}
//               handleKeyCommand={this.handleKeyCommand}
//               keyBindingFn={this.mapKeyToEditorCommand}
//               onChange={this.onChange}
//               placeholder="Enter text..."
//               ref="editor"
//               spellCheck={true}
//             />
//           </div>
//         </div>
//       );
//     }
//   }

//   // Custom overrides for "code" style.
//   const styleMap = {
//     CODE: {
//       backgroundColor: 'rgba(0, 0, 0, 0.05)',
//       fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//       fontSize: 16,
//       padding: 2,
//     },
//   };

//   function getBlockStyle(block) {
//     switch (block.getType()) {
//       case 'blockquote': return 'RichEditor-blockquote';
//       default: return null;
//     }
//   }

//   class StyleButton extends React.Component {
//     constructor() {
//       super();
//       this.onToggle = (e) => {
//         e.preventDefault();
//         this.props.onToggle(this.props.style);
//       };
//     }

//     render() {
//       let className = 'RichEditor-styleButton';
//       if (this.props.active) {
//         className += ' RichEditor-activeButton';
//       }

//       return (
//         <span className={className} onMouseDown={this.onToggle}>
//           {this.props.label}
//         </span>
//       );
//     }
//   }

//   const BLOCK_TYPES = [
//     {label: 'H1', style: 'header-one'},
//     {label: 'H2', style: 'header-two'},
//     {label: 'H3', style: 'header-three'},
//     {label: 'H4', style: 'header-four'},
//     {label: 'H5', style: 'header-five'},
//     {label: 'H6', style: 'header-six'},
//     {label: 'Blockquote', style: 'blockquote'},
//     {label: 'UL', style: 'unordered-list-item'},
//     {label: 'OL', style: 'ordered-list-item'},
//     {label: 'Code Block', style: 'code-block'},
//   ];

//   const BlockStyleControls = (props) => {
//     const {editorState} = props;
//     const selection = editorState.getSelection();
//     const blockType = editorState
//       .getCurrentContent()
//       .getBlockForKey(selection.getStartKey())
//       .getType();

//     return (
//       <div className="RichEditor-controls">
//         {BLOCK_TYPES.map((type) =>
//           <StyleButton
//             key={type.label}
//             active={type.style === blockType}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         )}
//       </div>
//     );
//   };

//   var INLINE_STYLES = [
//     {label: 'Bold', style: 'BOLD'},
//     {label: 'Italic', style: 'ITALIC'},
//     {label: 'Underline', style: 'UNDERLINE'},
//     {label: 'Monospace', style: 'CODE'},
//   ];

//   const InlineStyleControls = (props) => {
//     const currentStyle = props.editorState.getCurrentInlineStyle();
    
//     return (
//       <div className="RichEditor-controls">
//         {INLINE_STYLES.map((type) =>
//           <StyleButton
//             key={type.label}
//             active={currentStyle.has(type.style)}
//             label={type.label}
//             onToggle={props.onToggle}
//             style={type.style}
//           />
//         )}
//       </div>
//     );
//   };

// export default RichTextEditor;



import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw, convertFromRaw } from 'draft-js';
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

    const save = async () => {
        const contentState = editorState.getCurrentContent();

        console.log("TJE CONTENT STATE: " + contentState);
        const rawContent = JSON.stringify(convertToRaw(contentState));
        const pageId = props.pageId;

        console.log("THS IS THE PAGEEEE: " + pageId);

        try {
            const response = await savePageContent(pageId, rawContent);
            console.log('Content saved successfully:', response);
        } catch (err) {
            console.error('Failed to save content:', err);
        }
    };

    const load = async () => {
      try{
        const pageId = props.pageId;

        console.log("THE PAGE FOR REAL IS : " + pageId);
        const response = await loadPageContent(pageId);

        console.log("RESPONE IS : " + response.content)

        if(response) {
          const contentState = convertFromRaw(response);
          setEditorState(EditorState.createWithContent(contentState));
        }

        // const contentState = convertFromRaw(response);

        // editorState.current.setEditorState(contentState);

        console.log('Content loaded successfully:', response);
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
                    placeholder="Enter text..."
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

export default RichTextEditor;

