import React from 'react';
import ClassNames from 'classnames';
import { FontAwesomIcon } from '@fortawesome/react-fontawesome';
import { faStop } from '@fortawesome/fontawesome-svg-core';

class Main extends React.Component {

    render() {
        const playPauseClass = ClassNames({
            'fa fa-play': this.props.playStatus == 'PLAYING' ? false : true,
            'fa fa-pause': this.props.playStatus == 'PLAYING' ? true : false
        });

        return (
            <div>
                <div>
                    <button onClick={this.props.backward}>
                      <i className={playPauseClass}>
                          
                              </i>  
                    </button>
                    <button onClick={this.props.stop}>
                        <i className="fa fa-stop"></i>
                    </button>
                    <button onClick={this.props.random}>
                        <i className="fa fa-random"></i>
                    </button>
                </div>
                <div>
                    <button onClick={this.props.forward}>
                        <i className="fa fa-forward"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Main;