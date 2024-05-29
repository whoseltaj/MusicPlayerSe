import './page2.css'
import { useNavigate} from 'react-router-dom';
import image1 from "../musicgen/popmusic.png"
import image2 from "../musicgen/rap.png"
import image3 from "../musicgen/rockmusic.png"
import image4 from "../musicgen/indiemusic.png"
import image5 from "../musicgen/classicalmusic.png"
import image6 from "../musicgen/azerbaijanmusic.png"
import image7 from "../artists/firstpop.jpg"
import image8 from "../artists/eminemzu.jpg"
import image9 from "../artists/thirdrock.jpg"
import image10 from "../artists/fourthindie.jpg"
import image11 from "../artists/fifthclassical.jpg"
import image12 from "../artists/rubabezu.jpg"
import {useEffect, useState} from "react";
import { useAuth } from '../Auth/AuthContext';

function Page2() {

    const{us}=useAuth()
    const navigate = useNavigate()
    const [style,setStyle] = useState({backgroundImage: "url(" + "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png" + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "48px",
    height: "50px",
    width: "50px",
    marginRight: "12px",
    marginLeft: "1px",
    marginTop: "25px",
    cursor: "pointer",
    transition: 'opacity 0.3s ease'

     

    
})

useEffect(() => {
    function getAvatarWidth() {
        if(window.innerWidth >= 550){
            return 50;
        }else {
            return 35;
        }
    }
    setStyle({backgroundImage: "url(" + "https://www.pngmart.com/files/23/User-PNG-Isolated-Image.png" + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "48px",
        height: `${getAvatarWidth()}px`,
        width: `${getAvatarWidth()}px`,
        marginRight: "12px",
        marginLeft: "1px",
        marginTop: "25px",
        cursor: "pointer",
        transition: 'opacity 0.3s ease'
    })
    async function sui(){
        const data = await us.data()
        setStyle({
            backgroundImage: "url(" + data.profile_pic + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "48px",
            height: `${getAvatarWidth()}px`,
            width: `${getAvatarWidth()}px`,
            marginRight: "12px",
            marginLeft: "1px",
            marginTop: "25px",
            cursor: "pointer",
            transition: 'opacity 0.3s ease'
        })
    }
    sui()
},[us])

    return (
        <div className="bodyy">
           <div className="container">
        <div className="sidebar">
            <span className="logo">S</span>
            <div className="side-wrapper">
                <div className="side-title">MENU</div>
                <div className="side-menu">
                    <a className="sidebar-link discover" href="#" onClick={()=>navigate('/main')}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.135 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.422V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 00-3.949.072L3.467 7.965A2.474 2.474 0 002.5 9.867v8.702C2.5 20.464 4.047 22 5.956 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009z"></path>
                        </svg>
                        Home
                    </a>
                    <a className="sidebar-link trending" href="#" onClick={()=>navigate('/likedmusic')}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.835 12.007l.002.354c.012 1.404.096 2.657.242 3.451 0 .015.16.802.261 1.064.16.38.447.701.809.905a2 2 0 00.91.219c.249-.012.66-.137.954-.242l.244-.094c1.617-.642 4.707-2.74 5.891-4.024l.087-.09.39-.42c.245-.322.375-.715.375-1.138 0-.379-.116-.758-.347-1.064-.07-.099-.18-.226-.28-.334l-.379-.397c-1.305-1.321-4.129-3.175-5.593-3.79 0-.013-.91-.393-1.343-.407h-.057c-.665 0-1.286.379-1.603.991-.087.168-.17.496-.233.784l-.114.544c-.13.874-.216 2.216-.216 3.688zm-6.332-1.525C3.673 10.482 3 11.162 3 12a1.51 1.51 0 001.503 1.518l3.7-.328c.65 0 1.179-.532 1.179-1.19 0-.658-.528-1.191-1.18-1.191l-3.699-.327z"></path>
                        </svg>
                        Information
                    </a>
                    <a className="sidebar-link" href="#" onClick={()=>navigate('/usersettings')}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.23 7.29V3.283c0-.427.34-.782.77-.782.385 0 .711.298.763.677l.007.104v4.01h4.78c2.38 0 4.335 1.949 4.445 4.38l.005.215v5.04c0 2.447-1.887 4.456-4.232 4.569l-.208.005H6.44c-2.38 0-4.326-1.94-4.435-4.379L2 16.905v-5.03c0-2.447 1.878-4.466 4.222-4.58l.208-.004h4.8v6.402l-1.6-1.652a.755.755 0 00-1.09 0 .81.81 0 00-.22.568c0 .157.045.32.14.459l.08.099 2.91 3.015c.14.155.34.237.55.237a.735.735 0 00.465-.166l.075-.071 2.91-3.015c.3-.31.3-.816 0-1.126a.755.755 0 00-1.004-.077l-.086.077-1.59 1.652V7.291h-1.54z"></path>
                        </svg>
                        User Settings
                    </a>
                    <div className="profile-avatar"  onClick={() => navigate("/usersettings")} style={style}></div>
                </div>
            </div>
            <div className="side-wrapper">
                <div className="side-menu"> 
                </div>
            </div>
        </div>
        <div className="wrapperr">
            <div className="header">
            </div>
            <div className="main-container">
                <div className="main-header anim" style={{'--delay': '0s'}}>Genres</div>
                <div className="genres-container">
                    <div className="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/pop')} >
                        <img src={image1} alt="Genre 1"/>
                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/rap')}>
                        <img src={image2} alt="Genre 2"/>
                </div>

                <div class="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/rock')}> 
                        <img src={image3} alt="Genre 3"/>
                </div>


                <div class="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/indie')}>
                        <img src={image4} alt="Genre 4"/>
                </div>


                <div class="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/classical')}>
                        <img src={image5} alt="Genre 5"/>
                </div>


                <div class="genre-box anim" style={{'--delay': '.1s'}} onClick={() => navigate('/azerbaijan')}>
                        <img src={image6} alt="Genre 6"/>
                </div>
                </div>
                <div className="small-header anim" style={{'--delay': '.3s'}}>Famous Artists</div>
                <div className="genres-container"> 
                <div class="genre-box anim" style={{'--delay': '.3s'}}>
                        <img src={image7} alt="Artist 1"/>
                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}}>
                        <img src={image8} alt="Artist 2"/>

                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}}>
                        <img src={image9} alt="Artist 3"/>
                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}}>
                        <img src={image10} alt="Artist 4"/>
                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}}>
                        <img src={image11} alt="Artist 5"/>
                    </div>
                    <div class="genre-box anim" style={{'--delay': '.1s'}}>
                        <img src={image12} alt="Artist 6"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    )
}





export default Page2;
