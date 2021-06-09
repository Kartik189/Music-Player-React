import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Audio';
import Search from './Search';

const url="https://spotify-api-wrapper.appspot.com";

class App extends Component {

    state = { artist: null , tracks: [] };

    componentDidMount() {
        this.searchArtist('Bruno');
    }

    searchArtist = (artistQuery) => {
        if(artistQuery.length!=0)
        {
            fetch(`${url}/artist/${artistQuery}`)
            .then(response => response.json())
            .then(json => {
                
                if(json.artists.total>0)
                {
                    const artist=json.artists.items[0];
                    this.setState({artist});
                    fetch(`${url}/artist/${artist.id}/top-tracks`)
                    .then(response => response.json())
                    .then(json => this.setState({tracks: json.tracks}))
                }
            })
            .catch(error => alert(error.message));
        }
    }

    render() {
        return(
            <div>
                    <h2>Music Master</h2> 
                <Search searchTheArtist={this.searchArtist}/>
                <Artist artist={this.state.artist}/>
                <Tracks tracks={this.state.tracks}></Tracks>
            </div>
        );
    }
}

export default App;