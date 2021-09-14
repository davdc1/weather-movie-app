import { Link } from "react-router-dom"

function MovieCard({movie, page, search}){
    return(
        <div className="flex flex-col w-52 mx-10 my-5">
            <img className="" src={movie.Poster} alt="movie poster" />
            <div>
                <span>{movie.Title}</span> - <span>{movie.Year}</span>
            </div>
            <Link to={{
                    pathname: '/moviepage/' + movie.imdbID,
                    state: {page: page, search: search}
                    }}>
                    See details
            </Link>
        </div>
    )
}

export default MovieCard