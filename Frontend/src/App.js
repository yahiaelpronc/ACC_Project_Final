import './App.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'
import ScheduledOperation from './pages/ScheduledOperation';
// import NotFound from './pages/NotFound'
import NavbarComponent from './Components/NavbarComponent'
import Locations from './pages/ListLocations';
import Myform from './Components/Myform';
import VetForm2 from './pages3/VetForm';
import ListLocations from './pages3/listlocations';
import LocationDetails from './pages3/details';
import ListUsers from './pages3/listusers';
import UserDetails from './pages3/userdetails';
import ListVets from './pages3/listvets';
import VetDetails from './pages3/vetdetails';
import FooterComponent from './Components/FooterComponent';
import SurgicalRequest from './Components4/SurgicalRequest';
import Home from './pages/HomePage';
import Emergency from './pages/Emergency';
import './pages/PagesStatic/Home.css';
import SurgeryRequest from './pages3/SurgeryRequests';
import SurgicalOperationsUser from './pages3/SurgicalOperationsUser';
import SendSurgeryUser from './pages3/SendSurgeryUser';
import MedicationAdmin2 from './pages/MedicationAdmin2';
import AdminPage2 from './pages3/AdminPage';
import Logout from './pages/Logout';
import logoutVet from './pages/logoutVet';
import DetailsLocations from './pages/Details';
import loginUsers from './pages/LoginUsers';
import verified from './pages/verified';
import Notverified from './pages/Notverified';
import LoginAsUser from './pages/LoginAsUser';
import LoginAsVet from './pages/LoginAsVet';
import AddAnimal from './pages3/AddAnimal';
import AddUserForm from './pages/AddUserForm';
import Register from './pages/Register';
import VetRegister from './pages/VetRegister';
import NewSchedule from './pages/NewSchedule';
import NewRequest from './pages/NewRequest';
import NewDetails from './pages/NewDetails';
import SurgicalOp from './pages/SurgicalOp';
import LocationFilter from './pages/LocationFilter';
import UserRegister from './pages/UserRegister';
import RequestSur from './pages/RequestSur';
import ServicesRequest from './pages3/ServicesRequest';
import TableOfSurgries from './pages3/tableOfSurgeries';
import UserServiceResponses from './pages3/UserServiceResponses';
import Welcome from './pages/Welcome';
import NotFound from './pages/NotFound';
import MedicationUser from './pages/MedicationUser';
import { useSelector, useDispatch } from 'react-redux'
function App() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const logged = useSelector((state) => state.logged);
  return (
    <div className="App">
      <BrowserRouter>
      <NavbarComponent/>
      <Switch>
        <Route path={"/"} exact component={Home}/>
        <Route path={"/Welcome"} exact component={Welcome}/>
        <Route path={"/Notverified"} exact component={Notverified}/>
        <Route path={"/verified"} exact component={verified}/>
        <Route path={"/VetRegister"} exact component={VetRegister}/>
        <Route path={"/UserRegister"} exact component={UserRegister}/>
        <Route path={"/Register"} exact component={Register}/>
        <Route path={"/login"} exact component={loginUsers}/>
        <Route path={"/LoginAsUser"} exact component={LoginAsUser}/>
        <Route path={"/LoginAsVet"} exact component={LoginAsVet}/>
        {logged &&
        <>
        <Route path={"/NewSc/:id"} exact component={NewSchedule}/>
        <Route path={"/NewRe"} exact component={NewRequest}/>
        <Route path={"/SurOp"} exact component={SurgicalOp}/>
        <Route path={"/NewDe"} exact component={NewDetails}/>
        <Route path={"/Filter"} exact component={LocationFilter}/>
        <Route path={"/operation"} exact component={ScheduledOperation}/>
        <Route path={"/request/:id"} exact component={RequestSur}/>
        <Route path={"/emergency"} exact component={Emergency}/>
        <Route path={"/myform"} exact component={Myform}/>
        <Route path={"/vetform2"} exact component={VetForm2}/>
        <Route path={"/detailslocations/:locationName"} exact component={NewDetails} />
        <Route path={"/listlocations"} exact component={Locations} />
        <Route path={"/details/:id"} exact component={LocationDetails} />
        <Route path={"/listusers"} exact component={ListUsers} />
        <Route path={"/userdetails/:username"} exact component={UserDetails} />
        <Route path={"/vetdetails/:username"} exact component={VetDetails} />
        <Route path={"/listvets"} exact component={ListVets} />
        <Route path={"/SurgeryRequest"} exact component={SurgeryRequest} />
        <Route path={"/SurgicalOperationsUser"} exact component={SurgicalOperationsUser} />
        <Route path={"/SendSurgeryUser/:vetUsername"} exact component={SendSurgeryUser} />
        <Route path={"/MedicationUser"} exact component={MedicationUser} />
        <Route path={"/MedicationAdmin2"} exact component={MedicationAdmin2} />
        <Route path={"/AddAnimal"} exact component={AddAnimal} />
        <Route path={"/LocationDD"} exact component={ListLocations} />
        <Route path={"/logout"} exact component={Logout} />
        <Route path={"/logoutVet"} exact component={logoutVet} />
        {loggedUser.isAdmin &&
        <Route path={"/AdminPage2"} exact component={AdminPage2} />
        }
        <Route path={"/ServicesRequest"} exact component={ServicesRequest} />
        <Route path={"/UserServiceResponses"} exact component={UserServiceResponses} />
        <Route path={"/SurgicalRequest"} exact component={SurgicalRequest} />
        <Route path={"/TableOfSurgries"} exact component={TableOfSurgries} />
        </>
        }
        <Route path={"*"} exact component={NotFound}/>
      </Switch>
      <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;