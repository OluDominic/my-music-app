import React from 'react';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track:{stream_url: '', title: '',
        artwork_url: ''}
        }
    }

    render(){
        return(
            <div>
                <Details title={this.state.track.title}/>
            </div>
        );
    }
}

export default Details;