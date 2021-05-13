import React, { useState } from "react";
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
var CodeMirror = require('react-codemirror');

const CodeMirrorComponent = ({ id, type,  defaultCode }) => {
    const [code, setCode] = useState(defaultCode);
    const style = {
            "text-align": "left",
    }

    var options = {
        mode: type,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
    };
    return (
        <div style={style}>
            <CodeMirror id={id} value={code} onChange={setCode} options={options} />
        </div>
    )

}

export default CodeMirrorComponent;