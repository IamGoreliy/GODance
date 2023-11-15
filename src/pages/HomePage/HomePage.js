import {TitelBanerVideoSection} from "../../components/TitelBanerVideoSection/TitelBanerVideoSection";
import {PopularDestinationsSection} from "../../components/PopularDestinationsSection/PopularDestinationsSection";
import styler from './HomePage.module.css';
export const HomePage = () => {
    return (
        <>
            <section className={styler.generalSection}>
                <TitelBanerVideoSection/>
                <PopularDestinationsSection/>
            </section>
        </>
    )
}