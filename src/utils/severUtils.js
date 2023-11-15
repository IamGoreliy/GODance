const inputFields = {
    nameVideo: '',
    typeVideo: 'all',
    genreVideo: '',
    dateVideo: '',
}
const checkInputValue = (request) => {
    const initialInputFields = {};
    let counter = 0
    for (const inputName in request) {
        switch (inputName) {
            case 'nameVideo':
                initialInputFields['name_video'] = request[inputName];
                counter += 1;
                break;
            case 'typeVideo':
                if (request[inputName] !== 'all') {
                    initialInputFields['type_video_player'] = request[inputName];
                    counter += 1;
                    break;
                }
                break;
            case 'categoryVideo':
                if (request[inputName] !== 'all') {
                    initialInputFields['genre_video'] = request[inputName];
                    counter += 1;
                    break;
                }
                break;
            case 'dateVideoStart':
                initialInputFields['upload_video_date'] = request[inputName];
                counter += 1;
                break;
            case 'dateVideoEnd':
                initialInputFields['upload_video_date_end'] = request[inputName];
                counter += 1;
                break;
            default:
            return initialInputFields;
        }
    }
    return {input: initialInputFields, counter};
}

module.exports = {checkInputValue}