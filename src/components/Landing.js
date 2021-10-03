import React, { useState} from "react";
import shops from '../shops.js';


const Landing = (props) => {

    const [display, changeDisplay] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');



    const displayList = () => {
        
        changeDisplay(!display)
    }

    const getTitle = (shop) => {
        const { title, url } = shop;
        setTitle(title);
        setUrl(url);
        changeDisplay(false);
    }

    const goToShop = () => {
        props.history.push(`/shop/${url}`)
    }

    return (

        <div className='shop-select'>
            <div onClick={displayList} className='shop-select__top'>
                <div  className='shop-select__top-title'>
                    {title ? title : 'Change shop'}
                    </div>
                <div className='arrow'>
                    
                    <div className='arrow__up'>˄</div>
                    <div className='arrow__down'>˅</div>
                </div>
            </div>
            {display ?<div className='shop-select__list-wrapper'>
                <ul>
                    {
                        shops.map(shop => {
                            return <li onClick={() => getTitle(shop)} key={shop.id}>{shop.title}</li>
                        }
                        )
                    }
                </ul>
            </div> : null}
            {title && !display ? <button onClick={goToShop}  className='shop-select__button'>Select shop</button> : null}
        </div>
    )
}


export default Landing;