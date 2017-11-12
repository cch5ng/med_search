import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div style={{ background: `#FFF url(${bg}) center` }} className={styles.footer}>
      <p>2017 &middot; Your Company</p>
      <p><a href="https://github.com/cch5ng" target="_blank">github &middot; @cch5ng</a></p>
    </div>
  );
}

export default Footer;
