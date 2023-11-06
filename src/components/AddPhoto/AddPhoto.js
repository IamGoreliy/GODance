import {uploadPhotoAndVideoFn} from "../utils/uploadPhotoAndVideoFn";
import {useContext} from "react";
import {UpdatePageContext} from "../pages/BasisPage/HeaderNavButtonPages/Gallery/Gallery";
import {toast} from "react-toastify";

export const AddPhoto = ({statusUpload: setResulUpload}) => {
    const setIsUpdateFile = useContext(UpdatePageContext);
    const fnAddPhoto = async (url, e) => {
        const form = e.target;
        const formData = new FormData (form);
        formData.append('jwt', window.sessionStorage.getItem('jwt'));
        const response = await uploadPhotoAndVideoFn(url, formData);
        if (response === 'фото было добавлено') {
            toast.success(response);
            setIsUpdateFile(true);
        } else {
            toast.error(response);
        }
        form.reset();
    }
    return (
       <div style={{width: '300px', height: '300px'}}>
           <h2>+ добавить фото</h2>
           <form onSubmit={ async (e) => {
                e.preventDefault();
                // const form = e.target;
                // const formData = new FormData (form);
                // formData.append('jwt', window.sessionStorage.getItem('jwt'))
                // const response = await uploadPhotoAndVideoFn('http://localhost:3001/addPhotoTest', formData);
                // console.log(response);
                // setResulUpload(response);
                // form.reset();
               await fnAddPhoto('http://localhost:3001/addPhoto', e);
           }
           }
           >
               <label>
                   <input type='file' name='photo'/>
               </label>
               <label>
                    <input type='text' name='nameImg' placeholder='укажите имя картинки'/>
               </label>
               <button>сохранить</button>
           </form>
       </div>
   )
}