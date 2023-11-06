import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getPhoto} from "../Redux/operation";

const setParams = (fn, ...rest) => {
    let result = {};
    const state = {
        'name_photo': rest[0],
        'date_upload_video': rest[1],
        'date_upload_video_end': rest[2],
    }
    for (const nameInput in state) {
        if (state[nameInput]) {
            result = {...result, [nameInput]: state[nameInput]}
        }
    }
    fn(result);
}

const resetForm = (dispatch, setName, setDateStart, setDataEnd) => {
    setName('');
    setDateStart('');
    setDataEnd('');
    dispatch(getPhoto());
}

const sendFrom = (dispatch) => {
    const queryString = window.location.search;
    const url = `http://localhost:3001/searchPhoto${queryString}`;
    dispatch(getPhoto(url));
}

export const FilterForPhoto = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchName, setSearchName] = useState(searchParams.get('photoName') ?? '');
    const [searchDateStart, setSearchDateStart] = useState(searchParams.get('photoDateStart') ?? '');
    const [searchDateEnd, setSearchDateEnd] = useState(searchParams.get('photoDateEnd') ?? '');
    const dispatch = useDispatch();

    useEffect(() => {
        setParams(setSearchParams, searchName, searchDateStart, searchDateEnd);
    }, [searchName, searchDateStart, searchDateEnd])

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                sendFrom(dispatch);
            }}>
                <label>
                    <input onChange={({target: {value}}) => setSearchName(value)}
                           type='text'
                           name='searchName'
                           value={searchName}/>
                </label>
                <label>
                    <input onChange={({target: {value}}) => {
                        setSearchDateStart(value);
                        const date = moment().format('YYYY-MM-DD');
                        setSearchDateEnd(date);
                    }}
                           type='date'
                           name='searchDateStart'
                           value={searchDateStart}/>
                </label>
                <label>
                    <input onChange={({target: {value}}) => setSearchDateEnd(value)}
                           type='date'
                           name='searchDateEnd'
                           value={searchDateEnd}/>
                </label>
                <button>поиск</button>
                <button onClick={() => resetForm(dispatch, setSearchName, setSearchDateStart, setSearchDateEnd)}>очистить фильтр</button>
            </form>
        </div>
    )
}