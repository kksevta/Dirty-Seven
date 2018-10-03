import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../http-wrapper/http-wrapper.service';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class AppCoreService {

  constructor(private httpWrapperService: HttpWrapperService) { }

  continuePlayWithName(data) {
    const requestData = {
      url: environment.endpoints.CONTINUE_PLAY_WITH_NAME.url,
      body: {
        playerName: data.playerName
      }
    };
    return this.httpWrapperService.postData(requestData);
  }

  createRoom() {
    const requestData = {
      url: environment.endpoints.CREATE_ROOM.url,
      body: {}
    };
    return this.httpWrapperService.postData(requestData);
  }

  joinRoom(roomID) {
    const requestData = {
      url: environment.endpoints.JOIN_ROOM.url,
      body: {
        roomID: roomID
      }
    };
    return this.httpWrapperService.postData(requestData);
  }

  startGame() {
    const requestData = {
      url: environment.endpoints.START_GAME.url,
      body: {}
    };
    return this.httpWrapperService.postData(requestData);
  }

  playCard(cardID) {
    const requestData = {
      url: environment.endpoints.PLAY_CARD.url,
      body: {
        cardID: cardID
      }
    };
    return this.httpWrapperService.postData(requestData);
  }

  getNewCard() {
    const requestData = {
      url: environment.endpoints.GET_NEW_CARD.url,
      body: {

      }
    };
    return this.httpWrapperService.postData(requestData);
  }

}
