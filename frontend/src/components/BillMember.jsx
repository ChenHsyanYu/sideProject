import Form from 'react-bootstrap/Form';
import '../css/newProjectAndBillMember.css';
import { useState } from 'react';
// import Form from 'react-bootstrap/Form';
import InputBox from "../components/InputBox";
import memberPic from '../assets/324decd33a2ffe73b52ccb22ec6b29eb.jpg';
import { forwardRef } from 'react';

const BillMember = forwardRef(({ memberName },ref )=> {
    // const [memberName, setName] = useState("")

    return(
        <div className='inputDiv'>
            <img className='memberPic' src={ memberPic }></img>
            <div className='inputArea'>
                <InputBox label='Name' ref={ ref } value={ memberName }/>
            </div>
            
        </div>
    )
})

export default BillMember;