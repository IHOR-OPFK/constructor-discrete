import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFound}>
    <h1>ВИ ЗАБЛУКАЛИ!</h1>
    <img
      src="./img/page-not-found.png"
      alt="page not found"
      className={styles.notFound__image}
    />
  </div>
);
