import {Provider} from "react-redux";
import {store} from "./Redux/store";
import {BasisPage} from "./pages/BasisPage/BasisPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <Provider store={store}>
            <ToastContainer />
            <BasisPage/>
        </Provider>
    )
}
export default App;