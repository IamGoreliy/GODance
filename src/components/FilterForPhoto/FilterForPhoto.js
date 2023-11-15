import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getPhoto} from "../../Redux/operation";
import {ReactSVG} from "react-svg";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from "@mui/material/Button";

import styler from './FilterForPhoto.module.css'
import openSearchPanel from '../../image/image/svg/zoom.svg'
import mouse from '../../image/image/svg/mMouse.svg';

const CustomInputForDateMaterial = () => {
    return <div className={styler.testDiv}><ReactSVG src={mouse}/></div>
}

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
    const [isOpenSearchForm, setIsOpenSearchForm] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        setParams(setSearchParams, searchName, searchDateStart, searchDateEnd);
    }, [searchName, searchDateStart, searchDateEnd])

    return (
        <div className={styler.generalSection}>
            <button className={styler.buttonSearchPanel} onClick={() => setIsOpenSearchForm(!isOpenSearchForm)}>
                <ReactSVG src={openSearchPanel}/>
            </button>

                <form className={isOpenSearchForm ? styler.formSearchOpen : styler.formSearch} onSubmit={(e) => {
                     e.preventDefault();
                     sendFrom(dispatch);
                }}>
                        <label className={styler.searchForNameLabel}>
                            <input onChange={({target: {value}}) => setSearchName(value)}
                                   className={styler.searchForName}
                                   type='text'
                                   name='searchName'
                                   value={searchName}
                                   placeholder='поиск по имени фото'
                                   disabled={!isOpenSearchForm}
                            />
                        </label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <div className={styler.dateWrapper}>
                                <MobileDatePicker
                                                  className={styler.date}
                                                  label="выбор даты старт"
                                                  format="DD-MM-YYYY"
                                                  slots={{toolbar: CustomInputForDateMaterial}}
                                                  disabled={!isOpenSearchForm}
                                                  onChange={({_d}) => {
                                                  setSearchDateStart(moment(_d).format('YYYY-MM-DD'))
                                                  setSearchDateEnd(moment(_d).format('YYYY-MM-DD'))
                                                  }}
                                                  value={moment(searchDateStart)}
                                />
                                <MobileDatePicker
                                                  className={styler.date}
                                                  label="выбор даты конец"
                                                  format="DD-MM-YYYY"
                                                  slots={{toolbar: CustomInputForDateMaterial}}
                                                  disabled={!isOpenSearchForm}
                                                  onChange={({_d}) => {
                                                  setSearchDateEnd(moment(_d).format('YYYY-MM-DD'))
                                                  }}
                                                  value={moment(searchDateEnd)}
                                />
                        </div>
                        </LocalizationProvider>
                        <Button variant="contained" type="submit">
                        поиск
                        </Button>
                        <Button variant="outlined"
                        onClick={() => resetForm(dispatch, setSearchName, setSearchDateStart, setSearchDateEnd)}
                        >
                        очистить
                        </Button>

                </form>
        </div>
    )
}

