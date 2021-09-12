
import { Link } from 'react-router-dom'

function Home(){
    
    return(
        <div style={{minHeight: "100px", border: "solid black 1px"}}>
           <p>Home</p>
           <div>
                <Link to="/weather">
                    <span>weather</span>
                </Link>
                <Link to="/movies">
                    <span>movies</span>
                </Link>
           </div>
        </div>
    )
}

export default Home