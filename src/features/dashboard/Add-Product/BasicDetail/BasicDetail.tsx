
import MainCard from "../../../../components/Main-Card/MainCard";
import InputField from "../../../../components/Form/InputField";
import styles from './BasicDetail.module.css';


const BasicDetail: React.FC = () => {
    return (
        <MainCard>
            <div className={styles.basicDetailContainer}>
                <h2 className={styles.basicDetailTitle}>Basic Detail</h2>
                <div>
                  <InputField label="Product Name" placeholder="Enter product name" />
                  <InputField label="Product Description" placeholder="Enter product description" multiline rows={6} />
                </div>
            </div>
            <div>
                <h4>Pricing</h4>
                  <InputField label="Product Price" type="number" placeholder="Enter product price" />
            </div>

        </MainCard>
    );
};

export default BasicDetail;