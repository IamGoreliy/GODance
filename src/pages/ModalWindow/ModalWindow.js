import styler from './ModalWindow.module.css';
export const ModalWindow = ({fnOpenCloseModalWindow: {setIsOpenModalWindow, selectDate}, children}) => {
    return (
        <div className={styler.generalSection}>
            <div className={styler.modalWindowThumb}>
                <button onClick={() => setIsOpenModalWindow(false)}>close</button>
                {children}
            </div>
        </div>
    )
}