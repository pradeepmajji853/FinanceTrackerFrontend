import Title from "./Title.jsx"
import Navbar from "./Navbar.jsx"
import TitleImg from "./TitleImg.jsx"
import "./Heropage.css"
export default function Heropage(){
    return(
    <div className="Heropage">
    <Navbar/>
    <div className="TitleBox">
    <Title/>
    <TitleImg/>
    </div>
    
    </div>
    )

}