import React from 'react';
import styles from './offerBanner.module.scss'
import Subtitle from "../UI/Subtitle/Subtitle";
import Title from "../UI/Title/Title";

const OfferBannerCard2 = () => {
    return (
        <div className={[styles.card, styles.card2].join(' ')}>
            <Subtitle className={'subtitle'}>Offer!!</Subtitle>
            <Title className={'title'}>Get 10% off<br/> on Vegetables</Title>
        </div>
    );
};

export default OfferBannerCard2;