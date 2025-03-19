import styles from './styles.module.scss';
import { Divider } from "antd";

const Notification = ({ data }: any) => {
  return (
    <div className={styles.notifContainer}>
      <div className={styles.body}>
        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} />
        <div>
          <h4>{data?.title}</h4>
          <br />
          <p>{data?.body}</p>
        </div>
      </div>
      <Divider style={{ margin: '0'}} />
    </div>
  )
}

export default Notification;