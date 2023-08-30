import React, {useContext, useEffect, useState} from 'react';
import styles from "./overlay.module.scss";
import buttonStyles from '../UI/Button/button.module.scss';
import Container from "../Container/Container";
import {capitalize} from "../../utils/capitalize";
import Title from "../UI/Title/Title";
import stars from '../../img/common/stars.svg'
import ProductPrice from "../UI/ProductPrice/ProductPrice";
import NumberInput from "../UI/NumberInput/NumberInput";
import Button from "../UI/Button/Button";
import {Context} from "../../context";
import CloseButton from "../UI/CloseButton/CloseButton";
import backendUrl from "../../utils/backendUrl";

const Overlay = ({product, isOverlayActive, setIsOverlayActive, ...props}) => {

    const handleCloseOverlay = (event) => {
        if (event.target.id === 'overlay' || event.target.id === 'closeBtn') {
            setIsOverlayActive(false)
        }
    }

    const [showDescription, setShowDescription] = useState(true)

    const {cartItems, setCartItems} = useContext(Context)
    const [quantity, setQuantity] = useState(1)

    const [isItemInCart, setIsItemInCart] = useState(false)

    useEffect(() => {
        cartItems.forEach(item => {
            if (item.product._id === product._id) {
                setIsItemInCart(true)
                setQuantity(item.quantity)
            }
        })
    }, [])

    const addToCart = () => {
        setCartItems([...cartItems, {
            product: product,
            quantity: quantity,
        }])
        setIsItemInCart(true)
    }

    return (
        <div id='overlay' {...props} className={[styles.overlay, isOverlayActive && styles.showOverlay].join(' ')}
             onClick={(event) => handleCloseOverlay(event)}>
            <div className={styles.modal}>
                <Container>
                    <div className={styles.modal__wrapper}>
                        <CloseButton id='closeBtn'
                                     onClick={(event) => handleCloseOverlay(event)}
                                     className={styles.modal__closeBtn}>X
                        </CloseButton>

                        <div className={styles.modal__img}>
                            <div className={styles.modal__type}>{capitalize(product?.type || "none")}</div>
                            <img src={`${backendUrl}/uploads/${product?.imageUrl}`} alt="product"/>
                        </div>
                        <div className={styles.modal__content}>
                            <Title className={styles.modal__title}>{product?.title}</Title>
                            <img className={styles.modal__stars} src={stars} alt="rating"/>
                            <ProductPrice className={styles.modal__price} product={product}/>
                            <div className={styles.modal__text}>
                                {product?.description}
                            </div>
                            <div className={styles.modal__quantity}>
                                <div className={styles.modal__quantity_text}>Quantity :</div>
                                <NumberInput value={quantity}
                                             onChange={(e) => setQuantity(e.target.value)}
                                />
                                <Button disabled={isItemInCart}
                                        onClick={() => addToCart()}
                                        className={[buttonStyles.button_blue, isItemInCart && buttonStyles.button_itemInCart].join(' ')}>
                                    {
                                        isItemInCart
                                            ? "Item in Cart"
                                            : "Add To Cart"
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modal__footer}>
                        <div className={styles.modal__footer_buttons}>
                            <Button onClick={() => setShowDescription(true)}
                                    className={showDescription ? buttonStyles.button_blue : buttonStyles.button_light}>Product
                                Description</Button>
                            <Button onClick={() => setShowDescription(false)}
                                    className={!showDescription ? buttonStyles.button_blue : buttonStyles.button_light}>Additional
                                Info</Button>
                        </div>
                        <div className={styles.modal__footer_text}>
                            {
                                showDescription
                                    ?
                                    "Welcome to the world of natural and organic. Here you can discover the bounty of nature. We have grown on the principles of health, ecology, and care. We aim to give our customers a healthy chemical-free meal for perfect nutrition. It offers about 8–10% carbs. Simple sugars — such as glucose and fructose — make up 70% and 80% of the carbs in raw."
                                    :
                                    "A refrigerator is the best place to store pistachios if you don't plan to eat them all right away. Package them in an airtight container (Ziplock, Tupperware, jar with tight lid) and they will stay fresh for up to a year. An airtight package helps prevent condensation, which would make them lose their crunch."
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Overlay;