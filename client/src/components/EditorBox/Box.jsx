import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react"

const Box = (props) => {
    const [editorValue, setEditorValue] = useState(props.value || "");

    // Update editor value when props.value changes
    useEffect(() => {
        setEditorValue(props.value || "");
    }, [props.value]);

    return (
        <>
            <div className= {(props.theme==="vs-dark")? "text-center bg-light" : "text-center bg-dark text-light"}>
                <strong>{props.feature}</strong>
            </div>
            <section>
            <Editor
                defaultLanguage="plaintext"
                height="21vh"
                theme={props.theme}
                value={editorValue}
                options={{ 
                    fontSize: props.fontSize,
                    readOnly: true, // Make it read-only to prevent interference
                    minimap: { enabled: false }
                }}
            />
            </section>
        </>
    )
}

export default Box
