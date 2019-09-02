import ComponentRegistration from '../componentRegistration';
import styles from '../styles';

export default function startup() {
  ComponentRegistration.register(styles);
}
