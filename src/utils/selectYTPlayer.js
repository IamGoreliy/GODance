import {YTplayer} from "../components/YTplayer/YTplayer";
import {YTplayerShorts} from "../components/YTplayerShorts/YTplayerShorts";

export const selectYTPlayer = (urlVideo) => {
    const isLiveVideo = urlVideo.includes('live');
    if (isLiveVideo) {
        const videoID = urlVideo.replace('https://www.youtube.com/live/', '');
        return <YTplayer url={`http://www.youtube.com/embed/${videoID}?autoplay=1`}/>;
    }

    const isShorts = urlVideo.includes('shorts');
    if (isShorts) {
        const videoID = urlVideo.replace('https://youtube.com/shorts/', '');
        return <YTplayerShorts url={`http://www.youtube.com/embed/${videoID}?autoplay=1`}/>;
    } else {
        const videoID = urlVideo.replace('https://youtu.be/', '');
        return <YTplayer url={`http://www.youtube.com/embed/${videoID}?autoplay=1`}/>;
    }
}