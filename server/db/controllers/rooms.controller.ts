import { RoomsModel } from '../models/rooms.model';
import { getAllDocuments, addDocument, removeDocument, getDocumentByID, updateDocumentById } from '../models/root.model';
import {
    logInfo, logError
} from '../../core/logger/app-logger';

export const getAllRooms = () => {
    try {
        return getAllDocuments(RoomsModel);
    } catch (ex) {
        logError(ex);
    }
}

export const addRoom = (data) => {
    try {
        const roomModel = new RoomsModel(data)
        return addDocument(roomModel);
    } catch (ex) {
        logError(ex);
    }
}

export const deleteRoom = (id) => {
    try {
        return removeDocument(RoomsModel, id);
    } catch (ex) {
        logError(ex);
    }
}

export const getRoomById = (id) => {
    try {
        return getDocumentByID(RoomsModel, id);
    } catch (ex) {
        logError(ex);
    }
}

export const updateRoom = (id, data) => {
    try {
        return updateDocumentById(RoomsModel, id, data);
    } catch (ex) {
        logError(ex);
    }
}