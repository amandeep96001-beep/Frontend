import { ChangeEvent, useId } from 'react';
import MainCard from '../../../../components/Main-Card/MainCard';
import InputField from '../../../../components/Form/InputField';
import RadioButton from '../../../../components/Form/RadioButton';
import DatePicker from '../../../../components/Form/DatePicker';
import SwitchButton from '../../../../components/SwitchButton/SwitchButton';
import styles from './BasicDetail.module.css';
import Button from '../../../../components/Button/Button';
import { IBasicDetailProps } from './interface';
import { BasicDetailFormState } from '../types';

const BasicDetail: React.FC<IBasicDetailProps> = ({
    value,
    onChange,
    onPublish,
    onSaveDraft,
    canPublish,
    isSubmitting,
}) => {
    const taxIncludedName = useId();

    const setField = <K extends keyof BasicDetailFormState>(
        field: K,
        nextValue: BasicDetailFormState[K]
    ) => {
        onChange({
            ...value,
            [field]: nextValue,
        });
    };

    const handleInputChange = <K extends keyof BasicDetailFormState>(field: K) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setField(field, event.target.value as BasicDetailFormState[K]);
    };

    const handleDimensionChange = (
        dimensionKey: keyof BasicDetailFormState['dimensions']
    ) => (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange({
            ...value,
            dimensions: {
                ...value.dimensions,
                [dimensionKey]: event.target.value,
            },
        });
    };

    return (
        <MainCard>
            <div className={styles.basicDetailContainer}>
                <h2 className={styles.basicDetailTitle}>Basic Detail</h2>
                <div>
                    <InputField
                        label="Product Name"
                        placeholder="Enter product name"
                        value={value.title}
                        onChange={handleInputChange('title')}
                    />
                    <InputField
                        label="Product Description"
                        placeholder="Enter product description"
                        multiline
                        rows={6}
                        value={value.description}
                        onChange={handleInputChange('description')}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Brand"
                        placeholder="Enter brand"
                        value={value.brand}
                        onChange={handleInputChange('brand')}
                    />
                    <InputField
                        label="SKU"
                        placeholder="Stock keeping unit"
                        value={value.sku}
                        onChange={handleInputChange('sku')}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Product Type"
                        placeholder="e.g. Electronics"
                        value={value.type}
                        onChange={handleInputChange('type')}
                    />
                    <InputField
                        label="Weight (kg)"
                        placeholder="0.0"
                        type="number"
                        value={value.weight}
                        onChange={handleInputChange('weight')}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Length (cm)"
                        placeholder="0"
                        type="number"
                        value={value.dimensions.length}
                        onChange={handleDimensionChange('length')}
                    />
                    <InputField
                        label="Width (cm)"
                        placeholder="0"
                        type="number"
                        value={value.dimensions.width}
                        onChange={handleDimensionChange('width')}
                    />
                    <InputField
                        label="Height (cm)"
                        placeholder="0"
                        type="number"
                        value={value.dimensions.height}
                        onChange={handleDimensionChange('height')}
                    />
                </div>
            </div>

            <div>
                <h4 className={styles.basicDetailTitle}>Pricing</h4>
                <InputField
                    label="Product Price"
                    placeholder="$999.89"
                    value={value.basePrice}
                    onChange={handleInputChange('basePrice')}
                    type="number"
                />
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Discounted Price (Optional)"
                        placeholder="$99"
                        value={value.discountPrice}
                        onChange={handleInputChange('discountPrice')}
                        type="number"
                        variant="discount"
                    />

                    <InputField
                        label="Tax Amount (%)"
                        placeholder="0"
                        type="number"
                        value={value.tax}
                        onChange={handleInputChange('tax')}
                    />
                </div>
            </div>

            <div>
                <div>
                    <h4 className={styles.inputLabel}>Expiration</h4>
                    <div className={styles.inputWrapper}>
                        <DatePicker placeholder="Start" value={value.startDate} onChange={(val) => setField('startDate', val)} />
                        <DatePicker placeholder="End" value={value.endDate} onChange={(val) => setField('endDate', val)} />
                    </div>
                </div>
            </div>

            <div className={styles.inventorySection}>
                <h3 className={styles.inputLabel}>Inventory</h3>
                <div className={styles.inputWrapper}>
                    <InputField
                        label="Stock Quantity"
                        placeholder="Unlimited"
                        value={value.stockQuantity}
                        onChange={handleInputChange('stockQuantity')}
                        type="number"
                    />
                    <InputField
                        label="Stock Status"
                        placeholder="In Stock"
                        value={value.stockStatus}
                        onChange={handleInputChange('stockStatus')}
                        variant="dropdown"
                        dropdownOptions={[
                            { label: 'In Stock', value: 'in-stock' },
                            { label: 'Out of Stock', value: 'out-of-stock' },
                        ]}
                    />
                </div>
                <div>
                    <SwitchButton isChecked={value.isUnlimited} onChange={(checked) => setField('isUnlimited', checked)} />
                    <label>Unlimited</label>
                </div>
                <div className={`${styles.formGroup} ${styles.featuredGroup}`}>
                    <input
                        type="checkbox"
                        id="featured"
                        checked={value.isFeatured}
                        onChange={(event) => setField('isFeatured', event.target.checked)}
                    />
                    <label htmlFor="featured">Highlight this product in a featured section.</label>
                </div>
            </div>

            <div className={styles.actions}>
                <Button label="Save to draft" variant="ghost" onClick={onSaveDraft} disabled={isSubmitting} />
                <Button
                    label="Publish Product"
                    variant="primary"
                    onClick={onPublish}
                    loading={isSubmitting}
                    disabled={!canPublish || isSubmitting}
                />
            </div>
        </MainCard>
    );
};

export default BasicDetail;