import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewerDashboard(){

    const role = localStorage.getItem("role");

    if(role !== "Viewer"){

        window.location.href="/";

    }

    const [counts,setCounts] = useState({

        total:0,
        active:0,
        resolved:0

    });

    const [alarms,setAlarms] = useState([]);

    useEffect(()=>{

        fetchCounts();
        fetchAlarms();

    },[]);

    const fetchCounts = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/alarms/dashboard/counts"
            );

            setCounts(response.data);

        }catch(err){

            console.log(err);

        }

    }

    const fetchAlarms = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/alarms"
            );

            setAlarms(response.data);

        }catch(err){

            console.log(err);

        }

    }

    return(

        <div className="dashboard">

            <div className="sidebar">

                <h2>APP360</h2>

                <ul>

                    <li>Viewer Panel</li>
                    <li>Dashboard</li>
                    <li>Monitoring</li>

                </ul>

            </div>

            <div className="main">

                <div className="topbar">

                    <h1>Viewer Dashboard</h1>

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

                <div className="cards">

                    <div className="card">

                        <h3>Total Alarms</h3>

                        <p>{counts.total}</p>

                    </div>

                    <div className="card">

                        <h3>Active Alarms</h3>

                        <p>{counts.active}</p>

                    </div>

                    <div className="card">

                        <h3>Resolved Alarms</h3>

                        <p>{counts.resolved}</p>

                    </div>

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

                        </tr>

                    </thead>

                    <tbody>

                        {alarms.map((alarm)=>(

                            <tr key={alarm._id}>

                                <td>{alarm.title}</td>

                                <td>{alarm.description}</td>

                                <td>{alarm.severity}</td>

                                <td>{alarm.status}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ViewerDashboard;