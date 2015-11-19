const { assign } = require('lodash');
const AppDispatcher = require('../dispatcher/dispatcher');
const EventEmitter = require('events').EventEmitter;
const Events = require('../events/search.events');
const update = require('react-addons-update');

let _results = [];
let _pagination = {
    count: 25,
    offset: 0
};

let _dataLoadStart = false;
let _dataLoadSuccess = false;
let _dataLoadErrror = false;

const CHANGE_EVENT = 'change';

let Store = assign({}, EventEmitter.prototype, {

    getResults() {
        return _results;
    },

    getPagination() {
        return _pagination;
    },

    _setLoadStart() {
        _dataLoadStart = true;
        _dataLoadSuccess = false;
        _dataLoadErrror = false;
    },

    _setLoadSuccess() {
        _dataLoadStart = false;
        _dataLoadSuccess = true;
        _dataLoadErrror = false;
    },

    _setLoadError() {
        _dataLoadStart = false;
        _dataLoadSuccess = false;
        _dataLoadErrror = true;
    },

    _emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

Store.dispatchToken = AppDispatcher.register(function (payload) {
    switch (payload.actionType) {
        case Events.DATA_LOAD_START:
            Store._setLoadStart();
            Store._emitChange();
            break;

        case Events.DATA_LOAD_SUCCESS:
            const { results } = payload;

            _pagination = update(_pagination, {
                $set: results.pagination
            });

            _results = update(_results, {
                $set: results.data
            });
            
            Store._setLoadSuccess();
            Store._emitChange();
            break;

        case Events.DATA_LOAD_ERROR:
            Store._setLoadError();
            Store._emitChange();
            break;
    }
});

module.exports = Store;
