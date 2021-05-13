

import React, {useState, useEffect} from 'react';
import { Card, ProgressBar, Table } from 'react-bootstrap'
import axios from 'axios';


const JobDisplay = ({ job, resume }) => {

    const [Result, setResult] = useState([])
    function loadResult() {
        axios.get("http://localhost:10000/api/v1/jobs/" + job.id +"/results").then(result => {
          setResult(result.data)
          console.log("RESULTS", result) 
        });
      }
    
      useEffect(() => {
        loadResult()
      }, [])


      console.log(Result)
      let resultDemo = Result?.map(res=>{
          
       return  <div>
          <span>{res.params?.profile} - </span> 
          <span>{res.params?.userType} - </span>
          <span>{res.timings.responseAverage} </span>

           </div>
        
    });
    let demo = <> {resultDemo} </>
    console.log(job)
    return (
        <>
            <Card>
                <Card.Header>
                    {job.title}
                </Card.Header>
                <Card.Body>
                    <h5>Configuration:</h5>
                    {Object.keys(job.configuration.limits).map(configKey => {
                        return <div>{configKey + ": " + JSON.stringify(job.configuration.limits[configKey])}</div>
                    })}
                    <br></br>
                    <h5>Params:</h5>
                    {job.parametrizationGroups[0].parameters.map(param => {
                        return <div>{JSON.stringify(param)}</div>
                    })}
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
                            {Object.keys(resume.fields).map(field=>{
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
                        
                    {demo
                    }

                </Card.Body>
            </Card>
            <br></br>
        </>

    );
};

export default JobDisplay;
