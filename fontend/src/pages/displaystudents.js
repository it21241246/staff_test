import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/Sidebar";
//import "./ModuleDisplayInventory.css";


function Display() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/student/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(id) {
    if (!id) {
        console.log('Invalid ID');
        return;
      }
    fetch(`http://localhost:8070/student/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setData((prevData) => prevData.filter(item => item._id !== id));
      })
      .catch((err) => console.log(err));
  }

  const filteredData = data.filter((Student) =>
    Student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function GenReport() {
    axios
      .get("http://localhost:8070/student/report", {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        const currentDate = new Date().toISOString().slice(0,10);
        link.href = url;
        link.setAttribute('download', `inventory_report_${currentDate}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  }

 

  return (

    <div>
      {/* <Sidebar/> */}
      <div className="d-flex justify-content-center">
      <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <div className=" bg-white rounded p-3">
          <div className="centerItems">
            <h3>Student Management</h3>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <Link to="/addstudent" className="btn btn-success">
              Add Student
            </Link>

            <button className="btn btn-success" onClick={() => {GenReport()}}>Report</button>

            
          </div>
          <Table striped bordered hover variant="dark" className="mt-2">
            <thead>
              <tr>
                <th scope="col">name</th>
                <th scope="col">address</th>
                <th scope="col">dob</th>
                <th scope="col">gender</th>
                <th scope="col">mobile</th>
                <th scope="col">email</th>
                <th scope="col">password</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((data) => (
                <tr>
                  <td className="text-center">
                    <input
                      type="text"
                      value={name || data.name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                    <td className="text-center"> <input type="text" value={address || data.address} onChange={(e) => setaddress(e.target.value)} /></td>
                    <td className="text-center"> <input type="text" value={dob || data.dob} onChange={(e) => setdob(e.target.value)} /></td>
                    <td className="text-center"> <input type="text" value={gender || data.gender} onChange={(e) => setgender(e.target.value)} /></td>
                    <td className="text-center"> <input type="text" value={mobile || data.mobile} onChange={(e) => setmobile(e.target.value)} /></td>
                    <td className="text-center"> <input type="text" value={email || data.email} onChange={(e) => setemail(e.target.value)} /></td>
                    <td className="text-center"> <input type="text" value={password || data.password} onChange={(e) => setpassword(e.target.value)} /></td>
                    <button onClick={() => handleDelete(data._id)}>Delete</button><Link to={`/update/${data._id}`}>Edit</Link>
                   
                    
                    
                 
                  </tr>
                ))}
                
            </tbody>
           
          </Table>
          
            
        </div>
      </div>
    </div>
    </div>
  );
};

export default Display;