const { api_key, url } = require('../config/giphy');
const { debounce } = require('lodash');

const Events = require('../events/search.events');
const Dispatcher = require('../dispatcher/dispatcher');
const agent = require('superagent');

module.exports = function SearchActions() {
    return {
        search: debounce(function (count, offset, q) {
            Dispatcher.dispatch({ actionType: Events.DATA_LOAD_START });

            agent
                .get(url)
                .query({ api_key, count, offset, q })
                .end((err, response) => {
                    if (err) {
                        Dispatcher.dispatch({ actionType: Events.DATA_LOAD_ERROR });
                        return;
                    }
                    Dispatcher.dispatch({
                        actionType: Events.DATA_LOAD_SUCCESS,
                        results: response.body
                    });
                });
        }, 1000)
    };
}();
