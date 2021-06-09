import React , { Component } from 'react';

class Tracks extends Component{

    state = {play:false, gana: null , playingUrl: null};

    playAudio = previewUrl => () => {
        const gana = new Audio(previewUrl);

        if(this.state.play)
        {
            this.state.gana.pause();
            if(this.state.playingUrl!=previewUrl)
            {
                gana.play();
                this.setState({ play:true ,gana ,playingUrl:previewUrl});
            }
            else{
                this.setState({ play:false ,gana:null ,playingUrl:null});
            }
        }
        else{
            gana.play();
            this.setState({ play:true ,gana ,playingUrl:previewUrl});
        }
    }

    isThisPlaying(url) {
        if(url==null)
            return <span><strong>N/A</strong></span>
        if(this.state.play && this.state.playingUrl==url)
            return <span><center><strong>| |</strong></center></span>;
        return <span><center>&#9654;</center></span>;
    }

    render() {
        const { tracks } = this.props;
        return(
            <div>
                <hr />
                {
                    tracks.map(track => {
                        const {id , name , album , preview_url } =track;
                        return(
                            <div key={id} onClick={this.playAudio(preview_url)} className="track"> 
                                <img src={album.images[0].url} alt='track-image' className="track-img" />
                                <p className="artist-name" >{name}</p>
                                <p className="play-pause">{this.isThisPlaying(preview_url)}</p>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Tracks;