import React,{useState} from 'react'
import axios from 'axios';


export default function Addstudent(){

    const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
    

    function sendData(e){
        e.preventDefault();

        const newStudent = {
            name,
            address,
            dob,
            gender,
            mobile,
            email,
            password
        }

        axios.post("http://localhost:8070/student/add",newStudent).then(()=>{
            alert("student added")
        }).catch((err)=>{
            alert (err)

        })
    }


    return(
        <div>
            <form onSubmit={sendData}>

                <h1>Add New Student</h1>

                <div class="mb-3">    
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" 
                onChange={(e)=>
                    setName(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="gender" >Gender</label>
                <input ptype="text" class="form-control" id="gender" 
                onChange={(e)=>
                    setgender(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address"
                onChange={(e)=>
                    setaddress(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="dob" >Dob</label>
                <input type="text" class="form-control" id="dob"
                onChange={(e)=>
                    setdob(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="email" >email</label>
                <input type="text" class="form-control" id="email" 
                onChange={(e)=>
                    setemail(e.target.value)
                }
                ></input>
                </div>


                <div class="mb-3">    
                <label for="mobile" >Mobile Number</label>
                <input pattern=".{10,10}" type="text" class="form-control" id="mobile"
                onChange={(e)=>
                    setmobile(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="password">password address</label>
                <input type="password" class="form-control" id="password" 
                onChange={(e)=>
                    setpassword(e.target.value)
                }
                ></input>
                </div>

                

                <button type="submit" class="btn btn-primary">submit</button>
                <div/>
                <br></br>
                <button type="submit" class="btn btn-primary">Back</button>
            </form>

        </div>
    )
}