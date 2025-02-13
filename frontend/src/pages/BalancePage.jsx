import BillMember from "../components/BillMember";
import CancelAndComfirmBtn from '../components/CancelAndComfirmBtn';
const BalancePage = () =>{

    return(
        <>
            <h2>Balance 結算</h2>
            <hr />
            <BillMember />
            <CancelAndComfirmBtn />
        </>
    )
}

export default BalancePage;