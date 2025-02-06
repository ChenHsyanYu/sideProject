import Card from 'react-bootstrap/Card'
import CardText from 'react-bootstrap/esm/CardText';
import { EmojiKeyboard } from "reactjs-emoji-keyboard";
import Button from 'react-bootstrap/Button';
import { useRef, useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { RiArrowRightFill } from "react-icons/ri";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { FaUtensils } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { PiAirplaneTiltFill } from "react-icons/pi";
import '../css/startPageAndProjectBlock.css';

const ProjectBlock = () =>{
    const [keyboardIsOpened, setKeyboard] = useState(false);
    const transformEmoji = (codePoint) => {
        return String.fromCodePoint(codePoint)
    }
    const [emoji, setEmoji] = useState(transformEmoji(0x1F600));
    const selectEmoji = (selectedCodePoint) =>{
        const codePoint = parseInt(selectedCodePoint, 16);
        setEmoji(transformEmoji(codePoint));
    }
    const keyboardRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
            setIsOpen(false); // 如果點擊區域不在彈窗內部，關閉彈窗
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside); // 清除事件監聽器
        };
      }, []);

    const [categories, setcategoryInfo] = useState([
        {
            id: 0,
            name: 'food',
            expense: 3200,
            percentage: 60,
        },
        {
            id: 1,
            name: 'shopping',
            expense: 1000,
            percentage: 50,
        },
        {
            id: 2,
            name: 'flight',
            expense: 500,
            percentage: 10,
        }


    ]);

    const setIcon = (categoryName) =>{
        switch (categoryName.toLowerCase()){
            case 'food':
                return <FaUtensils className='smIcons'/>
            case 'shopping':
                return <RiShoppingBag4Fill className='smIcons'/>
            case 'flight':
                return <PiAirplaneTiltFill className='smIcons'/>
        }

    }
    
    return(
        <Card className='card' border='none'>
            <Card.Body className='cardBody'>
                <div  className='titleRow'>
                    <div className='title'>
                        <span onClick={() => setKeyboard(!keyboardIsOpened)} className='projectIcon'>{emoji}</span>
                        {/* <Button onClick={() => setKeyboard(!keyboardIsOpened)}>Add an emoji</Button> */}
                        {keyboardIsOpened && 
                            <EmojiKeyboard
                            ref={keyboardRef}
                            height={320}
                            width={350}
                            theme="dark"
                            searchLabel="Procurar emoji"
                            searchDisabled={false}
                            onEmojiSelect={(selectedEmoji) =>selectEmoji(selectedEmoji.codePoint)}          
                            categoryDisabled={false}
                            />
                        }
                        <div><span id='title'>岡山</span><br/><span id='subTitle'>Okayama</span></div>
                    </div>       
                    <div><RiArrowRightFill className='smIcons'/></div>
                </div>
                <Container fluid>
                    <ProgressBar 
                        now={60}
                        className='mainBar'
                    />
                    <div className='subTitles'><span>Expense</span><span>Budget</span></div>
                </Container>
                <Container fluid className='expendingGrid'>
                    {categories.map(category => 
                        <div key={category.id} className='expending'>
                            <div className='percentageBar'>
                                {setIcon(category.name)}
                                <ProgressBar 
                                    now={category.percentage}
                                    id='percentageBar'
                                />
                            </div>
                            
                            <span>${category.expense}</span>
                        </div>
                    )}

                </Container>

                    
            </Card.Body>
        </Card>
        
    )
}

export default ProjectBlock;