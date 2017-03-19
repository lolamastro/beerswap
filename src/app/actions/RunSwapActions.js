export function setSwapId(swapId) {
    return {
        type: 'SET_SWAP',
        swapId
    };
}

export function fetchSwap(swapId) {
    return function (dispatch) {

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        let url = `http://beerswap.enservio.lan/BeerWS/api/Beer/Swap/attendees/V1/${swapId}`;

        return fetch(url, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                mode: 'cors',
                method: 'get'
            })
            .then(response => response.json())
            .then(json =>
                // Here, we update the app state with the results of the API call.
                dispatch(receiveSwap(swapId, json))
            );
    }
}

function receiveSwap(swapId, json) {
    return {
        type: 'RECEIVE_SWAP',
        swapId,
        attendees: json.UserSelections.map(us => `${us.FirstName} ${us.LastName}`),
        beers: json.UserSelections.map(us => Object.assign({}, us.BeerSelection, {qty: 6}))
    }
}
