import { useEffect, useRef, useState } from "react";
import categoryIcons from "../components/categoryIcons";
import { HiMiniTrash } from "react-icons/hi2";
import "../css/btn.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Radio from '@mui/material/Radio';
import BillMemberDropdown from "./BillMemberDropdownOwed.jsx";
import BillMemberDropdownPaid from "./EditBillDropdownPaid.jsx";
import "../css/overlay.css";
import CancelAndComfirmBtn from "./CancelAndComfirmBtn.jsx";
import InputBox from "./InputBox.jsx";
import { ImCheckboxChecked,ImCheckboxUnchecked } from "react-icons/im";

const EditBillOverlay = ({ closeFunction, propBillContent }) => {
    
    const [selectedValue, setSelectedValue] = useState(billContent.billingType);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    // useEffect(() => {
    //     if(selectedValue === personal)
    // }, [selectedValue])
    
    const [categories, setCategories] = useState([
        { id: 0, categoryName: "Food", className: "iconDiv", isSelected: false },
        { id: 1, categoryName: "Shopping", className: "iconDiv", isSelected: false },
        { id: 2, categoryName: "Flight", className: "iconDiv", isSelected: false },
        { id: 3, categoryName: "Transportation", className: "iconDiv", isSelected: false },
        { id: 4, categoryName: "Dessert", className: "iconDiv", isSelected: false },
        { id: 5, categoryName: "Accomodation", className: "iconDiv", isSelected: false },
        { id: 6, categoryName: "Internet", className: "iconDiv", isSelected: false },
        { id: 7, categoryName: "Others", className: "iconDiv", isSelected: false }
    ]);

    const selectCategory = (selectId) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === selectId
                    ? { ...category, className: "selected", isSelected: true }
                    : { ...category, className: "iconDiv", isSelected: false }
            )
        );
    };

    const overlayRef = useRef(null);

    const [billContent, setBillContent] = useState({})

    useEffect(() => {
        if(propBillContent){
            setBillContent(propBillContent)
        }
        
    }, [propBillContent])
    

    const closeOverlay = () => {
        closeFunction(false);
        console.log("close overlay");
    }

    return (
        <div className="overlay" >
            <div className="outWrap" >
                <div className="titleWrap">
                    <button className="redBtn">結帳</button>
                    <div><InputBox mode='standard' label='輸入項目名稱' defaultValue={billContent.billName}/></div>
                    <HiMiniTrash />
                </div>
                <div className="innerWrap">
                    <Container className="iconsWrap">
                        <Row>
                            {categories.slice(0, 4).map((category) => (
                                <Col key={category.id}>
                                    <div className={category.className} onClick={() => selectCategory(category.id)}>
                                        {categoryIcons(category.categoryName.toLowerCase())}
                                        <div className="iconTitle">{category.categoryName}</div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            {categories.slice(4, 8).map((category) => (
                                <Col key={category.id}>
                                    <div className={category.className} onClick={() => selectCategory(category.id)}>
                                        {categoryIcons(category.categoryName.toLowerCase())}
                                        <div className="iconTitle">{category.categoryName}</div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <hr />
                    <InputBox label='總花費' className='input' value={billContent.billExpense}/>
                    <div className="btnGroup">
                        <label className="flex justify-center items-center">
                            <Radio
                                checked={selectedValue === 'personal'}
                                onChange={(e) => handleChange(e)}
                                value="personal"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'A' }}
                                checkedIcon={<ImCheckboxChecked style={{color: '#7F87B7'}}/>}
                                icon={<ImCheckboxUnchecked />}
                            />個人花費
                        </label>
                        <label>
                            <Radio
                                checked={selectedValue === 'seperate'}
                                onChange={(e) =>handleChange(e)}
                                value="seperate"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'B' }}
                                checkedIcon={<ImCheckboxChecked style={{color: '#7F87B7'}}/>}
                                icon={<ImCheckboxUnchecked />}
                            />分帳花費
                        </label>
                        
                    </div>
                    <div>
                        <div className="flex">
                            <BillMemberDropdownPaid selectedValue={selectedValue} defaultPayer={billContent.billPayer}/>
                        </div>
                    </div>
                    <div>
                        <div className="flex">
                            <BillMemberDropdown selectedValue={selectedValue} total={billContent.billExpense}/>
                        </div>
                    </div>
                    
                </div>
                <div onClick={() => closeFunction(false)}>
                    <CancelAndComfirmBtn text={'確認新增'} className='btns' />
                </div>
                
            </div>
        </div>
    );
};

export default EditBillOverlay;
