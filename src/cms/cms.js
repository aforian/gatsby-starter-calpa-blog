import CMS from 'netlify-cms-app';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/extensions, import/no-unresolved
import styles from '!css-loader!sass-loader!./style.scss';

CMS.registerPreviewStyle(styles.toString(), { raw: true });
