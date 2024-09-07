import React, {useRef, useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header'; 
import InfoBlock from '../components/InfoBlock';
import photo1 from '../assets/images/1.png';
import photo2 from '../assets/images/2.png';
import photo3 from '../assets/images/3.png';
import photo4 from '../assets/images/4.png';
import photo5 from '../assets/images/5.png';
import photo6 from '../assets/images/6.png';
import photo7 from '../assets/images/7.png';
import photo8 from '../assets/images/8.png';
import photo9 from '../assets/images/9.png';
import photo10 from '../assets/images/10.png';
import photo11 from '../assets/images/11.png';
import photo12 from '../assets/images/12.png';
import photo021 from '../assets/images/021.png';
import photo022 from '../assets/images/022.png';
import photo031 from '../assets/images/031.png';
import photo032 from '../assets/images/032.png';
import photo033 from '../assets/images/033.png';
import photo034 from '../assets/images/034.png';
import photo035 from '../assets/images/035.png';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import card3 from '../assets/images/card3.png';
import card4 from '../assets/images/card4.png';
import pic11 from '../assets/images/pic11.png';
import pic12 from '../assets/images/pic12.png';
import pic13 from '../assets/images/pic13.png';
import pic14 from '../assets/images/pic14.png';
import pic15 from '../assets/images/pic15.png';
import pic16 from '../assets/images/pic16.png';
import pic17 from '../assets/images/pic17.png';
import pic18 from '../assets/images/pic18.png';
import pic19 from '../assets/images/pic19.png';
import pic21 from '../assets/images/pic21.png';
import pic22 from '../assets/images/pic22.png';
import pic23 from '../assets/images/pic23.png';
import pic24 from '../assets/images/pic24.png';
import pic25 from '../assets/images/pic25.png';
import pic26 from '../assets/images/pic26.png';
import pic27 from '../assets/images/pic27.png';
import pic28 from '../assets/images/pic28.png';
import pic29 from '../assets/images/pic29.png';
import pic31 from '../assets/images/pic31.png';
import pic32 from '../assets/images/pic32.png';
import pic33 from '../assets/images/pic33.png';
import pic34 from '../assets/images/pic34.png';
import pic35 from '../assets/images/pic35.png';
import pic36 from '../assets/images/pic36.png';
import pic37 from '../assets/images/pic37.png';
import pic38 from '../assets/images/pic38.png';
import pic39 from '../assets/images/pic39.png';
import arrowImage from '../assets/images/arrow.png';
import windowImage from '../assets/images/window.png';
import date from '../assets/images/date.png';
import door_left from '../assets/images/left_door.png';
import door_right from '../assets/images/right_door.png';
import ticket from '../assets/images/ticket.png';
import ticket_mobile from '../assets/images/ticket_mobile.png';
import vk from '../assets/images/vk.png';
import tg from '../assets/images/tg.png';
import Text from '../assets/icons/Text.svg';
import ScrollableRectangle from '../components/ScrollableRectangle';
import TweenOne from 'rc-tween-one';

const Main = () => {
    const navigate = useNavigate();
    const leftDoorRef = useRef(null);
    const rightDoorRef = useRef(null);
    const [isLeftDoorOpen, setIsLeftDoorOpen] = useState(false);
    const [isRightDoorOpen, setIsRightDoorOpen] = useState(false);
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const rectangle1Images = [pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19];
    const rectangle2Images = [pic21, pic22, pic23, pic24, pic25, pic26, pic27, pic28, pic29];
    const rectangle3Images = [pic31, pic32, pic33, pic34, pic35, pic36, pic37, pic38, pic39];
    const infoBlockData = [
        { imageSrc: photo031, text: "" },
        { imageSrc: photo032, text: "Мы знаем, как важен здоровый сон для студентов, поэтому тебя ждёт уютная комната и тёплое спальное место.\nТакже в комнатах самые стойкие смогут продолжить вечер со своей компанией!" },
        { imageSrc: photo033, text: "Тебе не придётся думать о том, как доехать до места проведения или добраться до метро после Посвята" },
        { imageSrc: photo034, text: "Собираешься много общаться, петь и танцевать? Хочешь, чтобы сил хватило до утра?\nТогда шведский стол со вкусной полезной едой – то, что нужно!" },
        { imageSrc: photo035, text: "Найдешь полезные знакомства или друзей на всю жизнь" }
    ];
    

    const handleButtonClick = () => {
      navigate('/registration');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const leftDoor = leftDoorRef.current;
            const rightDoor = rightDoorRef.current;
            const windowHeight = window.innerHeight;

            if (leftDoor) {
                const leftRect = leftDoor.getBoundingClientRect();
                if (leftRect.top < windowHeight && leftRect.bottom > 0) {
                    setIsLeftDoorOpen(true);
                }
            }

            if (rightDoor) {
                const rightRect = rightDoor.getBoundingClientRect();
                if (rightRect.top < windowHeight && rightRect.bottom > 0) {
                    setIsRightDoorOpen(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="root">
            <Header />
            <div>
                <div className="grey-rectangle">
                    <div className="black-strip top-strip"></div>
                    <p className="grey-rectangle-text">5-6 октября</p>
                    <div className="photos-container">
                    <img src={photo1} alt="Photo 1" />
                    <img src={photo2} alt="Photo 2" />
                    <img src={photo3} alt="Photo 3" />
                    <img src={photo4} alt="Photo 4" />
                    <img src={photo5} alt="Photo 5" />
                    <img src={photo6} alt="Photo 6" />
                    <img src={photo7} alt="Photo 7" />
                    <img src={photo8} alt="Photo 8" />
                    <img src={photo9} alt="Photo 9" />
                    <img src={photo10} alt="Photo 10" />
                    <img src={photo11} alt="Photo 11" />
                    <img src={photo12} alt="Photo 12" />
                    </div>
                    <p className="grey-rectangle-text">Не пропусти главное событие студенчества...</p>
                    <div className="black-strip bottom-strip"></div>
                </div>
                <button onClick={handleButtonClick} style={{ backgroundColor: '#E7E2FF', marginBottom: '80px' }}>Регистрация</button>
            </div>
            <p className='small-text'> П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Сдается мне, джентльмены, это была комедия» · П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Искусство, Кончита, требует жертв!» · П'24</p>
            <div className='info'>
                <div className='info-value'>
                    <div className='info-value-first'>
                        <img src={photo021} alt="Image 021" className="info-image" />
                        <p className="info-text">Посвят — это ярчайший момент<br/> 
                        в жизни студента: тебя ждут диалоги<br/> 
                        тет-а-тет с одногруппниками,<br/> 
                        нон-стоп танцы до утра и даже<br/> 
                        highway to hell, если ты сильно <br/> 
                        захочешь победить в конкурсах!<br/><br/>
                        Пропустить событие, которое бывает <br/>
                        раз в жизни, — преступление. <br/> <br/>
                        Скорее садись на поезд<br/> 
                        в студенчество!</p>
                    </div>
                    <div className='info-value-second'>
                        <img src={photo022} alt="Image 022" className="info-image" />
                        <img src={Text} className="info-icon" alt="Text Icon" />
                        <p className='info-value-second-text'>В Telegram-канале Посвята —<br/> закулисье подготовки, а всю важную <br/> информацию ты найдёшь в группе<br/> ВКонтакте и боте.</p>
                    </div>
                </div>
                <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', color: '#FFD5C9', border: '2px solid #FFD5C9', padding: '0% 23%' }}>Я еду!</button>
            </div>
            <p className='small-text'>· клондайк · П'24 · клондайк · П'24 · главное событие осени · П'24 · клондайк · П'24 · клондайк · П'24 · главное событие осени · П'24 · клондайк · П'24 · клондайк · П'24 · главное событие осени · П'24 </p>
            <div className='info'>
                <div className='info-blocks-container'>
                    {infoBlockData.map((data, index) => (
                        <InfoBlock
                            key={index}
                            imageSrc={data.imageSrc}
                            text={data.text}
                        />
                    ))}
                </div>
                <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', color: '#E7E2FF', border: '2px solid #E7E2FF', padding: '0% 22%' }}>Хотеть:3</button>
            </div>
            <p className='small-text'>· П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Сдается мне, джентльмены, это была комедия» · П'24 · клондайк · П'24 · главное событие оcени · 
        П'24 · «Искусство, Кончита, требует жертв!» · П'24</p>
            <div className='info'>
                <div className='info-cards'>
                    <img src={card1} alt="card1" className="info-cards-1" />
                    <img src={card2} alt="card2" className="info-cards-2" />
                    <img src={card3} alt="card3" className="info-cards-3" />
                    <img src={card4} alt="card4" className="info-cards-4" />
                </div>
                <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', color: '#E7E2FF', border: '2px solid #E7E2FF', padding: '0% 22%' }}>Хотеть:3</button>
            </div>
            <p className='small-text'>П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Живут же люди Влюбляются, ходят в театры, в библя» · П'24 · клондайк · П'24 · главное событие оcени ·
 П'24 · «.…в библио-те-ки.» · П'24</p>
            <ScrollableRectangle 
                images={rectangle1Images} 
                width="100%" 
                height="300px" 
                skew={1} 
            />
            <ScrollableRectangle 
                images={rectangle2Images} 
                width="100%" 
                height="450px" 
                skew={0} 
            />
            <ScrollableRectangle 
                images={rectangle3Images} 
                width="100%" 
                height="300px" 
                skew={-1}
            />
            <p className='small-text'> П'24 · клондайк · П'24 · главное событие оcени · П'24 · Запомните, джентльмены, эту страну погубит коррупция!!! · П'24 · клондайк · П'24 · главное событие оcени · П'24 · А тот бы джентльмен сказал: «Заткнись, пожалуйста, Хью!» · П'24</p>
            <div className='info'>
                <div className='info-w'>
                    <div className='info-window'>
                        <img src={windowImage} alt="window" className='window' />
                        <div className='info-window-text'>
                            <p style={{color: '#FFD5C9'}}>время и место</p>
                            <img src={date} alt="date" className='infor-window-text-date' />
                            <button onClick={handleButtonClick} style={{ backgroundColor: 'transparent', color: '#E7E2FF', border: '2px solid #E7E2FF', padding: '0% 20%'}}>Хотеть:3</button>
                        </div>
                        <div className='info-window-2'>
                        <TweenOne
                            component="img"
                            src={door_left}
                            alt="door_left"
                            className='door door_left'
                            ref={leftDoorRef}
                            animation={isLeftDoorOpen ? { rotateY: 120, duration: 500 } : {}}
                        />
                        <TweenOne
                            component="img"
                            src={door_right}
                            alt="door_right"
                            className='door door_right'
                            ref={rightDoorRef}
                            animation={isRightDoorOpen ? { rotateY: -120, duration: 500 } : {}}
                        />
                    </div>
                    </div>
                </div>
            </div>
            <p className='small-text'> П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Сдается мне, джентльмены, это была комедия» · П'24 · клондайк · П'24 · главное событие оcени · П'24 · «Искусство, Кончита, требует жертв!» · П'24</p>
            <div className='info'>
                <div className='info-ticket'>
                    <img src={window.innerWidth <= 768 ? ticket_mobile : ticket}  alt='ticket' />
                    <button className='info-ticket-btn' onClick={handleButtonClick}>Зарегистрироваться</button>
                </div>
            </div>
            <div>
                <div className="scroll-to-top">
                    <div className='links'>
                        <a href="https://vk.com/miemposvyat" target="_blank" rel="noopener noreferrer">
                            <img src={vk} alt="ВКонтакте" />
                        </a>
                        <a href="https://t.me/miemposvyat" target="_blank" rel="noopener noreferrer">
                            <img src={tg} alt="Telegram" />
                        </a>
                    </div>
                    <div>
                        <img src={arrowImage} alt="Scroll to top" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
                        <p onClick={scrollToTop} style={{ cursor: 'pointer' }}>Наверх</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;