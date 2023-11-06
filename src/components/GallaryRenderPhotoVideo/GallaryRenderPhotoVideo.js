import {useSelector, useDispatch} from "react-redux";
import {selectJWTStore, selectPhotoData, selectVideoData, selectCounterPhoto, selectCounterVideo} from "../Redux/selectors";
import {useContext, useEffect, useRef, useState} from "react";
import {verificationToken, getMorePhoto, getMoreMovie} from "../Redux/operation";
import {AddPhoto} from "./AddPhoto";
import {AddVideo} from "./AddVideo";
import {toast} from "react-toastify";
import {FilterForMovie} from "./FilterForMovie";
import {FilterForPhoto} from "./FilterForPhoto";
import {YTplayer} from "./YTplayer";
import {YTplayerShorts} from "./YTplayerShorts";
import {fetchPost} from "../utils/fetchPost";
import {UpdatePageContext} from "../pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";


const fnCount = (quantityAll, setQuantityDownloads, countPhotoRender) => {
    setQuantityDownloads(quantityAll - countPhotoRender);
}

const fnSetParams = (page, dispatch, changeRef) => {
    const queryString = window.location.search;
    let url = `http://localhost:3001/photoList?pageQ=${page}`;
    if (queryString) {
         url = `http://localhost:3001/searchPhoto${queryString}&pageQ=${page}`;
    }
    dispatch(getMorePhoto(url));
    changeRef.current = true;
}

const fnSetParamsVideo = (page, dispatch, changeRef) => {
    const queryString = window.location.search;
    let url = `http:localhost:3001/getVideoUrl?pageQ=${page}`;
    if (queryString) {
        url = `http://localhost:3001/searchMovie${queryString}&pageQ=${page}`;
    }
    dispatch(getMoreMovie(url));
    changeRef.current = true;
}

export const GalleryRenderPhotoVideo = (
    {fileDataForRender: {
        isOpenPhoto,
        isOpenVideo
    }}) => {
    const setIsUpdateFile = useContext(UpdatePageContext);
    const [quantityDownloaded, setQuantityDownloaded] = useState(0);
    const counterPhotoAll = useSelector(selectCounterPhoto); // всего: 30
    const counterVideoAll = useSelector(selectCounterVideo);
    const {jwt, verificationJWT} = useSelector(selectJWTStore);
    const photo = useSelector(selectPhotoData);
    const video = useSelector(selectVideoData);
    const dispatch = useDispatch();
    const isUploading = useRef(true);


    useEffect(() => {
        if (photo.photo && isUploading) {
            fnCount(counterPhotoAll, setQuantityDownloaded, photo.photo.length);
            isUploading.current = false;
        }
        if (video.urlList && isUploading) {
            fnCount(counterVideoAll, setQuantityDownloaded, video.urlList.length);
            isUploading.current = false
        }
    }, [isUploading, photo.photo, video.urlList]);

    const fnDeletePhotoVideo = async (url, id, jwt) => {
        try{
            const response = await fetchPost(url, {id, jwt});
            toast.success(response);
            setIsUpdateFile(true);
        } catch (e) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        if (jwt) {
            dispatch(verificationToken({jwt}));
        }
    }, []);

    return (
        <div>
            {isOpenPhoto &&
                <div>
                    <FilterForPhoto/>
                    {verificationJWT && <AddPhoto/>}
                    <ul>
                        {photo?.photo?.map(ele => {
                            const {id, url_photo: urlPhoto, name_photo: namePhoto, date_upload_video: dateUploadPhoto} = ele;
                            return (
                                <li key={id}>
                                    <img src={photo.path + urlPhoto} alt={namePhoto} style={{width: '300px', height: '300px'}}/>
                                    {verificationJWT && <button onClick={() => fnDeletePhotoVideo('http://localhost:3001/deletePhoto', id, jwt)}>удалить</button>}
                                </li>
                            )
                        })}
                    </ul>
                    {quantityDownloaded > 0 && <button onClick={() => fnSetParams(photo.photo.length, dispatch, isUploading)}>показать больше</button>}
                </div>
            }

            {isOpenVideo &&
                <div>
                    <FilterForMovie/>
                    {verificationJWT && <AddVideo/>}
                    <ul>
                        {video?.urlList.map(ele => {
                            const {id, url_video: urlVideo} = ele;
                            let currentUrl, idYTVideo = '';
                            const isShortsVideo = urlVideo.includes('shorts');
                            const isVideoLive = urlVideo.includes('live');
                            if (isShortsVideo) {
                                const idYTVideoShorts = urlVideo.replace('https://youtube.com/shorts/', '');
                                currentUrl = `http://www.youtube.com/embed/${idYTVideoShorts}?autoplay=1`;
                            } else if (isVideoLive) {
                                idYTVideo = urlVideo.replace('https://www.youtube.com/live/', '');
                                currentUrl = `http://www.youtube.com/embed/${idYTVideo}?autoplay=1`;
                            } else {
                                idYTVideo = urlVideo.replace('https://youtu.be/', '');
                                currentUrl = `http://www.youtube.com/embed/${idYTVideo}?autoplay=1`;
                            }

                            return (
                                <li key={id}>
                                    {!isShortsVideo
                                        ?
                                        <div>
                                            <YTplayer url={currentUrl}/>
                                        </div>
                                        :
                                         <div>
                                            <YTplayerShorts url={currentUrl}/>
                                         </div>
                                        }
                                    {verificationJWT && <button onClick={() => fnDeletePhotoVideo('http://localhost:3001/deleteMovie', id, jwt)}>удалить</button>}
                                </li>
                                )
                        })}
                    </ul>
                    {quantityDownloaded > 0 && <button onClick={() => fnSetParamsVideo(video.urlList.length, dispatch, isUploading)}>показать еще</button>}
                </div>
            }
        </div>
    )
}

