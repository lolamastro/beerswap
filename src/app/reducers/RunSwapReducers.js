import {fromJS} from 'immutable';

const initialState = fromJS({
    swapId: null,
    attendees: [],
    currentUser: null,
    availableBeers: [],
    isGoingDown: true
});

export const runSwapReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SWAP':
            return state.set('swapId', action.swapId);

        case 'LOAD_SWAP':
            console.log('Load swap');

        case 'RECEIVE_SWAP':
            let currentUser = action.attendees[0];
            return state.set('currentUser', currentUser).
                         setIn(['attendees', action.attendees]).
                         setIn(['availableBeers', action.beers]);

        case 'PICK_BEER':
            console.log('Picking beer');
    }
    return state;
}