// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//pages and components
import Sidebar from "./components/Sidebar";
import Display from "./pages/displaystudents";
 import Addstudent from "./pages/studentadd";
 import UpdateStudent from "./pages/updatestudent";
 import GenReport from "./pages/StudentReport";

 import Addstaff from "./pages/staffadd";
 import DisplayS from "./pages/displaystaff";
 import Updatestaff from "./pages/updatestaff";
 
 import AddTeacher from "./pages/teacheradd";
 import DisplayT from "./pages/displayteachers";
 import Updateteacher from "./pages/updateteacher";
 

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
        <BrowserRouter>
          <Col className="p-0  sidebar"  lg="2">
          <Sidebar/>
          </Col>
        <Col className="p-0 adminbackground" lg="10">
            <div className="pages">
              <Routes>

                {/* student routes */}
                <Route path="/addstudent" element={<Addstudent />} />
                <Route path="/display" element={<Display />} />
                <Route path="/update/:id" element={<UpdateStudent />} />
                <Route path="/Sreport" element={<GenReport />} />

                 {/* staff routes */}
                 <Route path="/addstaff" element={<Addstaff />} />
                <Route path="/displaystaff" element={<DisplayS />} />
                <Route path="/updatestaff/:id" element={<Updatestaff />} />


                 {/* teacher routes */}
                <Route path="/addteacher" element={<AddTeacher />} />
                <Route path="/displayteacher" element={<DisplayT />} />
                <Route path="/updateteacher/:id" element={<Updateteacher />} />
                

              
              </Routes>
            </div>
          </Col>
          </BrowserRouter>
        </Row>
      </Container>
    </div>
  );
}

export default App;
