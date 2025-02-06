import '../css/btn.css';
import '../css/cancleAndComfirmBtn.css';

const CancelAndComfirmBtn = ({text, closeFunction}) =>{
    return(
        <>
            <div className='btns'>
                <button className='cancelBtn' onClick={() => closeFunction}>取消</button>
                <button className='comfirmBtn' onClick={() => closeFunction}>{text}</button>
            </div>
        </>
    )
}

export default CancelAndComfirmBtn;