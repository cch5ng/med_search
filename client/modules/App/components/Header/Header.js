import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  // const languageNodes = props.intl.enabledLanguages.map(
  //   lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  // );

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link className={styles.headerLink} to="/" >Med Search</Link>
        </h1>
        <Link className={styles.headerLink} to="/" className={styles['add-post-button']}>New Search</Link>
      </div>
    </div>
  );
}


Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  //toggleAddPost: PropTypes.func.isRequired,
  //switchLanguage: PropTypes.func.isRequired,
  //intl: PropTypes.object.isRequired,
};

export default Header;

/*
        {
          context.router.isActive('/', true)
            ? 
         : null
        <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}></a>
      // <div className={styles['language-switcher']}>
      //   <ul>
      //     <li><FormattedMessage id="switchLanguage" /></li>
      //     {languageNodes}
      //   </ul>
      // </div>


*/