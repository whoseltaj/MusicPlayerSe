import './rock.css'
import { useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
function Rock() {

    const navigate = useNavigate()
    const [list] = useState([
        {
            id: 1,
            class: 'aCDC',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/ACDC%20-%20Back%20In%20Black%20(Official%20Video).mp3",
            author: "AC/DC",
            title: "Back In Black"
        },
        {
            id: 2,
            class: 'aErosmith',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Aerosmith%20-%20Dream%20On%20(Audio).mp3",
            author: "Aerosmith ",
            title: "Dream On "
        },
        {
            id: 3,
            class: 'elvisPresley',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Elvis%20Presley%20-%20Jailhouse%20Rock%20(Music%20Video).mp3",
            author: "Elvis Presley",
            title: " Jailhouse Rock"
        },
        {
            id: 4,
            class: 'gOrillaz',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Gorillaz%20-%20Feel%20Good%20Inc.%20(Official%20Video).mp3",
            author: " Gorillaz",
            title: "Feel Good Inc."
        },
        {
            id: 5,
            class:'kiss',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Kiss%20-%20I%20Was%20Made%20For%20Lovin'%20You.mp3",
            author: "Kiss",
            title: "I Was Made For Lovin You"
        },
        {
            id: 6,
            class: 'lynyrdSkynyrd ',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Lynyrd%20Skynyrd%20-%20Free%20Bird%20(Official%20Audio).mp3",
            author: "Lynyrd Skynyrd ",
            title: "Free Bird"
        },
        {
            id: 7,
            class: 'nirvana ',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Nirvana%20-%20Smells%20Like%20Teen%20Spirit%20(Official%20Music%20Video).mp3",
            author: "Nirvana ",
            title: "Smells Like Teen Sapirit "
        },
        {
            id: 8,
            class: 'qUeen',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Queen%20-%20We%20Will%20Rock%20You%20(Official%20Video).mp3",
            author: "Queen ",
            title: "We Will Rock You"
        },
        {
            id: 9,
            class: 'sUrvivor ',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Survivor%20-%20Eye%20Of%20The%20Tiger%20(Official%20HD%20Video).mp3",
            author: "Survivor  ",
            title: " Eye Of The Tiger "
        },
        {
            id: 10,
            class: 'theBeatless',
            url: "https://rawcdn.githack.com/whoseltaj/musiclist/822d48a11124f463ed91c9c86d19bc585cb140b2/rock/Twist%20And%20Shout%20(Remastered%202009).mp3",
            author: "The Beatles",
            title: "Twist And Shout"
        }
    ]);

    const [currentId, setCurrentId] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoop, setIsLoop] = useState(true);
    const [isShuffle, setIsShuffle] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(new Audio(list[0].url));
    const [timer, setTimer] = useState(null);
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00");
    const [lastTime, setLastTime] = useState("05:01");
    const [albumClass, setAlbumClass] = useState(list[currentId].class);

    useEffect(() => {
        init();
        return () => {
            if (timer) clearInterval(timer);
        };
    }, []); 

    useEffect(() => {
        if (isPlaying) {
            showTime();
        } else {
            clearInterval(timer);
        }
    }, [isPlaying]);

    const play = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            currentAudio.play();
        } else {
            setIsPlaying(false);
            currentAudio.pause();
        }
    };

    const changeBar = () => {
        const percentage = (currentAudio.currentTime / currentAudio.duration).toFixed(3);
        setProgressBarWidth(percentage * 100);
        setCurrentTime(formatTime(currentAudio.currentTime));
        setLastTime(formatTime(currentAudio.duration));
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const showTime = () => {
        setTimer(setInterval(() => changeBar(), 500));
    };

    const backward = () => {
        const newTime = currentAudio.currentTime - 5;
        if (newTime < 0) {
            currentAudio.currentTime = 0;
        } else {
            currentAudio.currentTime = newTime;
        }
        if (!isPlaying) {
            changeBar();
        }
    };

    const forward = () => {
        const newTime = currentAudio.currentTime + 5;
        if (newTime > currentAudio.duration) {
            currentAudio.currentTime = currentAudio.duration;
        } else {
            currentAudio.currentTime = newTime;
        }
        if (!isPlaying) {
            changeBar();
        }
    };

    const stopMusic = () => {
        setIsPlaying(false);
        currentAudio.pause();
    };

    const goToNextMusic = (mode) => {
        stopMusic();
        let newId;
        if (mode === "next") {
            newId = currentId + 1 >= list.length ? 0 : currentId + 1;
        } else {
            newId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
        }
    
        setCurrentId(newId);
        const newAudio = new Audio(list[newId].url);
        newAudio.addEventListener("loadedmetadata", () => {
            setLastTime(formatTime(newAudio.duration));
        });
        newAudio.onended = () => goToNextMusic("next");
    
        setCurrentAudio(newAudio);
        setAlbumClass(list[newId].class);
        setIsPlaying(false); // Ensure the new track doesn't start automatically
    };

    const loop = () => {
        setIsLoop(!isLoop);
    };

    const shuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const init = () => {
        setCurrentAudio(new Audio(list[currentId].url));
        setCurrentAudio((prev) => {
            prev.addEventListener("loadedmetadata", () => {
                setLastTime(formatTime(prev.duration));
            });
            prev.onended = () => goToNextMusic("next");
            return prev;
        });
        setAlbumClass(list[currentId].class); // Set initial albumClass

    };
    
    

    const progress = (e) => {
        const pos = (e.pageX - e.target.getBoundingClientRect().x) / e.target.offsetWidth;
        currentAudio.currentTime = pos * currentAudio.duration;
        changeBar();
    };

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
                <div className="main-header anim" style={{'--delay': '0s'}}>Rock Music</div>
                <div className="player">
                     <div className="contentWrapper">
                         <div className="musicSwitch">
                                <div className="button _prev" id="prev" onClick={() => goToNextMusic("prev")} />
                                <div className="button _next" id="next" onClick={() => goToNextMusic("next")} />
                        </div>
                            <div id="jsAlbum" className={albumClass}> 
                            <div className={`album ${isPlaying ? '_pause' : '_play'}`}>
                                <div className="album__internal"></div>
                            </div>
                              </div>
                            <div className="musicInfo">
                                <h1 className="musicInfo__name">{list[currentId].title}</h1>
                                <h2 className="musicInfo__author">{list[currentId].author}</h2>
                            </div>
                            <div className="musicTime">
                                <p className="musicTime__current">{currentTime}</p>
                                <p className="musicTime__last">{lastTime}</p>
                            </div>
                            <div className="musicBar" id="progress" onClick={progress}>
                                <div className="musicBar__length" id="length" style={{ width: `${progressBarWidth}%` }}>
                                    <div className="button musicBar__circle">
                                        <div className="musicBar__circlePoint"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="musicOrder">
                                <div className={`musicOrder__loop ${isLoop ? "_loop" : "_off"}`} id="loop" onClick={loop}></div>
                                <div className={`musicOrder__shuffle ${isShuffle ? "_shuffle" : ""}`} id="shuffle" onClick={shuffle}></div>
                            </div>
                            <div className="musicControl">
                                <div className="button musicControl__backward" id="backward" onClick={backward}></div>
                                <div className={`button musicControl__play ${isPlaying ? "_pause" : "_play"}`} id="play" onClick={play}></div>
                                <div className="button musicControl__forward" id="forward" onClick={forward}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    )
}





export default Rock;
