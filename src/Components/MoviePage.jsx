import React from "react"

class MoviePage extends React.Component{
    constructor(props){
        
        super(props)
        
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
                    errorDes: "unable to present data"
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorDes: "something went wrong"
                });
            }
        )
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render(){
        return(
            <div>
                <button onClick={this.goBack}>back</button>
                <div className="flex flex-col items-start border m-10 p-5">
                    {this.state.error && <p>{this.state.errorDes}</p>}
                    {this.state.loading && <p className="text-xl self-center">Loading</p>}
                    {!this.state.loading && !this.state.error &&
                        Object.keys(this.state.data).map((key, index) => {
                            if(key !== "Poster"){
                                if(key !== "Ratings"){
                                    return (
                                    <p key={index.toString()}>
                                        <span className="font-semibold">{key}:  </span>
                                        <span>{this.state.data[key]}</span>
                                    </p>
                                    )
                                }else{
                                    return(
                                        <div key={index.toString()} className="flex flex-col items-start my-3">
                                            <p className="font-semibold">Ratings: </p>
                                            {this.state.data[key].map((ratings, index) => {
                                                console.log("key map", ratings);
                                                return(
                                                    <p key={index.toString()}>
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