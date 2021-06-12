

import React, { useState, useEffect } from 'react';
import { Card, ProgressBar, Table, Button, Collapse } from 'react-bootstrap'
import axios from 'axios';
import TableFromJSON from '../Extras/TableFromJSON';
import getInfrastructure from '../../infrastructure';


const JobDisplay = ({ job }) => {

    const [resume, setResume] = useState([])
    const [paramsOpen, setParamsOpen] = useState(false)
    const [processorsResult, setProcessorsResults] = useState([])

    async function loadResult() {
        let infrastructure = await getInfrastructure();
        axios.post(infrastructure.h0ck_core + "/api/v1/jobs/" + job.id + "/resultProcessors/resumeVariances/process").then(result => {
            setResume(result.data)
            console.log(result.data)
        });

        if (job.resultProcessors){
            let processorsResult = await Promise.all(job.resultProcessors.map(async (resultProcessor) => {
                let resultProcessed = (await axios.post(infrastructure.h0ck_core  + "/api/v1/jobs/" + job.id + "/resultProcessors/" + resultProcessor.name + "/process")).data
                return { name: resultProcessor.name, result: resultProcessed }
            }))
            setProcessorsResults(processorsResult)
        }
        
    }

    useEffect(() => {
        loadResult()
    }, [])





    return (
        <>
            <Card>
                <Card.Header>
                    {job.title}
                </Card.Header>
                <Card.Body>
                    ID:
                    <p>{job.id}</p>
                    <h5>Configuration:</h5>
                    {Object.keys(job.configuration.limits).map(configKey => {
                        return <div>{configKey + ": " + JSON.stringify(job.configuration.limits[configKey])}</div>
                    })}
                    <br></br>
                    <h5>Parametrization Groups:</h5>
                    <Button
                        onClick={() => setParamsOpen(!paramsOpen)}
                        aria-controls="paramsCollapse"
                        aria-expanded={paramsOpen}>
                        ⬇
                    </Button>
                    <Collapse in={paramsOpen}>
                        <div id="paramsCollapse">
                            {job.parametrizationGroups.map(paramGroup => {
                                return <TableFromJSON json={paramGroup.parameters}></TableFromJSON>
                            })}
                        </div>
                    </Collapse>
                    <br></br>
                    <br></br>

                    <h5>Status:</h5>
                    Current executions: {job.status.currentExecutions}
                    <br></br>
                    Progress: {job.status.currentIndex}/{job.taskCount}
                    <br></br>
                    <ProgressBar animated={job.status.currentIndex !== job.taskCount} variant="success" now={job.status.currentIndex} max={job.taskCount}></ProgressBar>

                    <br></br>
                    <h5>Results:</h5>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Count</th>
                                <th>Variances</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                resume?.fields && Object.keys(resume?.fields).map(field => {
                                    let fieldValue = resume.fields[field];
                                    return <tr>
                                        <td>{field}</td>
                                        <td>{fieldValue.count}</td>
                                        <td>{fieldValue.variancesCount}</td>
                                        <td>--</td>
                                    </tr>
                                })}
                        </tbody>

                    </Table>


                    {processorsResult.map(resultProcessorResult => {
                        return <div>
                            <h4>{resultProcessorResult.name}</h4>
                            <TableFromJSON json={resultProcessorResult.result}></TableFromJSON>
                        </div>
                    }
                    )}

                </Card.Body>
            </Card>
            <br></br>
        </>

    );
};

export default JobDisplay;
