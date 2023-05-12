import React,{useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

export default function AddTeacher(){

    const [name,setName] = useState ("");
    const [nic,setNic] = useState ("");
    const [address,setAddress] = useState ("");
    const [age,setAge] = useState ("");
    const [gender,setGender] = useState ("");
    const [land,setLand] = useState ("");
    const [mobile,setMobile] = useState ("");
    const [email,setEmail] = useState ("");
    const [subject,setSubject] = useState ("");
    const [password, setpassword] = useState("");

    function sendData(e){
        e.preventDefault();

        const newTeacher = {
            name,
            nic,
            address,
            age,
            gender,
            land,
            mobile,
            email,
            subject,
            password
        }

        axios.post("http://localhost:8070/teacher/addT",newTeacher).then(()=>{
            alert("Teacher added")
        }).catch((err)=>{
            alert (err)

        })
    }


    return(
        
        <div className='container'>
            <form onSubmit={sendData}>

                <h1>Register a Teacher</h1>

                <div class="mb-3">    
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" 
                onChange={(e)=>
                    setName(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="nic" >NIC</label>
                <input  type="text" class="form-control" id="nic" 
                pattern=".{12,12}"
                onChange={(e)=>
                    setNic(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address"
                onChange={(e)=>
                    setAddress(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="age" >Age</label>
                <input type="text" class="form-control" id="age"
                pattern=".{2,2}"
                onChange={(e)=>
                    setAge(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="gender" >Gender</label>
                <input type="text" class="form-control" id="gender" 
                onChange={(e)=>
                    setGender(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="land" >Land Number</label>
                <input  type="text" pattern="[0][0-9]{9}" class="form-control" id="land"
                // placeholder="" 
                onChange={(e)=>
                    setLand(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="mobile" >Mobile Number</label>
                <input  type="text" pattern="[0][0-9]{9}" class="form-control" id="mobile"
                // placeholder=""
                onChange={(e)=>
                    setMobile(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" 
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={(e)=>
                    setEmail(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="subject" >Subject</label>
                <input type="text" class="form-control" id="subject"
                onChange={(e)=>
                    setSubject(e.target.value)
                }
                ></input>
                </div>

                <div class="mb-3">    
                <label for="password" >Password</label>
                <input type="text" class="form-control" id="password"
                onChange={(e)=>
                    setpassword(e.target.value)
                }
                ></input>
                </div>

                <a href=''><button style={{backgroundColor: '#065A82',color: 'white'}} type="submit" class="btn btn-primary">submit</button></a>
                <div/>
                <br></br>
                {/* <button href='/displayteacher' type="submit" class="btn btn-primary">Back</button> */}
                <Link to="/displayteacher" style={{backgroundColor: '#1C7293',color: 'white'}} className="btn btn-primary">Back</Link>
            </form>

        </div>
    )
}