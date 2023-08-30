import React, {useState} from 'react';
import styles from './search.module.scss';
import searchIcon from '../../../img/common/search.svg'
const Search = ({...props}) => {


    return (
        <div className={styles.search}>
            <input
                type="text"
                {...props}
            />
            <button className={styles.search__button}>
                <img src={searchIcon} alt="search"/>
            </button>
        </div>
    );
};

export default Search;