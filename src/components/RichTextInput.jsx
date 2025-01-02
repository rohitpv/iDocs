import React, { useState, useRef, useEffect } from 'react';

const RichTextInput = ({ 
  value, 
  onChange, 
  minLength = 5, 
  required = false,
  placeholder = 'Start typing here...',
  className = 'form-control',
  id = 'description',
  name = 'description'
}) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync the HTML content with external value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange({ 
        target: { 
          id,
          name, 
          value: content,
          type: 'richtext'
        } 
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = (e.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false, null);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false, null);
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline', false, null);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="rich-text-wrapper">
      <div 
        className="rich-text-toolbar"
        style={{
          padding: '8px',
          borderBottom: '1px solid #dee2e6',
          background: '#f8f9fa',
          display: 'flex',
          gap: '8px',
        }}
      >
        {['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList'].map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => document.execCommand(command, false, null)}
            style={{
              padding: '4px 8px',
              background: 'white',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {command === 'bold' && <b>B</b>}
            {command === 'italic' && <i>I</i>}
            {command === 'underline' && <u>U</u>}
            {command === 'insertUnorderedList' && '• List'}
            {command === 'insertOrderedList' && '1. List'}
          </button>
        ))}
      </div>
      
      <div
        ref={editorRef}
        contentEditable="true"
        className={className}
        id={id}
        name={name}
        onInput={handleChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          minHeight: '150px',
          padding: '12px',
          outline: 'none',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: '1.5',
          background: isFocused ? '#fff' : '#f8f9fa',
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        required={required}
      />
    </div>
  );
};

export default RichTextInput;