export const environment = {
  production: true,
  API_BASE: '',
  endpoints: {
    CONTINUE_PLAY_WITH_NAME: {
      url: '/api/continueplaywithname/',
      type: 'POST'
    },
    CREATE_ROOM: {
      url: '/api/createroom/',
      type: 'POST'
    },
    JOIN_ROOM: {
      url: '/api/joinroom/',
      type: 'POST'
    },
    START_GAME: {
      url: '/api/startgame/',
      type: 'POST'
    },
    PLAY_CARD: {
      url: '/api/playcard/',
      type: 'POST'
    },
    GET_NEW_CARD: {
      url: '/api/getnewcard/',
      type: 'POST'
    }
  }
};
