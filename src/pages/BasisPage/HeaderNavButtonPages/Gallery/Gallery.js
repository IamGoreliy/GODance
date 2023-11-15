import {createContext, useEffect, useState} from "react";
import {GalleryRenderPhotoVideo} from "../../../../components/GallaryRenderPhotoVideo/GallaryRenderPhotoVideo";
import {getVideoUrl, getPhoto} from "../../../../Redux/operation";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import styler from './Gallery.module.css';
import {ReactSVG} from "react-svg";
import buttonBack from '../../../../image/image/svg/arrow-back.svg'

export const UpdatePageContext = createContext();

export const Gallery = () => {
    const [isOpenPhoto, setIsOpenPhoto] = useState(false);
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [isUpdateFile, setIsUpdateFile] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if (isOpenPhoto || isUpdateFile) {
            dispatch(getPhoto())
            setIsUpdateFile(false);
        }
        if (isOpenVideo || isUpdateFile) {
            dispatch(getVideoUrl());
            setIsUpdateFile(false);
        }
    }, [isOpenPhoto, isUpdateFile, isOpenVideo]);




    return (
        <UpdatePageContext.Provider value={setIsUpdateFile}>
            <section className={styler.generalSection}>
                <h1 className={styler.title}>Gallery</h1>
                <NavLink to='/'>
                    <button className={styler.buttonBack}>
                        <ReactSVG src={buttonBack}/>
                    </button>
                </NavLink>
                {/*стилизация добавление */}
                <div>
                    <div className={styler.navigationWrapper}>
                        <div className={isOpenPhoto ? styler.buttonPhotoActive : styler.buttonPhoto} onClick={() => {
                            setIsOpenVideo(false);
                            setIsOpenPhoto(!isOpenPhoto);
                        }}>
                            <h1 className={styler.titleButtonPhoto}>Photo</h1>
                        </div>
                        <div className={isOpenVideo ? styler.buttonPhotoActive :styler.buttonVideo} onClick={() => {
                            setIsOpenPhoto(false);
                            setIsOpenVideo(!isOpenVideo);
                        }}>
                            <h1 className={styler.titleButtonVideo}>Video</h1>
                        </div>
                    </div>

                    {isOpenPhoto || isOpenVideo ? <GalleryRenderPhotoVideo fileDataForRender={{isOpenPhoto, isOpenVideo}}/> : ''}
                </div>
            </section>
        </UpdatePageContext.Provider>

    )
}