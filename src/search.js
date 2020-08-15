import React from 'react';
import Axios from 'axios';
import Autocomplete from 'react-autocomplete';

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autoCompleteValue: '',
            tracks: []
        }
    }

    handleSelect(value, item) {
        this.setState({
            autoCompleteValue: value,
            track: item
        })
    }

    handleChange(event, value) {
        this.setState({autoCompleteValue: event.target.value});
        let _this = this;
        Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
        .then(function (response) {
            _this.setState({track: response.data});
        })
        .catch(function (err) {
            console.log(err)
        })
    }

    handleRenderItem(item, isHighlighted) {

        const listStyles = {
            items: {
                padding: '2px 6px',
                cursor: 'default'
            },

            highlightedItem: {
                color: 'white',
                background: '#F38B72',
                padding: '2px 6px',
                cursor: 'default'
            }
        }

        return(
            <div style={isHighlighted ? listStyles.highlightedItem : listStyles.item}
            key={item.id}
            id={item.id}>
                {item.title}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Autocomplete 
                ref="autocomplete"
                inputProps={{title: "Title"}}
                value={this.props.autoCompleteValue}
                items={this.props.tracks}
                getItemValue={(item) => item.title}
                onSelect={this.props.handleSelect}
                onChange={this.props.handleChange}
                renderItem={this.handleRenderItem.bind(this)}
                />
            </div>
        );
    }
}

export default Search;