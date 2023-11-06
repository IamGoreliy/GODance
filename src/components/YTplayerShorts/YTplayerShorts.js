export const YTplayerShorts = ({url}) => {
    return (
            <iframe width="" height="360"
                    src={url}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
            </iframe>
    )
}