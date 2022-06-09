import { useEffect,useState } from "react"
import axios from 'axios'
const useFetchTech=()=>{

    const [techs,setTechs]=useState([]);
    
    useEffect(()=>{
        ( async ()=>{
            try{
                let response=await axios.get('/techs')
                setTechs(response.data.technology);
            }catch(err){

            }
        })()       
    },[])

    return techs
}
export default useFetchTech