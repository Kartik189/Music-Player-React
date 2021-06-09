import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Audio';

const url="https://spotify-api-wrapper.appspot.com";

class App extends Component {

    state = { artistQuery: '' , artist: null , tracks: []};

    updateArtistQuery = (event) => {
        this.setState({artistQuery:event.target.value});
    }

    searchArtist = () => {
        if(this.state.artistQuery.length!=0)
        {
            fetch(`${url}/artist/${this.state.artistQuery}`)
            .then(response => response.json())
            .then(json => {
                
                if(json.artists.total>0)
                {
                    const artist=json.artists.items[0];
                    this.setState({artist});
                    console.log(artist);
                    fetch(`${url}/artist/${artist.id}/top-tracks`)
                    .then(response => response.json())
                    .then(json => this.setState({tracks: json.tracks}))
                }
            })
            .catch(error => alert(error.message));
        }
    }

    handleKeyPress = event => {
        if(event.key=='Enter')
            this.searchArtist();
    }

    render() {
        return(
            <div>
                <div>
                    <h2>Music Master</h2>
                    <input 
                        onChange={this.updateArtistQuery} 
                        placeholder='Search for an Artist' 
                        onKeyPress={this.handleKeyPress}
                    />
                    <button onClick={this.searchArtist}>Search</button>
                </div>   
                <Artist artist={this.state.artist}/>
                <Tracks tracks={this.state.tracks}></Tracks>
            </div>
        )
    }
}

export default App;