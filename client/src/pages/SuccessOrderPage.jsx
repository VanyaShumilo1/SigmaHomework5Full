import React from 'react';
import Title from "../components/UI/Title/Title";
import image from '../img/successOrder/img.png'
import styles from '../styles/successOrder.module.scss'

const SuccessOrderPage = () => {
    return (
        <div className={styles.successOrder}>
            <Title className={styles.successOrder__title}>Thank you for your order</Title>
            <img src={image} alt="img"/>
        </div>
    );
};

export default SuccessOrderPage;