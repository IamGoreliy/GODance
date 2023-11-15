import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getMoreMovie, getVideoUrl, getToDo, createTD} from "../Redux/operation";

export const useGetStyleMovie = () => {
    const dispatch = useDispatch();
    let path = window.location.pathname;
    path = path.replace('/', '');
    let url = `http://localhost:3001/searchMovie?categoryVideo=${path}`;

    useEffect(() => {
        dispatch(getVideoUrl(url));
    }, []);

    const getMore = (page) => {
        url = `${url}&pageQ=${page}`;
        dispatch(getMoreMovie(url));
    }
    return getMore;
}

