const uuidv1 = require('uuid/v1');
export const getNewRoomID = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
export const getNewPlayerID = () => {
    return uuidv1();
}

export const getRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomNumberExcludingList = (max, min, listToExclude) => {
    max = max - 1;
    let randomNo = Math.floor(Math.random() * (max - min + 1) + min);

    while (listToExclude.indexOf(randomNo) >= 0) {
        if (randomNo < max) {
            randomNo++;
        } else {
            randomNo = min;
        }
    }
    return randomNo;
}



// export const getRandomNumbersArray = (max, min, noOfArrays, arrayLength) => {
//     const arrayCollection = [];
//     for (let i = 0; i < noOfArrays; i++) {
//         const collection = [];
//         const listToExclude = getCombinedList(arrayCollection);
//         for (let j = 0; j < arrayLength; j++) {
//             const randomNo = getRandomNumberExcludingList(max, min, listToExclude);
//             listToExclude.push(randomNo);
//             collection.push(randomNo);
//         }
//         arrayCollection.push(collection);
//     }
//     return arrayCollection;
// }

export const getRandomNumbersInArrayFormat = (max, min, noOfArrays, arrayLength) => {
    const arrayCollection = [];
    for (let i = 0; i < noOfArrays; i++) {
        const collection = [];
        const listToExclude = getCombinedList(arrayCollection);
        for (let j = 0; j < arrayLength; j++) {
            const randomNo = getRandomNumbersExcludingList(max, min, listToExclude, 1);
            listToExclude.push(randomNo[0]);
            collection.push(randomNo[0]);
        }
        arrayCollection.push(collection);
    }
    return arrayCollection;
}


const getCombinedList = (arrayCollection) => {
    let collection = [];
    for (let i = 0; i < arrayCollection.length; i++) {
        collection = collection.concat(arrayCollection[i]);
    }
    return collection;
}

export const getRandomNumbersExcludingList = (max, min, listToExclude, count) => {
    if (count == 0) {
        count = 1;
    }
    const randomNoCollection = [];
    for (let i = 0; i < count; i++) {
        const tempMax = max - 1;
        let randomNo = Math.floor(Math.random() * (tempMax - min + 1) + min);
        while (listToExclude.indexOf(randomNo) >= 0) {
            if (randomNo < tempMax) {
                randomNo++;
            } else {
                randomNo = min;
            }
        }
        listToExclude.push(randomNo);
        randomNoCollection.push(randomNo);
    }
    return randomNoCollection;
}
