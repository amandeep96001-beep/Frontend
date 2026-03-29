import  { useId, useState } from 'react';
import MainCard from "../../../../components/Main-Card/MainCard";
import InputField from "../../../../components/Form/InputField";
import RadioButton from "../../../../components/Form/RadioButton";
import DatePicker from "../../../../components/Form/DatePicker";
import SwitchButton from '../../../../components/SwitchButton/SwitchButton';
import styles from './BasicDetail.module.css';
import Button from '../../../../components/Button/Button';


const BasicDetail = () => {
    const [productPrice, setProductPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [taxIncluded, setTaxIncluded] = useState('yes');
    const [stockQuantity, setStockQuantity] = useState('');
    const [stockStatus, setStockStatus] = useState('in-stock');
    const [isUnlimited, setIsUnlimited] = useState(false);
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
                <h4 className={styles.basicDetailTitle}>Pricing</h4>
                <InputField
                    label="Product Price"
                    placeholder="$999.89"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    type="number"
                />
                <InputField
                    label="Discounted Price (Optional)"
                    placeholder="$99"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    type="number"
                    variant="discount"
                />
                <div className={styles.inputWrapper}>
                    <div className={styles.inputContainer}>
                        <h4 className={styles.inputLabel}>Tax Included</h4>
                        <RadioButton
                            name={taxIncludedName}
                            options={[
                                { label: "Yes", value: "yes" },
                                { label: "No", value: "no" },
                            ]}
                            selectedValue={taxIncluded}
                            onChange={setTaxIncluded}
                            direction="column"
                        />
                    </div>
                                
                </div>
            </div>

            <div>
                <div>
                    <h4 className={styles.inputLabel}>Expiration</h4>
                    <div className={styles.inputWrapper}>
                        <DatePicker placeholder="Start" />
                        <DatePicker placeholder="End" />
                    </div>  
                </div>
            </div>
            <div className={styles.inventorySection}>
                <h3 className={styles.inputLabel} >Inventory</h3>
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Stock Quantity"
                        placeholder="Unlimited"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        type="number"
                    />
                <div>
                    <InputField
                        label="Stock Status"
                        placeholder="In Stock"
                        value={stockStatus}
                        onChange={(e) => setStockStatus(e.target.value)}
                        variant="dropdown"
                        dropdownOptions={[
                            { label: 'In Stock', value: 'in-stock' },
                            { label: 'Out of Stock', value: 'out-of-stock' },
                        ]}
                    />
                </div>
                </div>
                <div >
                    <SwitchButton isChecked={isUnlimited} onChange={setIsUnlimited} />
                    <label>Unlimited</label>
                </div>
                <div className={`${styles.formGroup} ${styles.featuredGroup}`}>
                    <input type="checkbox" id="featured" />
                    <label htmlFor="featured">Highlight this product in a featured section.</label>
                </div>
            </div>
            <div className={styles.actions}>
                <Button label="Save to draft" variant="ghost" onClick={() => {}}/>
                <Button label="Publish Product" variant="primary" onClick={() => {}}  />
            </div>
        </MainCard>
    );
};

export default BasicDetail;