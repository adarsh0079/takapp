import { useEffect, useState } from "react"
import axios from 'axios'
const useFetchTech = () => {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                var response
                if (process.env.REACT_APP_NODE_ENV == "prod") {
                    response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/techs`)
                } else {
                    response = await axios.get('/techs')

                }
                setTechs(response.data.technology);
            } catch (err) {

            }
        })()
    }, [])

    return techs
}
export default useFetchTech