import {TitelBanerVideoSection} from "../../components/TitelBanerVideoSection";
import {PopularDestinationsSection} from "../../components/PopularDestinationsSection";
import {Outlet} from "react-router";

export const HomePage = () => {
    return (
        <>
            <section>
                <TitelBanerVideoSection/>
                <PopularDestinationsSection/>
            </section>
        </>
    )
}