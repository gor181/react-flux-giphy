const { get, map } = require('lodash');
const React = require('react');

module.exports = React.createClass({
    displayName: 'SearchResult',

    propTypes: {
        results: React.PropTypes.array.isRequired
    },

    render() {
        const { results } = this.props;
        return (
            <div className='row'>
                {map(results, (result, index) => {
                    return (
                        <div className='col-md-2 pull-left' key={index}>
                            <img
                                src={get(result, 'images.fixed_width_small_still.url')}
                                className="img-thumbnail"
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
});
