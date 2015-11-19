const React = require('react');

module.exports = React.createClass({
    displayName: 'SearchBar',

    propTypes: {
        search: React.PropTypes.func.isRequired
    },

    render() {
        const { search } = this.props;
        return (
            <input
                type="text"
                className="form-control"
                placeholder="Please enter search query"
                onChange={this._onSearch}
            />
        );
    },

    _onSearch(e) {
        const { value } = e.target;

        if (!value) {
            return;
        }

        this.props.search(value);
    }
});
