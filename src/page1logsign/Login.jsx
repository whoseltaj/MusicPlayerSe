
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './style.css'
import {useEffect, useState} from 'react';
import {usersCollection} from "../firebase.js";
import {onSnapshot} from "firebase/firestore";
import 'font-awesome/css/font-awesome.min.css';

function Login() {
    let user = null
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const [username,setUsername] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const{signUp,login,logOut}=useAuth()
    const [users,setUsers] = useState([])
    const navigate = useNavigate()




    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }
    function handleFirstNameChange(e){
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value)
    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handleLoginPasswordChange(e){
        setLoginPassword(e.target.value)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(usersCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const usersArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setUsers(usersArr)

        })
        return unsubscribe
    }, [])

    async function checkUser(event){
        event.preventDefault()
        await  logOut()
        for(let i =0; i<users.length; i++){
            if(users[i].username===username && loginPassword!==""){
                user = users[i]
                try {
                    await login(user.email,loginPassword)
                }catch {
                    window.alert("Password or Username is incorrect!")
                }
                navigate('/main');
            }
        }
        if(user===null){
            window.alert("Password or Username is incorrect!")
        }
    }

    function myMenuFunction() {

        
        var i = document.getElementById("navMenu");
    
        if(i.className === "nav-menu") {
            i.className += " responsive";
        } else {
            i.className = "nav-menu";
        }
       }


    async function registerUser(e){
        e.preventDefault();
        try{
            localStorage.removeItem("names");
            localStorage.setItem("names",firstName+" "+lastName);
            await signUp(email, password);
            navigate("/username");
        } catch{
            console.log("ERROR")
        }
    }
    
        
    
        function loginPage() {
            document.getElementById("login").style.left = "4px";
            document.getElementById("login").style.opacity = 1;
            document.getElementById("loginBtn").style.className += "white-btn";
            document.getElementById("register").style.right = "-520px";
            document.getElementById("register").style.opacity = 0;
            document.getElementById("registerBtn").style.className = "btn";
        }
    
        function register() {
            document.getElementById("login").style.left = "-510px";
            document.getElementById("login").style.opacity = 0;
            document.getElementById("loginBtn").style.className = "btn";
            document.getElementById("register").style.right = "5px";
            document.getElementById("register").style.opacity = 1;
            document.getElementById("registerBtn").style.className += "white-btn";
        }
    
        // function togglePassword(passwordFieldId) {
        //    var passwordField = document.getElementById(passwordFieldId);
        //     var toggleButton = document.getElementById("toggle" + passwordFieldId.charAt(0).toUpperCase() + passwordFieldId.slice(1));
            
        //     if (passwordField.type === "password") {
        //         passwordField.type = "text";
        //         toggleButton.className = "bx bx-lock-open-alt";
        //     } else {
        //         passwordField.type = "password";
        //         toggleButton.className = "bx bx-lock-alt";
        //     }
        
    


    function openModal() {
        document.getElementById("myModal").style.display = "block";
    }

    function closeModal() {
        document.getElementById("myModal").style.display = "none";
    }


    
    
    return (

        <>

    <div className="wrapper">
    <nav className="nav">
        <div className="nav-logo">
            <p> YEK Music Player</p>
        </div>
        <div className="nav-button">
            <button className="btn white-btn" id="loginBtn" onClick={loginPage}>Sign In</button>
            <button className="btn" id="registerBtn" onClick={register}>Sign Up</button>
        </div>
        <div className="nav-menu-btn">
            <i className="bx bx-menu" onClick={myMenuFunction}></i>
        </div>
    </nav>
   
    <div className="form-box">
        
    

        <div className="login-container" id="login">
            <div className="top">
                <span>Don't have an account? <a href="#" onClick={register}>Sign Up</a></span>
                <header>Login</header>
            </div>
            <div className="input-box">
                <input type="text" value={username} onChange={handleUsernameChange} className="input-field" placeholder="Username" />
            </div>
            <div className="input-box">
                <input type="password" value={loginPassword} onChange={handleLoginPasswordChange} className="input-field" id="loginPassword" placeholder="Password" />
                {/* <i class="bx bx-lock-alt" id="toggleLoginPassword" onClick={togglePassword('loginPassword')}></i> */}
            </div>
            <div className="input-box">
                <input onClick={checkUser} type="submit" className="submit" value="Sign In" />
            </div>
            <div className="two-col">
                <div className="one">
                    <input type="checkbox" id="login-check" />
                    <label htmlFor="login-check"> Remember Me</label>
                </div>
                <div className="two">
                    <label><a href="#" onClick={openModal}>Terms & conditions</a></label>
                </div>
            </div>
        </div>

    
        <div className="register-container" id="register">
            <div className="top">
                <span>Have an account? <a href="#" onClick={loginPage}>Login</a></span>
                <header>Sign Up</header>
            </div>
            <div className="two-forms">
                <div className="input-box">
                    <input onChange={handleFirstNameChange} value={firstName} id='firstName' type="text" className="input-field" placeholder="Firstname" />
                    <i className="bx bx-user"></i>
                </div>
                <div className="input-box">
                    <input onChange={handleLastNameChange} value={lastName} id='lastName' type="text" className="input-field" placeholder="Lastname" />
                    <i className="bx bx-user"></i>
                </div>
            </div>
            <div className="input-box">
                <input id="email" onChange={handleEmailChange} value={email} type="text" className="input-field" placeholder="Email" />
                <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
                <input type="password" onChange={handlePasswordChange} value={password} className="input-field" id="registerPassword" placeholder="Password" />
                {/* <i class="bx bx-lock-alt" id="toggleRegisterPassword" onClick={togglePassword('registerPassword')}></i> */}
            </div>
            <div className="input-box" id="registerB">
                <button type="submit" className="submit" value="Register" onClick={registerUser}>Register</button> 
            </div>
            <div className="two-col">
                <div className="one">
                    <input type="checkbox" id="register-check" />
                    <label htmlFor="register-check"> Remember Me</label>
                </div>
                <div className="two">
                    <label ><a href="#" onClick={openModal} >Terms & conditions</a></label>
                </div>
            </div>
        </div>
    </div>
</div>


    <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
          <h2>Terms & Conditions</h2>
          <p> Basic and important terms and conditions for the music player.</p>
          <br />
          <p>1. License: You are granted a limited, non-exclusive license to use the application for personal, non-commercial purposes</p> <br />
          <p>2. Account: You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account.</p><br/>
          <p>3. Content: You may access and stream music and other content for personal use only. You may not reproduce or distribute content without permission.</p><br/>
          <p>4. Privacy: We respect your privacy. Our Privacy Policy explains how we collect and use your information.</p><br/>
          <p>5. Disclaimer: The application is provided "as is" without warranty of any kind.</p><br/>
          <p>6. Limitation of Liability: We are not liable for any indirect or consequential damages arising from your use of the application</p><br/>
          <p>7. Changes: We may modify these terms at any time. Your continued use of the application constitutes acceptance of the updated terms</p>
        </div>
    </div> 



        </>


    )
}





export default Login;


