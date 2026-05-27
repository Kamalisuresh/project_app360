import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

function EngineerDashboard(){

    const role = localStorage.getItem("role");

    if(role !== "Engineer"){

        window.location.href="/";

    }

    const [alarms,setAlarms] = useState([]);

    useEffect(()=>{

        fetchAlarms();

    },[]);

    const fetchAlarms = async()=>{

        try{

            const response = await axios.get(
                `https://app360-backend.onrender.com/api/alarms/update/${id}`,
            );

            setAlarms(response.data);

        }catch(err){

            console.log(err);

        }

    }

    const updateStatus = async(id)=>{

        try{

            await axios.put(
                `https://app360-backend.onrender.com/api/alarms/update/${id}`,
                {
                    status:"Resolved"
                }
            );

            alert("Alarm Resolved");

            fetchAlarms();

        }catch(err){

            console.log(err);

        }

    }

    return(

        <div className="dashboard">

            <div className="sidebar">

                <h2>APP360</h2>

                <ul>

                    <li>Engineer Panel</li>
                    <li>Alarms</li>
                    <li>Monitoring</li>

                </ul>

            </div>

            <div className="main">

                <div className="topbar">

                    <h1>Engineer Dashboard</h1>

                    <button
                        className="logout-btn"
                        onClick={()=>{

                            localStorage.clear();
                            window.location.href="/";

                        }}
                    >
                        Logout
                    </button>

                </div>

                <h2 className="table-title">
                    Alarm Monitoring
                </h2>

                <table className="alarm-table">

                    <thead>

                        <tr>

                            <th>Title</th>
                            <th>Description</th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {alarms.map((alarm)=>(

                            <tr key={alarm._id}>

                                <td>{alarm.title}</td>

                                <td>{alarm.description}</td>

                                <td>{alarm.severity}</td>

                                <td>{alarm.status}</td>

                                <td>

                                    <button
                                        className="update-btn"
                                        onClick={()=>updateStatus(alarm._id)}
                                    >
                                        Resolve
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default EngineerDashboard;