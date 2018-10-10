import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppCoreService } from '@app/core/services/app-core/app-core.service';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { Store } from '@ngrx/store';
import { getAuthTokenFromAppState } from '@app/store/reducers/root.reducer';
import { take } from 'rxjs/operators';
import { SetLiveDataAction } from '@app/store/actions/app-core.actions';
import { getAppState } from '@app/store/reducers/root.reducer';

@Component({
    selector: 'app-app-wrapper',
    templateUrl: './app-wrapper.component.html',
    styleUrls: ['./app-wrapper.component.css']
})
export class AppWrapperComponent implements OnInit {
    ws: any;
    hostName: any;
    enterNameSection = true;
    menuSelectionSection = false;
    waitingForPlayerSection = false;
    playGameSection = false;
    finishGameSection = false;


    playerName: any;
    roomID: any;
    chatMessageToSend: any;

    players: any;
    myCards: any;
    me: any;
    playerTurn: any;
    topCard: any;
    canStartedBy: any;
    playersWinningOrder: any;
    chatMessages: any;
    sevenCounter: any;
    constructor(private appCoreService: AppCoreService, private store: Store<any>, private cdr: ChangeDetectorRef) {
        this.hostName = window.location.hostname;
    }

    ngOnInit() {
        this.playerName = localStorage.getItem('playerName');
        this.changeSectionVisibility('enterName');
        this.store.select(getAppState).subscribe((gameState) => {
            this.roomID = gameState ? gameState.roomID : '';
            this.players = gameState ? gameState.players : [];
            this.myCards = gameState ? gameState.myCards : [];
            this.myCards = this.myCards.sort(function (a, b) {
                return a.suit > b.suit;
            });
            this.me = gameState ? gameState.me : {};
            this.playerTurn = gameState ? gameState.playerTurn : '';
            this.topCard = gameState ? gameState.topCard : {};
            this.canStartedBy = gameState ? gameState.canStartedBy : {};
            this.playersWinningOrder = gameState ? gameState.playersWinningOrder : [];
            this.chatMessages = gameState ? gameState.chatMessages : [];
            this.sevenCounter = gameState ? gameState.sevenCounter : 0;
            if (!this.playGameSection && gameState && gameState.gameStarted) {
                this.changeSectionVisibility('play');
            }
            if (!this.finishGameSection && gameState && gameState.gameFinished) {
                this.changeSectionVisibility('finish');
            }
            this.cdr.detectChanges();
        });
    }


    sendWebSocketRequest() {
        this.ws.send('some thing').subscribe(
            (msg) => {
                console.log('next', msg.data);
            },
            (msg) => {
                console.log('error', msg);
            },
            () => {
                console.log('complete');
            }
        );
    }


    startGame() {
        this.appCoreService.startGame().subscribe((data) => {
        });
    }

    continueToMenuSelection() {
        localStorage.setItem('playerName', this.playerName);
        if (this.playerName) {
            this.appCoreService.continuePlayWithName({ playerName: this.playerName }).subscribe((result) => {
                this.changeSectionVisibility('menu');
            }, (error) => {
            });
        }
    }

    startWebSocketConnection() {
        let token = '';
        this.store.select(getAuthTokenFromAppState).pipe(take(1)).subscribe((AT) => {
            token = AT;
        });
        this.ws = new $WebSocket('ws://' + this.hostName + ':3001?auth-token=' + token);
        this.ws.onMessage((msg: MessageEvent) => {
            this.store.dispatch(new SetLiveDataAction(JSON.parse(msg.data)));
        },
            { autoApply: false }
        );
    }


    closeWebSocketConnection() {
        this.ws.close();
    }


    createRoom() {
        this.appCoreService.createRoom().subscribe((data) => {
            this.changeSectionVisibility('waiting');
            this.startWebSocketConnection();
        });
    }

    joinRoom() {
        if (this.roomID) {
            this.appCoreService.joinRoom(this.roomID).subscribe((data) => {
                this.changeSectionVisibility('waiting');
                this.startWebSocketConnection();
            });
        }
    }

    playCard(cardID) {
        this.appCoreService.playCard(cardID).subscribe((data) => {

        });
    }

    getNewCard() {
        this.appCoreService.getNewCard().subscribe((data) => {

        });
    }

    sendMessage() {
        if (this.chatMessageToSend) {
            this.appCoreService.sendMessage(this.chatMessageToSend).subscribe((data) => {

            });
        }
    }

    changeSectionVisibility(section) {
        switch (section) {
            case 'waiting':
                this.waitingForPlayerSection = true;
                this.menuSelectionSection = false;
                this.enterNameSection = false;
                this.playGameSection = false;
                this.finishGameSection = false;
                break;
            case 'menu':
                this.menuSelectionSection = true;
                this.waitingForPlayerSection = false;
                this.enterNameSection = false;
                this.playGameSection = false;
                this.finishGameSection = false;
                break;
            case 'play':
                this.playGameSection = true;
                this.menuSelectionSection = false;
                this.waitingForPlayerSection = false;
                this.enterNameSection = false;
                this.finishGameSection = false;
                break;
            case 'finish':
                this.finishGameSection = true;
                this.playGameSection = false;
                this.menuSelectionSection = false;
                this.waitingForPlayerSection = false;
                this.enterNameSection = false;
                break;
            case 'enterName':
                this.enterNameSection = true;
                this.menuSelectionSection = false;
                this.waitingForPlayerSection = false;
                this.playGameSection = false;
                this.finishGameSection = false;
                break;
        }
    }
}
