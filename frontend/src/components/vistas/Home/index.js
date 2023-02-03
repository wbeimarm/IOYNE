import Base from '../../layout/Base/normal';
import Products from '../Products'
import { useSelector } from "react-redux";

export default function Home() {
    let products = useSelector((state) => state.ui.products); 
  
    return (
        <Base>
            <Products products={products} />
        </Base>
    )
}