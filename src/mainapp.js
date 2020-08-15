import React from 'react'
import Axios from 'axios'
import Sound from 'react-sound';
import Search from './search'
import Details from './details';
import Progress from './progress';
import Footer from './footer';
import Main from './main'
import './mainapp.css'

class Mainapp extends React.Component {
    constructor(props) {
        super (props);
        this.client_id = 'YOUR_CLIENT_ID';
        this.state = { track: 
        {stream_url: '', title: '', artwork_url: ''}, 
        tracks: [],
        playStatus: Sound.status.STOPPED,
        elapsed: '00:00',
        total: '00:00',
        position: 0, 
        playFromPosition: 0}
    }

    randomTrack () {
        let _this = this;
        Axios.get(`${this.client_id}`).then(function (response) {
            const trackLength = response.data.tracks.length;

            const randomNumber = Math.floor((Math.random() * 
            trackLength) + 1);
            console.log(response);
            _this.setState({track: response.data.tracks[randomNumber]});
        })

        .catch(function(err) {
            console.log(err);
        });
    }

    togglePlay(){
        if (this.state.playStatus === Sound.status.PLAYING) {
            this.setState({playStatus: Sound.status.PAUSED})
        } else {
            this.setState({playStatus: Sound.status.PLAYING})
        }
    }

    stop(){
        this.setState({playStatus: Sound.status.STOPPED})
    }

    forward(){
        this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
    }

    backward(){
        this.setState({playFromPosition: this.state.playFromPosition-=1000*10})
    }

    formatMilliseconds(milliseconds) {
        var hours = Math.floor(milliseconds / 3600000);
        milliseconds = milliseconds % 3600000;

        var minutes = Math.floor(milliseconds / 60000);
        milliseconds = milliseconds % 60000;

        var seconds = Math.floor(milliseconds / 1000);
        milliseconds = Math.floor(milliseconds % 1000);

        return (minutes < 10 ? '0' : '') + minutes + 
        ':' + (seconds < 10 ? '0' : '') + seconds;
    }

    handleSelect(value, item) {
        this.setState({
            autoCompleteValue: value, track: item
        })
    }

    handleChange(event, value) {
        this.setState({autoCompleteValue: event.target.value});
        let _this = this;
        Axios.get(`${this.client_id}&q=${value}`).then(function (response) {
            _this.setState({tracks: response.data});
        })
        .catch(function (err) {
            console.log(err);
        })
    }

    handleSongPlaying(audio) {
        this.setState({ elapsed: 
        this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.position),
            position: audio.position / audio.duration})
    }

    prepareUrl(url) {
        return `${url}?client_id=${this.client_id}`
    }

handleSongFinished () {
    this.randomTrack();
}

    componentDidMount() {
        this.randomTrack();
    }

    render() {
        return (
            <div>
                <Search 
                client_id={this.state.client_id}
                autoCompleteValue={this.state.autoCompleteValue}
                tracks={this.state.tracks}
                handleSelect={this.handleSelect.bind(this)}
                handleChange={this.handleChange.bind(this)}
                />
                <Details title={this.state.trck.title} />
                <Sound 
                url={this.prepareUrl(this.state.track.stream_url)}
                playStatus={this.state.playStatus}
                onPlaying={this.handleSongPlaying.bind(this)}
                playFromPosition={this.state.playFromPosition}
                onFinishedPlaying={this.handleSongFinished.bind(this)}
                />
                <Main 
                togglePlay={this.togglePlay.bind(this)}
                stop={this.stop.bind(this)}
                playStatus={this.state.playStatus}
                forward={this.forward.bind(this)}
                backward={this.backward.bind(this)}
                random={this.randomTrack.bind(this)}
                />
                <Progress 
                position={this.state.position}
                elapsed={this.state.elapsed}
                total={this.state.total}
                />
            </div>
        );
    }
}

export default Mainapp;