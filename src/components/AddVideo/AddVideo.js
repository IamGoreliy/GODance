import {useContext, useEffect, useState} from "react";
import {uploadPhotoAndVideoFn} from "../utils/uploadPhotoAndVideoFn";
import {toast} from "react-toastify";
import {UpdatePageContext} from "../pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";

export const AddVideo = () => {
    const setIsUpdateFile = useContext(UpdatePageContext)

    const fnAddVideo = async (url, e) => {
        const form = e.target;
        const formData = new FormData(form);
        formData.append('jwt', window.sessionStorage.getItem('jwt'));
        const response = await uploadPhotoAndVideoFn(url, formData);
        if (response === 'видео было добавлено') {
            toast.success(response);
            setIsUpdateFile(true);
        } else {
            toast.error(response);
        }
        form.reset();
    }

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await fnAddVideo('http://localhost:3001/addVideo', e);
            }
            }>
                <label>
                    <input type='text' name='videoUrl' placeholder='ссылка на видео'/>
                </label>

                <label>
                    <input type='text' name='nameVideo' placeholder='название видео'/>
                </label>

                <label>
                    <select defaultValue='DEFAULT' name='typeVideo'>
                        <option value='DEFAULT' disabled>видео из youtube shorts?</option>
                        <option value='full'>full</option>
                        <option value='shorts'>shorts</option>
                    </select>
                </label>

                <select required defaultValue='Default' name='danceStyle'>
                    <option value='Default' disabled>стиль танца</option>
                    <option value='Dance'>Dance</option>
                    <option value='Hip-Hop'>Hip-Hop</option>
                    <option value='Dance-Hall'>Dance-Hall</option>
                    <option value='Jazz-Funk'>Jazz-Funk</option>
                    <option value='Reggaeton'>Reggaeton</option>
                    <option value='Twerk'>Twerk</option>
                </select>

                <button>сохранить</button>
            </form>
        </div>
    )
}