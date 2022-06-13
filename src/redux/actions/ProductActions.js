import {axios} from 'axios'
import { useDispatch } from 'react-redux'


export const ProductAction =async(Action)=>{
    const dispatch = useDispatch();

    switch (Action) {
        case "GetAllProduct":
            const {data} = await axios('/api/v1/products')
            console.log('Data getting from home route is',data);
            dispatch({
                type:"GetAllProducts",
                action:data,
            })
            
            break;
    
        default:
            break;
    }
    

}

