import "./Dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard(){

    const role = localStorage.getItem("role");

    if(role !== "Admin"){

        window.location.href="/";

    }

    const [counts,setCounts] = useState({

        total:0,
        active:0,
        resolved:0

    });

    const [alarms,setAlarms] = useState([]);

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [severity,setSeverity] = useState("");
    const [status,setStatus] = useState("");

    const [search,setSearch] = useState("");
    const [filter,setFilter] = useState("All");

    const data = [

        {
            name:"Active",
            value:counts.active
        },

        {
            name:"Resolved",
            value:counts.resolved
        }

    ];

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

    };

    const fetchAlarms = async()=>{

        try{

            const response = await axios.get(
                "http://localhost:5000/api/alarms"
            );

            setAlarms(response.data);

        }catch(err){

            console.log(err);

        }

    };

    const createAlarm = async()=>{

        try{

            await axios.post(
                "http://localhost:5000/api/alarms/create",
                {
                    title,
                    description,
                    severity,
                    status
                }
            );

            toast.success("Alarm Created Successfully");

            fetchAlarms();
            fetchCounts();

            setTitle("");
            setDescription("");
            setSeverity("");
            setStatus("");

        }catch(err){

            console.log(err);

        }

    };

    const deleteAlarm = async(id)=>{

        try{

            await axios.delete(
                `http://localhost:5000/api/alarms/delete/${id}`
            );

            toast.error("Alarm Deleted");

            fetchAlarms();
            fetchCounts();

        }catch(err){

            console.log(err);

        }

    };

    const updateStatus = async(id)=>{

        try{

            await axios.put(
                `http://localhost:5000/api/alarms/update/${id}`,
                {
                    status:"Resolved"
                }
            );

            toast.info("Alarm Resolved");

            fetchAlarms();
            fetchCounts();

        }catch(err){

            console.log(err);

        }

    };

    const filteredAlarms = alarms.filter((alarm)=>{

        const matchesSearch = alarm.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =

            filter === "All"
            ||
            alarm.severity === filter
            ||
            alarm.status === filter;

        return matchesSearch && matchesFilter;

    });

    return(

        <div className="dashboard">

            <div className="topbar">

                <h1>Admin Dashboard</h1>

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

            <div className="sidebar">

                <h2>APP360</h2>

                <ul>

                    <li>Dashboard</li>
                    <li>Alarms</li>
                    <li>Users</li>
                    <li>Reports</li>
                    <li>Settings</li>

                </ul>

            </div>

            <div className="main">

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

                <div className="alarm-form">

                    <h2>Create Alarm</h2>

                    <input
                        type="text"
                        placeholder="Alarm Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <select
                        value={severity}
                        onChange={(e)=>setSeverity(e.target.value)}
                    >

                        <option value="">
                            Select Severity
                        </option>

                        <option>Critical</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>

                    </select>

                    <select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                    >

                        <option value="">
                            Select Status
                        </option>

                        <option>Active</option>
                        <option>Resolved</option>

                    </select>

                    <button onClick={createAlarm}>
                        Create Alarm
                    </button>

                </div>

                <div className="filter-section">

                    <input
                        type="text"
                        placeholder="Search Alarm..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={filter}
                        onChange={(e)=>setFilter(e.target.value)}
                        className="filter-select"
                    >

                        <option value="All">
                            All
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                        <option value="High">
                            High
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Low">
                            Low
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Resolved">
                            Resolved
                        </option>

                    </select>

                </div>

                <div className="charts">

                    <div className="chart-box">

                        <h2>Alarm Status Overview</h2>

                        <PieChart width={350} height={300}>

                            <Pie
                                data={data}
                                dataKey="value"
                                outerRadius={100}
                                label
                            >

                                <Cell fill="#ff4d4d" />
                                <Cell fill="#4CAF50" />

                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>

                    </div>

                    <div className="chart-box">

                        <h2>Alarm Analytics</h2>

                        <BarChart
                            width={400}
                            height={300}
                            data={data}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="value"
                                fill="#007bff"
                            />

                        </BarChart>

                    </div>

                </div>

                <h2 className="table-title">
                    Alarm List
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

                        {filteredAlarms.map((alarm)=>(

                            <tr key={alarm._id}>

                                <td>{alarm.title}</td>

                                <td>{alarm.description}</td>

                                <td>{alarm.severity}</td>

                                <td>{alarm.status}</td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>deleteAlarm(alarm._id)}
                                    >
                                        Delete
                                    </button>

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

            <ToastContainer />

        </div>

    );

}

export default AdminDashboard;