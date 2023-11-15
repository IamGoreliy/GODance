import {useContext, useState, useEffect} from "react";
import {UpdatePageContext} from "../../pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getVideoUrl} from "../../Redux/operation";


const serializeFormQuery = (fnSearchParams, ...rest) => {
    const input = rest;
    let inputValue = {};
    const initialState = {
        nameVideo: input[0],
        typeVideo: input[1],
        categoryVideo: input[2],
        dateVideoStart: input[3],
        dateVideoEnd: input[4],
    }
    for (const nameInput in initialState) {
        if (initialState[nameInput]) {
            inputValue = {...inputValue, [nameInput]: initialState[nameInput]}
        }
    }
    fnSearchParams(inputValue);
}

const sendForm = (dispatch) => {
    const queryString = window.location.search;
    const url = `http://localhost:3001/searchMovie${queryString}`;
    dispatch(getVideoUrl(url));
}

const resetForm = (fnNameVideo, fnTypeVideo, fnCategoryVideo, fnDateVideoStart, fnDateVideoEnd, dispatch) => {
    fnNameVideo('');
    fnTypeVideo('all');
    fnCategoryVideo('all');
    fnDateVideoStart('');
    fnDateVideoEnd('');
    dispatch(getVideoUrl());
}

export const FilterForMovie = () => {
    const setIsUpdateFile = useContext(UpdatePageContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [nameVideo, setNameVideo] = useState(searchParams.get('nameVideo') ?? '');
    const [typeVideo, setTypeVideo] = useState(searchParams.get('typeVideo') ?? 'all');
    const [categoryVideo, setCategoryVideo] = useState(searchParams.get('categoryVideo') ?? 'all');
    const [dateVideoStart, setDateVideoStart] = useState(searchParams.get('dateVideoStart') ?? '');
    const [dateVideoEnd, setDateVideoEnd] = useState(searchParams.get('dateVideoEnd') ?? '');
    const dispatch = useDispatch();

    useEffect(() => {
        serializeFormQuery(setSearchParams, nameVideo, typeVideo, categoryVideo, dateVideoStart, dateVideoEnd)
    }, [nameVideo, typeVideo, categoryVideo, dateVideoStart, dateVideoEnd]);

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendForm(dispatch);
            }
            }>
                <label>
                    <input onChange={({target: {value}}) => {
                        // dispatch({name: 'nameVideo', value});
                        setNameVideo(value);
                    }}
                           value={nameVideo}
                           type='text'
                           name='videoName'
                           placeholder='поиск видео по имени'/>
                </label>
                <select onChange={({target: {value}}) => setCategoryVideo(value)}
                        name='videoCategory'
                        value={categoryVideo}
                >
                    <option value='all'>all</option>
                    <option value='dance'>Dance</option>
                    <option value='hip-hop'>HIP-HOP</option>
                </select>
                <select onChange={({target: {value}}) => setTypeVideo(value)} value={typeVideo} name='typeVideo'>
                    <option value='all'>all</option>
                    <option value='shorts'>shorts</option>
                    <option value='full'>full video</option>
                </select>
                <label>
                    <input onChange={({target: {value}}) => {
                        setDateVideoStart(value);
                        const time = new Date();
                        setDateVideoEnd(time.toISOString().substring(0, 10));
                    }} value={dateVideoStart} type='date' name='dateVideoStart'/>
                </label>
                <label>
                    <input onChange={({target: {value}}) => setDateVideoEnd(value)} value={dateVideoEnd} type='date' name='dateVideoEnd'/>
                </label>
                <button>поиск</button>
                <button onClick={() => resetForm(setNameVideo, setTypeVideo, setCategoryVideo, setDateVideoStart, setDateVideoEnd, dispatch)}>очистить поиск</button>
            </form>
        </div>
    )
}