import './Topbar.css';
import { 
    Nav,
    Navbar,
    Icon
} from 'rsuite';
import Axios from 'axios';
import 'rsuite/dist/styles/rsuite-default.css';
import { useHistory } from 'react-router-dom';


function Topbar() {
    const history = useHistory();
    
    const home = () => {
        history.push("/home");
    }

    const hook = () => {
        history.push("/hook");
    }

    const settings = () => {
        history.push("/settings");
    }

    const profile = () => {
        history.push("/profile");
    }

    const user = localStorage.getItem('username');

    const logout = () => {
      Axios.get(`http://localhost:8080/logout`, {
      }).then((response) => {
        if (response.status == 200) {
            console.log("Logout Successfull."); 
            history.push("/login")
        } else {
            console.error("Logout.js : Error with the logout request response: wrong reponse status.");
        }
      });
    }

    return (
        <Navbar appearance="default" className="Topbar">
            <Navbar.Body>
                <Nav>
                    <Nav.Item icon={<Icon icon="area-chart" />} componentClass="button" onClick={home}><b>AREA</b></Nav.Item>
                </Nav>
                <Nav>
                </Nav>
                <Nav pullRight>
                    <Nav.Item icon={<Icon icon="user" />} componentClass="button" onClick={profile} ><i>{user}</i></Nav.Item>
                    <Nav.Item icon={<Icon icon="plus"/>} componentClass="button" onClick={hook} ><b>Create</b></Nav.Item>
                    <Nav.Item icon={<Icon icon="cog" />} componentClass="button" onClick={settings} >Settings</Nav.Item>
                    <Nav.Item icon={<Icon icon="sign-out" />} componentClass="button" className="Button-Logout" onClick={logout} ><b>Log Out</b></Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
}

export default Topbar;