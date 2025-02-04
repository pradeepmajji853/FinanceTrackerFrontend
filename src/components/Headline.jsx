import "./Headline.css"
export default function Headline({data}){
    return(
        <div className="Headline">
            <div className="Headlinetitle">
                <h1>{data.title}</h1>
            </div>
            <div className="Headlinecontent">
                 <h5>{data.content}</h5>
            </div>
            
        </div>
    )
}