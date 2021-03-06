import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        query: '',
        artist: null
      }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log('FETCH_URL', FETCH_URL);
    fetch(FETCH_URL, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer BQAy7OAcO1C-sUGu-LI52du_-rsHniN7KlwGN672mxmnP27ilLWmiVIQejCV4gbTxv8FdqivPIj2Y70dTyfoUWZH3FJGvvUS-M7w6pB_OKU6hJhHiEtmAQXhDVIw1eBN7a1Jc-R9Bwfmjpv_Z8lgoUOF6B4WjT8szPPARhvhIXbb'
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log('json', json);
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Search for an Artist'
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === "Enter") {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph='search'></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Profile
          artist={this.state.artist}
        />
        <div className="Gallery">
          Galley
        </div>
      </div>
    )
  }
}

export default App;
