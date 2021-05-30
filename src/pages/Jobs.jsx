import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, FormLabel, Dropdown, Card, Row, Col } from 'react-bootstrap';
import CodeMirrorComponent from '../components/Extras/CodeMirrorComponent';
import _ from 'lodash';
import axios from 'axios';


const Jobs = () => {

  let [paramsCount, setParamsCount] = useState(1);
  const [fields, setFields] = useState(
    {
      "title": "My Job title",
      "framework": "h0ck-framework-testing",
      "configuration.limits.parallelExecutions": "10",
      "configuration.limits.requestPerSecond": "1",
      "configuration.limits.virtualUserExecutions": "1",
      "parametrizationGroups[0].parameters[0].name": "param1",
      "parametrizationGroups[0].parameters[0].type": "list",
      "parametrizationGroups[0].parameters[0].definition": "valueParam1, valueParam2, valueParam2"
    }
  );

  function onChange(e) {

    setFields({ ...fields, [e.target.name]: e.target.value })

  }

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    let codeMirror = document.querySelector(".CodeMirror").CodeMirror;
    if (codeMirror) {
      codeMirror.setSize(600, 200)
    }
    console.log(fields)


  });


  function addParam() {
    let nextParam = paramsCount +1;
    let newFields = {}
    newFields["parametrizationGroups[0].parameters[" + paramsCount + "].name"] = "param" + nextParam
    newFields["parametrizationGroups[0].parameters[" + paramsCount + "].type"] = "list"
    newFields["parametrizationGroups[0].parameters[" + paramsCount + "].definition"] = "valueParam" + nextParam
    setFields({
      ...fields, ...newFields})

    setParamsCount(nextParam)

  }

  function removeParam() {
    if (paramsCount < 2) {
      //TODO: Move to alert bootstrap
      console.log("You should have 1 param at least");
      return;
    }
    setParamsCount(paramsCount - 1)
  }

  function createJob() {
    let job = {};
    console.log(job)
    Object.entries(fields).forEach((entry) => {
      _.set(job, entry[0], entry[1]);
    })
    job.code = document.querySelector(".CodeMirror").CodeMirror.getValue();
    axios.post(process.env.REACT_APP_CORE_API  + "/api/v1/jobs", job).then(response => {
      console.log("Job created: ", response)
    }).catch(err => {
      console.error("Error creating JOB: " + err);
    })
    console.log(job);
  }


  const paramsRender = () => {
    let arrayParamsCount = Array.from({ length: paramsCount }, (v, i) => i)

    let toRender = arrayParamsCount.map(value => {

      return (
        <div>
          <Card>
            <Card.Body>
              <Form.Label>Param name</Form.Label>
              <Form.Control onChange={onChange} value={fields["parametrizationGroups[0].parameters[" + value + "].name"]} name={"parametrizationGroups[0].parameters[" + value + "].name"} size="sm" type="text" placeholder={"param" + value} />
              <Form.Label>Param Source Type</Form.Label>
              <Form.Control onChange={onChange} value={fields["parametrizationGroups[0].parameters[" + value + "].type"]} name={"parametrizationGroups[0].parameters[" + value + "].type"} size="sm" as="select">
                <option value="list">List</option>
                <option value="urlList">List from URL</option>
                <option value="ranges">Ranges</option>
              </Form.Control>
              <Form.Label>Param definition</Form.Label>
              <Form.Control onChange={onChange} value={fields["parametrizationGroups[0].parameters[" + value + "].definition"]} name={"parametrizationGroups[0].parameters[" + value + "].definition"} size="sm" type="text" placeholder="param1, param2, param3 || URL || 0-100, 300-500" />
            </Card.Body>
          </Card>
          <br></br>
        </div>
      )
    })


    return (
      <div>
        {toRender}
      </div>
    )
  }


  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        width: '50%',
      }}
    >
      <h3>Create a Job</h3>
      <Form id="FORM1">

        <Form.Group controlId="formJobTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={onChange} value={fields["title"]} name={"title"} size="sm" type="text" placeholder="My job title" />
        </Form.Group>
        <br></br>
        <Form.Label>Framework</Form.Label>
        <Form.Control onChange={onChange} value={fields["framework"]} name={"framework"} size="sm" as="select">
                <option value="h0ck-framework-testing">Testing Framework</option>
                <option value="h0ck-framework-scraping">Scraping Framework</option>
                <option value="h0ck-framework-core">Core Framework</option>
              </Form.Control>
        <br></br>
        <Form.Label>Code</Form.Label>
        <CodeMirrorComponent type={'javascript'} defaultCode={"module.exports.main = async function(params){ \n return params \n }"}></CodeMirrorComponent>

        <Form.Label><h4>Parametrization</h4></Form.Label>
        <br></br>
        {paramsRender()}

        <Button onClick={addParam} size="sm">Add param</Button>
        <Button onClick={removeParam} variant="danger" size="sm">Remove param</Button>
        <br></br>
        <br></br>

        <Form.Group controlId="formJobConfig">
          <Form.Label><h4>Configuration</h4></Form.Label>
          <br></br>
          <Card>
            <Card.Body>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Max Parallel Executions</Form.Label>
                    <Form.Control onChange={onChange} value={fields["configuration.limits.parallelExecutions"]} name={"configuration.limits.parallelExecutions"} size="sm" type="number" placeholder="10" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Max executions per virtual user / IP</Form.Label>
                    <Form.Control onChange={onChange} value={fields["configuration.limits.virtualUserExecutions"]} name={"configuration.limits.virtualUserExecutions"} size="sm" type="number" placeholder="10" />
                  </Form.Group>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>N of Requests per [time unit]</Form.Label>
                    <Form.Control onChange={onChange} value={fields["configuration.limits.requestPerSecond"]} name={"configuration.limits.requestPerSecond"} size="sm" type="number" placeholder="10" />

                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>Time Unit</Form.Label>

                    <Form.Control size="sm" as="select">
                      <option value="seconds">Seconds</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

              </Row>
            </Card.Body>
          </Card>
        </Form.Group>
        <br></br>
        <Button onClick={createJob}>Create Job</Button>
      </Form>
    </div>
  );
};

export default Jobs;