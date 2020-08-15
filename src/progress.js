import React from 'react';

class Progress extends React.Component {

    render() {
        return(
            <div>
                <span>
                    {this.props.elapsed}
                </span>
                <progress 
                    value={this.props.position}
                    max="1">

                </progress>
                <span>{this.props.total}</span>
            </div>
        );
    }
}

export default Progress;