import {getMoreMovie, getMorePhoto} from "../Redux/operation";

export const sendForm = (event, dispatch, middleware, jwt, url, title = '') => {
    const form = event.target;
    const formData = new FormData(form);
    formData.append('token', jwt);
    if (!formData.has('title')) {
        formData.append('title', title);
    }
    dispatch(middleware({url: url, formData}));
    form.reset();
}
export const dayHours = () => {
    const time = [];
    let counter = 0;
    while (24 > time.length) {
        counter += 1;
        counter > 9 ? time.push(`${counter}:00`) : time.push(`0${counter}:00`);
    }
    return time;
}

export const fnSetParams = (page, dispatch, changeRef) => {
    const queryString = window.location.search;
    let url = `http://localhost:3001/photoList?pageQ=${page}`;
    if (queryString) {
        url = `http://localhost:3001/searchPhoto${queryString}&pageQ=${page}`;
    }
    dispatch(getMorePhoto(url));
    changeRef.current = true;
}

export const fnSetParamsVideo = (page, dispatch, changeRef) => {
    const queryString = window.location.search;
    let url = `http:localhost:3001/getVideoUrl?pageQ=${page}`;
    if (queryString) {
        url = `http://localhost:3001/searchMovie${queryString}&pageQ=${page}`;
    }
    dispatch(getMoreMovie(url));
    changeRef.current = true;
}
export const fnCount = (quantityAll, setQuantityDownloads, countPhotoRender) => {
    setQuantityDownloads(quantityAll - countPhotoRender);
}
