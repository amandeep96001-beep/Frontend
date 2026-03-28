import styles from './AddProducts.module.css';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import {PlusIcon} from "../../../asset/icons";


const AddProduct = () => (
  <div className={styles.container}>
    <div className={styles.topBar}>
      <div className={styles.title}>Add New Product</div>
      <div className={styles.actions}>
        <SearchBox
          variant="compact"
          placeholder="Search product for add"
          className={styles.searchCompact}
        />
        <Button label="Publish Product" variant="primary" onClick={() => {}}  />
        <Button label="Save to draft" variant="ghost" onClick={() => {}}/>
        <Button label="" icon={<PlusIcon />} variant="ghost" onClick={() => {}}  aria-label="Add" />
      </div>
    </div>
  </div>
);

export default AddProduct;
