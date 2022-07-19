import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './header.css'
import {AiOutlineHome, AiOutlineLogout,AiOutlineUser,AiFillShopping ,AiOutlineFileText,AiOutlineDollar} from "react-icons/ai";

const Header = () =>  {
    let navigate = useNavigate();
    const [AgentName, setAgentName] = useState('Mohamed')
    const [AgentPhoto, setAgentPhoto] = useState('https://media-exp1.licdn.com/dms/image/C4D03AQHH8TnTqxu2Eg/profile-displayphoto-shrink_200_200/0/1624038411205?e=1660176000&v=beta&t=PuCtIFH37tV6emuPkBz6suSjxwsDdV8uEdApMAoA2q4')
    return (
        <div className='header'>
<ul className="menu">
    <li className="drop"><AiOutlineLogout/>
    </li>

     

</ul>
<ul className="menu">
   <li  onClick={()=>navigate(`/`)}><AiOutlineHome className="icon-asa drop"/></li>
   <li  onClick={()=>navigate(`/produits`)}><AiFillShopping className="icon-asa drop"/></li>
        <li  onClick={()=>navigate(`/clients`)}><AiOutlineUser className="icon-asa drop"/></li>
        <li  onClick={()=>navigate(`/devis`)}><AiOutlineFileText className="icon-asa drop"/></li>
        <li  onClick={()=>navigate(`/factures`)}><AiOutlineDollar className="icon-asa drop"/></li>

</ul>

<div className="menuhello">
    <p className="hellomessage">
        Hi, <span className="nameagent">{AgentName}</span>
    </p>
    <img className='AgentPhoto' src={AgentPhoto} alt="" />
</div>
        </div>
    );
}
 
export default Header;