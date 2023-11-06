import videoBanner from "../image/image/video/Pv5iIHyQCaEGDfEkDod2_video.mp4";

export const TitelBanerVideoSection = () => {
    return (
        <section>
            <div>
                <video style={{width: '400px', height: '400px'}} playsInline autoPlay muted loop>
                    <source src={videoBanner}
                            type="video/mp4"
                    />
                </video>
            </div>
        </section>
    )
}