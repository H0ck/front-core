import React from 'react';
import CodeMirrorComponent from '../components/Extras/CodeMirrorComponent';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const Tester = () => {

  async function executeLamda(){

    let codeMirrorsDOM = document.querySelectorAll('.CodeMirror');
    var codeMirrorParams = codeMirrorsDOM[0].CodeMirror;
    var codeMirrorInput = codeMirrorsDOM[1].CodeMirror;
    var codeMirrorOutput = codeMirrorsDOM[2].CodeMirror;

    console.log('Executing lambda')
    console.log(codeMirrorInput.getValue())
    await axios.post('https://bpqkym2894.execute-api.eu-west-3.amazonaws.com/default/scriptExecutor', {
        script: JSON.parse(JSON.stringify(codeMirrorInput.getValue())),
        config: codeMirrorParams.getValue()
    }).then(response=>{
      codeMirrorOutput.setValue(response.data);
    }).catch((err)=>{
      codeMirrorOutput.setValue(JSON.stringify(err));
    })

  }

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '50%'
      }}
    >
      <h1>Tester</h1>
      <h2> Input params: </h2>
      <CodeMirrorComponent id="codeInput" type={'javascript'} defaultCode={'{"param1": "value1", "param2": "value2"}'}></CodeMirrorComponent>
      <h2> Code: </h2>
      <CodeMirrorComponent type={'javascript'} defaultCode={"module.exports.main = async function(params){ \n return 'Hello World!' \n }"}></CodeMirrorComponent>
      <Button type="button" onClick={executeLamda} class="btn btn-primary">Execute</Button>
      <CodeMirrorComponent id="codeOutput" type={'javascript'} defaultCode={"Hello World!"}></CodeMirrorComponent>
     
    </div>
  );
};

export default Tester;