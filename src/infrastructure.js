import axios from 'axios';


let infrastructure = new Promise((resolve, reject)=>{
    axios.get("./infrastructure.json").then(d=>{resolve(d.data)}).catch(err=>reject(err));
})



export default function getInfrastructure(){
    return infrastructure;
};
