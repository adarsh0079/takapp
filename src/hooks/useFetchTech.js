import { useEffect, useState } from "react"
import axios from 'axios'
const useFetchTech = () => {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                var response
                console.log(process.env.NODE_ENV, process.env.BACKEND_URL)
                if (process.env.NODE_ENV == "production") {
                    response = await axios.get(`https://takappbackend.herokuapp.com/techs`)
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