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
            return state.set('currentUser', action.attendees[0]).
                         set('attendees', action.attendees).
                         set('availableBeers', action.beers);

        case 'COMPLETE_USER_SELECTION':
            let currentUser = state.get('currentUser'),
                attendees = state.get('attendees'),
                isGoingDown = state.get('isGoingDown');

            if ((currentUser.SelectionOrder === attendees.length  && isGoingDown) ||
                (currentUser.SelectionOrder === 1 && !isGoingDown)) {
                isGoingDown = !isGoingDown;
            } else {
                let idx = isGoingDown ? currentUser.SelectionOrder + 1 : currentUser.SelectionOrder - 1;
                currentUser = attendees[idx - 1];
            }
            return state.set('currentUser', currentUser).
                         set('isGoingDown', isGoingDown);

        case 'COMPLETE_SELECT_BEER':
            let beers = state.get('availableBeers'),
                beerId = action.beerId,
                idx = beers.findIndex((beer) => beer.BeerId === beerId),
                pickedBeer = beers[idx];

            pickedBeer.qty -= 1;

            return state.set('availableBeers', beers);

    }
    return state;
}