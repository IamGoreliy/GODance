import {NavLink} from "react-router-dom";

export const PopularDestinationsSection = () => {
    return (
        <section>
            <div>
                <h2>Популярные направлени</h2>
                <ul>
                    <li>
                        <NavLink to='/hip-hop'
                        >
                            <h3>Hip-Hop</h3>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/dance-hall'>
                            <h3>Dance-hall</h3>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/high-heel'>
                            <h3>High-Heels</h3>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/reggaeton'>
                            <h3>Reggaeton</h3>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/jazz-funk'>
                            <h3>Jazz-Funk</h3>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to='/twerk'>
                            <h3>Twerk</h3>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </section>
    )
}