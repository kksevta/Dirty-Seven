export const getAllDocuments = (model) => {
    return model.find({});
}

export const addDocument = (documentToAdd) => {
    return documentToAdd.save();
}

export const removeDocument = (model, documentIdToRemove) => {
    return model.remove({ name: documentIdToRemove });
}

export const getDocumentByID = (model, documentIdToGet) => {
    return model.findById(documentIdToGet);
}

export const updateDocumentById = (model, documentIdToUpdate, data) => {
    return model.findOneAndUpdate({ _id: documentIdToUpdate }, data, { new: true });
}