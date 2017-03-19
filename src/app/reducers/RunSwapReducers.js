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

        case 'PICK_BEER':
            console.log('Picking beer');
    }
    return state;
}