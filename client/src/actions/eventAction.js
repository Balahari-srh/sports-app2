import {GET_EVENTS, DELETE_EVENT, ADD_EVENT, EVENTS_LOADING} from './types';
import axios from 'axios';

import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getEvents = () => dispatch => {
    dispatch(setEventsLoading());
    axios
        .get('/api/events/all')
        .then(res=>
            dispatch({
                type:GET_EVENTS,
                payload:res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const addEvent = item => (dispatch,getState) => {
    axios
        .post('/api/events',item,tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_EVENT,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status))
            );
};

export const deleteEvent = id =>{
    return {
        type:DELETE_EVENT,
        payload: id
    };

};



export const setEventsLoading = () =>
{
    return{
        type: EVENTS_LOADING
    };
};