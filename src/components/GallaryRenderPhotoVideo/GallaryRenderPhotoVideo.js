import {useSelector, useDispatch} from "react-redux";
import {selectJWTStore, selectPhotoData, selectVideoData, selectCounterPhoto, selectCounterVideo} from "../../Redux/selectors";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {verificationToken, getMorePhoto, getMoreMovie} from "../../Redux/operation";
import {AddPhoto} from "../AddPhoto/AddPhoto";
import {AddVideo} from "../AddVideo/AddVideo";
import {toast} from "react-toastify";
import {FilterForMovie} from "../FilterForMovie/FilterForMovie";
import {FilterForPhoto} from "../FilterForPhoto/FilterForPhoto";
import {YTplayer} from "../YTplayer/YTplayer";
import {YTplayerShorts} from "../YTplayerShorts/YTplayerShorts";
import {fetchPost} from "../../utils/fetchPost";
import {fnSetParams, fnSetParamsVideo, fnCount} from "../../utils/secondaryFunctions";
import {UpdatePageContext} from "../../pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";
// import {Card} from "../Card/Card";
import styled from "@emotion/styled";
import {CardImgTestMUI} from "../CardImgTestMUI/CardImgTestMUI";
import {useScrollPosition} from "../../testComponents/InfinityScroll/InfinityScroll";

const WrapperList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const List = styled.ul`
    list-style: none;
    width: 350px;
    height: 500px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    //align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 20px;
    padding: 0;
    //padding: 10px;
    margin-top: 40px;
`

export const GalleryRenderPhotoVideo = (
    {fileDataForRender: {
        isOpenPhoto,
        isOpenVideo
    }}
) => {
    const setIsUpdateFile = useContext(UpdatePageContext);
    const [quantityDownloaded, setQuantityDownloaded] = useState(0);
    const counterPhotoAll = useSelector(selectCounterPhoto); // всего: 30
    const counterVideoAll = useSelector(selectCounterVideo);
    const {jwt, verificationJWT} = useSelector(selectJWTStore);
    const photo = useSelector(selectPhotoData);
    const video = useSelector(selectVideoData);
    const dispatch = useDispatch();
    const isUploading = useRef(true);
    const heightList = useRef();
    const posScroll = useScrollPosition(heightList);
    const [testLayout, setTestLayout] = useState(0);


    useLayoutEffect(() => {
        const height = heightList.current.offsetHeight;
        console.log('height', height);
    }, [photo.photo])


    useEffect(() => {
        if (photo.photo && isUploading) {
            fnCount(counterPhotoAll, setQuantityDownloaded, photo.photo.length);
            isUploading.current = false;
        }
    }, [isUploading, photo.photo]);

    useEffect(() => {
        if (video.urlList && isUploading) {
            fnCount(counterVideoAll, setQuantityDownloaded, video.urlList.length);
            isUploading.current = false
        }
    }, [isUploading, video.urlList]);


    useEffect(() => {
        if (jwt) {
            dispatch(verificationToken({jwt}));
        }
    }, []);


    const fnDeletePhotoVideo = async (url, id, jwt) => {
        try{
            const response = await fetchPost(url, {id, jwt});
            toast.success(response);
            setIsUpdateFile(true);
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div>
            {isOpenPhoto &&
                <WrapperList>
                    <FilterForPhoto/>
                    {verificationJWT && <AddPhoto/>}
                    <List ref={heightList}>
                        {photo?.photo?.map(ele => {
                            const {id, url_photo: urlPhoto, name_photo: namePhoto, date_upload_video: dateUploadPhoto} = ele;
                            return (
                                // <li key={id}>
                                //     <img src={photo.path + urlPhoto} alt={namePhoto} style={{width: '300px', height: '300px'}}/>
                                //     {verificationJWT && <button onClick={() => fnDeletePhotoVideo('http://localhost:3001/deletePhoto', id, jwt)}>удалить</button>}
                                // </li>
                                // <Card key={ele.id} {...ele} path={photo.path}/>
                                <CardImgTestMUI key={id} {...ele} path={photo.path}/>
                            )
                        })}
                    </List>
                    {quantityDownloaded > 0 && <button onClick={() => fnSetParams(photo.photo.length, dispatch, isUploading)}>показать больше</button>}
                </WrapperList>
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

