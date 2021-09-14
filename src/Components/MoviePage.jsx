import React from "react"
import { Link } from "react-router-dom"

class MoviePage extends React.Component{
    constructor(props){
        console.log("p,m,p", props.match.params.id);
        super(props)
        console.log("props page", this.props);
        this.search = "superman"
        this.state = {
            loading: true,
            error: false
        }
    }

    componentDidMount(){
        this.fetchMoviesData();
    }

    fetchMoviesData = () =>{
        fetch(`https://www.omdbapi.com/?i=${this.props.match.params.id}&apikey=dce24c91`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    loading: false,
                    data: result,
                    error: false,
                    errorDes: ""
                });
                console.log("result: ", result);
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorDes: ""
                });
                console.log("fetch error");
            }
        )
    }

    render(){
        return(
            <div>
                <Link to={{
                    pathname: `/movies?search=${this.props.location.state.search}&page=${this.props.location.state.page}`,
                    state: {
                        from: "moviePage",
                        page: this.props.location.state.page,
                        search: this.props.location.state.search
                        }
                    }}>
                    <button>back</button>
                </Link>
                <div className="flex flex-col items-start border m-10 p-5">
                    {this.state.error && <p>error</p>}
                    {this.state.loading && <p className="text-xl self-center">Loading</p>}
                    {!this.state.loading && !this.state.error &&
                        Object.keys(this.state.data).map(key => {
                            if(key !== "Poster"){
                                if(key !== "Ratings"){
                                    return (
                                    <p>
                                        <span className="font-semibold">{key}:  </span>
                                        <span>{this.state.data[key]}</span>
                                    </p>
                                    )
                                }else{
                                    return(
                                        <div className="flex flex-col items-start my-3">
                                            <p className="font-semibold">Ratings: </p>
                                            {this.state.data[key].map((ratings, index) => {
                                                console.log("key map", ratings);
                                                return(
                                                    <p>
                                                        <span className="font-semibold">{this.state.data[key][index].Source}:  </span>
                                                        <span>{this.state.data[key][index].Value}</span>
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MoviePage