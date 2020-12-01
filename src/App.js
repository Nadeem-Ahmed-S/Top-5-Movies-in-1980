import React , {Component} from 'react'
import './App.css';
import axios from 'axios'

class App extends Component{
  state ={
      movie : [],
      id : '',
      clickedValue : false,
      synopsis : []
    }
  
    componentDidMount(){
      axios.get('top5MoviesAssessement.json')
        .then( response => {
          this.setState({
            ...this.state,
            movie : response.data.components[1].items.sort((a,b) => a.rank - b.rank)
          })
        }) 
    }

    optionSelectedHandler=(event)=>{
      if(event.target.value === 'rank'){
        this.setState({
          ...this.state,
          movie : this.state.movie.sort((a,b)=>a.rank - b.rank),
          clickedValue : false
        })
      }
      if(event.target.value === 'id'){
        this.setState({
          ...this.state,
          movie : this.state.movie.sort((a,b)=>a.id - b.id),
          clickedValue : false
        })
      }
      if(event.target.value === 'releaseDate'){
        this.setState({
          ...this.state,
          movie : this.state.movie.sort((a,b)=>a.releaseDate - b.releaseDate),
          clickedValue : false
        })
      }
    }
  
    synopsisDisplayHandler=(idMov)=>{
      const index = this.state.movie.findIndex(p => {
        return p.id === idMov  ;
      })
      
      const dupMovie = {...this.state.movie};
      const indexedMovie =dupMovie[index];
      const selectedSynopsis = indexedMovie.synopsis;
  
      this.setState({
        ...this.state,
        id : idMov,
        clickedValue : true,
        synopsis : selectedSynopsis
      })
    }
  
    render(){
      const moviesLoader = this.state.movie.map(mov => {
        return <div key={mov.id} className="movieDiv">
          <img src={mov.imageUrl} alt="" onClick={()=>this.synopsisDisplayHandler(mov.id)}/>
          {this.state.clickedValue && (this.state.id === mov.id) ? 
              <div>
                <p>Title : {mov.title}</p>
                <p>Released Year : {mov.releaseDate}</p>
                <p>Synopsis : {this.state.synopsis}</p>
              </div>
          : null}
        </div>
      })
  
      return( 
        <div className="App">
          <h1>Top 5 Movies</h1>
          <select defaultValue="rank" onChange={this.optionSelectedHandler}>
              <option value="rank">Rank</option>
              <option value="id">Id</option>
              <option value="releaseDate">Release Date</option>
          </select>
          {moviesLoader}
        </div>
      );
    }
}

export default App;
