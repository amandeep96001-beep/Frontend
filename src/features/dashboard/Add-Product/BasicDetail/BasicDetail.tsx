import { useId, useState } from 'react';
import MainCard from "../../../../components/Main-Card/MainCard";
import InputField from "../../../../components/Form/InputField";
import styles from './BasicDetail.module.css';


const BasicDetail = () => {
    const [taxIncluded, setTaxIncluded] = useState('yes');
    const taxIncludedName = useId();

    return (
        <MainCard>
            <div className={styles.basicDetailContainer}>
                <h2 className={styles.basicDetailTitle}>Basic Detail</h2>
                <div>
                    <InputField label="Product Name" placeholder="Enter product name" />
                    <InputField label="Product Description" placeholder="Enter product description" multiline rows={6} />
                </div>
            </div>
            <div >
                <h4>Pricing</h4>
                <InputField label="Product Price" type="number" placeholder="Enter product price" />
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Discount Price"
                        variant="discount"
                        type="number"
                        placeholder="Enter discount price"
                    />
                    <div className={styles.inputContainer}>
                        <h4 className={styles.inputLabel}>Tax Included</h4>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name={taxIncludedName}
                                    value="yes"
                                    checked={taxIncluded === 'yes'}
                                    onChange={() => setTaxIncluded('yes')}
                                />
                                Yes
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name={taxIncludedName}
                                    value="no"
                                    checked={taxIncluded === 'no'}
                                    onChange={() => setTaxIncluded('no')}
                                />
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </MainCard>
    );
};

export default BasicDetail;