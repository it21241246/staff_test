import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Toast from "../components/CustomToasts";
import { Form, Button } from 'react-bootstrap';


function UpdateStudent() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [address, setaddress] = useState("");
    const [dob, setdob] = useState("");
    const [gender, setgender] = useState("");
    const [mobile, setmobile] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8070/student/${id}`)
          .then(res => res.json())
          .then(data => {
            setName(data.name);
            setaddress(data.address);
            setdob(data.dob);
            setgender(data.gender);
            setmobile(data.mobile);
            setemail(data.email);
            setpassword(data.password);

          })
          .catch(err => console.log(err));
      }, [id]);


  function handleSubmit(e) {
    e.preventDefault();
    
    fetch(`http://localhost:8070/student/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name,address,dob,gender,mobile,email,password })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }


  return (
    // style={{padding:'80px 0px'}}
    <section>
      <div className="container col-lg-5">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group py-3">
            <h4>Update Inventory</h4>
          </div>

          <div className="form-group">
            {/* image */}
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder=""
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="address" className="mt-2">
              Available Quantity
            </label>
            
              <input
                type="text"
                placeholder="Enter  address"
                className="form-control"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
             
            <label htmlFor="dob" className="mt-2">
              DoB
            </label>
            <input
              type="text"
              placeholder="Enter dob"
              className="form-control"
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />
            <label htmlFor="gender" className="mt-2">
                Gender
          </label>
            <input
              type="text"
              placeholder="Enter Date Of Purchase"
              className="form-control"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />
            <label htmlFor="mobile" className="mt-2">
                mobile
          </label>
            <input
              type="text"
              placeholder="Enter Date Of Purchase"
              className="form-control"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />

            <label htmlFor="email" className="mt-2">
                email
          </label>
            <input
              type="text"
              placeholder="Enter Date Of Purchase"
              className="form-control"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <label htmlFor="password" className="mt-2">
                password
          </label>
            <input
              type="text"
              placeholder="Enter Date Of Purchase"
              className="form-control"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            
          </div>
          <button className="btn btn-success mt-2">Save</button>
          
        </form><br/>
        <Link to="/addstudent" className="btn btn-success">
              Add inventory
            </Link>
        
      </div>
    </section>
  );
};

export default UpdateStudent;
