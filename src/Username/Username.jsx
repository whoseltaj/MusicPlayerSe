import {useEffect, useState} from "react";
import {usersCollection} from "../firebase.js";
import {useAuth} from "../Auth/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {addDoc, onSnapshot} from "firebase/firestore";
import './username.css'


function  Username(){

    const navigate = useNavigate();
    const {user} = useAuth();
    const [loading,setLoading] = useState(false)
    const [users,setUsers] = useState([])
    const [username,setUsername] = useState("");
    const [names,setNames] = useState(localStorage.getItem("names"))
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");



    useEffect(() => {
        const unsubscribe = onSnapshot(usersCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const usersArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setUsers(usersArr)
            for (let i = 0; i<users.length; i++){
                if (users[i].UID===user.uid){
                    navigate("/login")
                }
            }
        })
        setFirstName(names.split(" ")[0]);
        setLastName(names.split(" ")[1]);
        return unsubscribe
    }, [])

    function handleUsernameNameChange(e){
        setUsername(e.target.value);
    }

    async function registerUser(e){
        e.preventDefault();
        setLoading(true)
        const newUser = {
            firstName:firstName,
            lastName:lastName,
            username:username,
            email:user.email,
            UID:user.uid,
        }
        try{
            await addDoc(usersCollection, newUser);
            navigate("/login");
        }catch {
            return "Error";
        }
    }

    return (
        <div className="wrapperB">
            <ul>
                <li>M</li>
                <li>U</li>
                <li>S</li>
                <li>I</li>
                <li>C</li>
                <li>P</li>
                <li>L</li>
                <li>A</li>
                <li>Y</li>
                <li>E</li>
                <li>R</li>
            </ul>
            <div className="form-boxx">
                <div className="register-containerx" id="register">
                    <div className="two-formsx">
                        <div className="input-boxx">
                            <input onChange={handleUsernameNameChange} value={username} id='username' type="text" className="username" placeholder="Username" />
                            <i className="bx bx-userx"></i>
                        </div>
                        <div className="input-boxx" id="registerB">
                            <button disabled={loading} type="submit" className="submit2" value="Register" onClick={registerUser}>Register</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default  Username;