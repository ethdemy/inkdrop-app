const initialState = {
  data: {
    name: '',
    bio: '',
    drops: 0,
    address: '',
    ipfsHash: '',
    imgUrl: '',
    followers: 0,
  },
  showTour: false,
  loggedIn: false,
  error: false,
  errorMessage: null,
  loading: false,
  txMessage: null,
}

// actions
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_UPDATED = 'USER_UPDATED'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_DROPPED = 'USER_DROPPED'
export const USER_ERROR = 'USER_ERROR'
export const USER_TX_MSG = 'USER_TX_MSG'
export const USER_ERR_TX_RESET = 'USER_ERR_TX_RESET'
export const USER_PAYOUT = 'USER_PAYOUT'
export const USER_TOUR = 'USER_TOUR'

// reducer
const userReducer = (state = initialState, action) => {
  if (action.type === USER_LOGGED_IN || action.type === USER_UPDATED) {
    return Object.assign({}, state, {
      data: action.payload,
      loggedIn: true,
    })
  }

  if (action.type === USER_LOGGED_OUT) {
    return Object.assign({}, state, initialState)
  }

  if (action.type === USER_ERR_TX_RESET) {
    return Object.assign({}, state, {
      error: false,
      errorMessage: null,
      loading: false,
      txMessage: null,
    })
  }

  if (action.type === USER_TX_MSG) {
    return Object.assign({}, state, {
      txMessage: action.payload,
      loading: action.loading,
    })
  }

  if (action.type === USER_TOUR) {
    return Object.assign({}, state, {
      showTour: action.payload,
    })
  }

  if (action.type === USER_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      txMessage: null,
      error: true,
      errorMessage: action.payload,
    })
  }

  if (action.type === USER_DROPPED) {
    return Object.assign({}, state, {
      data: {
        ...state.data,
        drops: state.data.drops + action.payload,
      },
    })
  }

  if (action.type === USER_PAYOUT) {
    return Object.assign({}, state, {
      data: {
        ...state.data,
        drops: action.payload,
      },
    })
  }

  return state
}

export default userReducer
