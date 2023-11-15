import videoBanner from "../../image/image/video/Pv5iIHyQCaEGDfEkDod2_video.mp4";
import styler from './TitelBanerVideoSection.module.css';

export const TitelBanerVideoSection = () => {
    return (
        <section className={styler.generalSection}>
            <div>
                <video className={styler.thumbVideo} playsInline autoPlay muted loop>
                    <source src={videoBanner}
                            type="video/mp4"
                    />
                </video>
            </div>
        </section>
    )
}