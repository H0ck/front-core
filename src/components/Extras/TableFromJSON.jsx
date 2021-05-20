import React, { useState } from "react";
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

import { Card, ProgressBar, Table } from 'react-bootstrap'
import _ from 'lodash';



const TableFromJSON = ({ json }) => {
    let keyList = [];
    const [jsonObject, setJsonObject] = useState(json);
        let arrayMode = json instanceof Array;
        let tBody;
        if (arrayMode){
            const getKeysFunction = _.spread(_.union);
           keyList = getKeysFunction(jsonObject.map(Object.keys))
           console.log(keyList)
           tBody = json.map(element=>{
               return <tr>{keyList.map(key=>{ return <td>{element[key]}</td>})}</tr>
           })
           
        } else {
           tBody = jsonObject && Object.entries(jsonObject).map(entry => {
                return <tr>
                    <td>{entry[0]}</td>
                    <td>{JSON.stringify(entry[1])}</td>
                </tr>
        })}
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                   { keyList.map(key=><th>{key}</th>)}
              
                </tr>
            </thead>
            <tbody>
                {tBody}
            </tbody>

        </Table>
    )

}

export default TableFromJSON;