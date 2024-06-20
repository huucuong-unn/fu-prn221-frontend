import classNames from 'classnames/bind';
import styles from '~/components/Layouts/DefaultLayout/DefaultLayout.module.scss';
// import AppAppBar from '~/components/AppAppBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('page-container')}>
            <div className={cx('content-container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
