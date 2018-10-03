// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
