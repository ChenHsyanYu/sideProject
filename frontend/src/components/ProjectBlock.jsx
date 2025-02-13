import Card from 'react-bootstrap/Card'
import { EmojiKeyboard } from "reactjs-emoji-keyboard";
import { useRef, useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { RiArrowRightFill } from "react-icons/ri";
import '../css/startPageAndProjectBlock.css';
import categoryIcons from "../components/categoryIcons";
import ProgressBar from './ProgressBar';

// import 



const ProjectBlock = ({projectInfo}) =>{
    const [keyboardIsOpened, setKeyboard] = useState(false);
    const transformEmoji = (codePoint) => {
        if (!codePoint || isNaN(parseInt(codePoint, 16))) {
            return String.fromCodePoint(0x1F600); // ✅ 正確：直接返回 Emoji
        }
        return String.fromCodePoint(parseInt(codePoint, 16)); // ✅ 正確：轉換為 Emoji
    };
    
    // ✅ 預設 emoji 為 "😀"
    const [emoji, setEmoji] = useState(() => transformEmoji(projectInfo.emoji));
    
    const selectEmoji = (selectedCodePoint) => {
        const codePoint = parseInt(selectedCodePoint, 16);
        if (!isNaN(codePoint)) {
            setEmoji(transformEmoji(codePoint));
        }
    };
    
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
            expense: 320,
            percentage: 60,
        },
        {
            id: 1,
            name: 'shopping',
            expense: 100,
            percentage: 50,
        },
        {
            id: 2,
            name: 'flight',
            expense: 50,
            percentage: 10,
        }


    ]);
    
    
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
                        <div><span id='title'>{projectInfo.projectName}</span><br/><span id='subTitle'>{projectInfo.projectSubtitle}</span></div>
                    </div>       
                    <div><RiArrowRightFill className='smIcons'/></div>
                </div>
                <Container fluid>
                    <div className='progressing'>
                        <ProgressBar expense={projectInfo.projectExpense} budget={projectInfo.projectBudget}/>
                    </div>
                    <div className='subTitles'><span>Expense</span><span>Budget</span></div>
                </Container>
                <Container fluid className='expendingGrid'>
                    {categories.map(category => 
                        <div key={category.id} className='expending'>
                            <div className='percentageBar'>
                                {categoryIcons(category.name)}
                                <ProgressBar mode='percentage' expense={category.expense} budget={projectInfo.projectBudget}/>
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