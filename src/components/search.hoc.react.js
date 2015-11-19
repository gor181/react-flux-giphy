const React = require('react');
const Store = require('../stores/search-results.store');
const Actions = require('../actions/search.actions');

const Bar = require('./_search-bar.react');
const Results = require('./_search-results.react');

module.exports = React.createClass({
    displayName: 'SearchHOC',

    getInitialState() {
        return this._rebuildState();
    },

    _onChange() {
        this.setState(this._rebuildState());
    },

    _rebuildState() {
        return {
            results: Store.getResults(),
            pagination: Store.getPagination()
        };
    },

    componentWillMount() {
        Store.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    },

    render() {
        const { results, pagination } = this.state;
        const { count, offset } = pagination;

        return (
            <div className="container">
                <h2>Search Via Giphy!</h2>

                <div className="col-md-8 top10">
                    <Bar search={(term) => Actions.search(count, offset, term)} />
                    <hr />
                    { results.length > 0 && <Results results={results} /> }
                </div>
            </div>
        );
    }
});
