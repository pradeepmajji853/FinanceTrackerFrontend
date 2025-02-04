import "./GScontent.css"

import { useInView } from "react-intersection-observer";
export default function GScontent({title,content}){
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
      });
    return(
        <div className="GScontent">
            <div className="GStitle">
                <h1>{title}</h1>

            </div>
            <div className="${inView ? 'slideinbottom' : ''}">
                <ul>
                {content.map((item,index)=>(
                    <li>
                    <h5 key={index}>
                       {item}
                        </h5>
                        </li>

                ))}
                </ul>
            </div>
        </div>
    )
}