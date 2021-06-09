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

    render() {
        const { tracks } = this.props;
        return(
            <div>
                <hr />
                {
                    tracks.map(track => {
                        const {id , name , album , preview_url } =track;
                        return(
                            <div key={id} onClick={this.playAudio(preview_url)} style={{display: 'inline-block', margin: 30}}> 
                                <img src={album.images[0].url} alt='track-image' style={{height:200 ,width:200, borderRadius:100}}/>
                                <p>{name}</p>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Tracks;