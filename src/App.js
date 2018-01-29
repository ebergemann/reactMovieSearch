import React, { Component } from 'react';
import './App.css';
import './ui-tool/css/nm-cx/main.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      year: '',
      director: '',
      plot: ''
    }
  }
  

  searchMovieTitle(e) {
    e.preventDefault();
    let url = "http://www.omdbapi.com/?apikey=e42f1c3&t=" + this.state.title;
    const promise = axios.get(url);
        promise.then(response => {
        //console.log(response.data);
        this.setState({year: response.data.Year, director: response.data.Director, plot: response.data.Plot});  
      })

      promise.catch(err => {
        console.log(err.response.status);
        // console.log(data);
      })
  }

  handleInput({target}) {
    this.setState({title: target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="medium-3 columns"><span>&nbsp;</span></div>
          <div className="medium-6 columns">
            <h1>Movie Data</h1>
            <div className="row">
              <form onSubmit={this.searchMovieTitle.bind(this)}>
                <div className="medium-10 columns">
                  <input onChange={this.handleInput.bind(this)} name="movieTitle" type="text" placeholder="Enter movie title..." value={this.state.title} />
                </div>
                {this.state.title.trim() === '' &&
                <div className="medium-2 columns">
                  <button disabled className="button btn-cta small">Search</button>
                </div>
              }
                {this.state.title.trim() != '' &&
                <div className="medium-2 columns">
                  <button className="button btn-cta small">Search</button>
                </div>
              }
              </form>
            </div>
            {this.state.year.trim() != 0 && 
              <div className="row">
                <div className="medium-2 columns">
                  <h3>Year:</h3>
                </div>
                <div className="medium-10 columns">
                  <p>{this.state.year}</p>
                </div>
              </div>
            }
            {this.state.director.trim() != 0 &&
              <div className="row">
                <div className="medium-2 columns">
                  <h3>Director:</h3>
                </div>
                <div className="medium-10 columns">
                  <p>{this.state.director}</p>
                </div>
              </div>
            }
            {this.state.plot.trim() != 0 &&
              <div className="row">
                <div className="medium-2 columns">
                  <h3>Plot:</h3>
                </div>
                <div className="medium-10 columns">
                  <p>{this.state.plot}</p>
                </div>
              </div>
            }
          </div>
          <div className="medium-3 columns"><span>&nbsp;</span></div>
        </div>
      </div>
    );
  }
}

export default App;
