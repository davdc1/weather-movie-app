
import { Link } from 'react-router-dom'

function Home(){
    
    return(
        <div style={{minHeight: "100px", border: "solid black 1px"}}>
           <p>Home</p>
           <div>
               {/* <p>weather preview</p>
               <p>movies preview</p> */}
                <Link to="/weather">
                    <span>weather</span>
                </Link>
           </div>
        </div>
    )
}

export default Home