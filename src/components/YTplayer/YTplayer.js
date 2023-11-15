import styler from '../../pages/dancingPage/StyleDancePage/StyleDancePage.module.css'
export const YTplayer = ({url}) => {
    return (
            <iframe className={styler.iframeFull}
                    src={url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
            >
            </iframe>
    )
}