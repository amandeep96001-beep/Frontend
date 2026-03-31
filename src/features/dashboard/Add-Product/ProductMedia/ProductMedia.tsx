import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import MainCard from '../../../../components/Main-Card/MainCard';
import InputField from '../../../../components/Form/InputField';
import Button from '../../../../components/Button/Button';
import styles from './ProductMedia.module.css';
import { uploadToCloudinary } from '../../../../utils/cloudinary';
import { ProductMediaState } from '../types';
import { useNotification } from '../../../../providers/NotificationProvider';
import { useGetCategoriesQuery } from '../../../../redux/product.api';

const deriveCategoryErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    const payload = error as { data?: unknown; error?: string };
    if (typeof payload.error === 'string' && payload.error.trim()) {
      return payload.error;
    }

    if (payload.data) {
      if (typeof payload.data === 'string') {
        return payload.data;
      }

      if (typeof payload.data === 'object') {
        const data = payload.data as { message?: string; error?: string };
        if (data.message) {
          return data.message;
        }
        if (data.error) {
          return data.error;
        }
      }
    }
  }

  return 'Unable to load categories.';
};


interface ProductMediaProps {
  value: ProductMediaState;
  onChange: (next: ProductMediaState) => void;
  isUploading: boolean;
  onUploadStateChange: (status: boolean) => void;
}

const ProductMedia: React.FC<ProductMediaProps> = ({ value, onChange, isUploading, onUploadStateChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const { showNotification } = useNotification();
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (!isCategoriesError) {
      return;
    }
    showNotification({ message: deriveCategoryErrorMessage(categoriesError), type: 'error' });
  }, [isCategoriesError, categoriesError, showNotification]);

  useEffect(() => {
    if (!value.images.length) {
      setActiveImage('');
      return;
    }
    setActiveImage((current) => (value.images.includes(current) ? current : value.images[0]));
  }, [value.images]);

  const colors = useMemo(() => ['#c8dfbe', '#e2cbd0', '#dce2e6', '#ece4c6', '#5f6368'], []);
  const categoryOptions = useMemo(
    () => categories.map((category) => ({ label: category.name, value: category._id })),
    [categories]
  );
  const selectedCategory = useMemo(
    () => categories.find((category) => category._id === value.categoryId),
    [categories, value.categoryId]
  );
  const isCategoryLoadingState = isCategoriesLoading || isCategoriesFetching;
  const categoryPlaceholder = useMemo(() => {
    if (isCategoryLoadingState) {
      return 'Loading categories...';
    }
    if (!categories.length) {
      return isCategoriesError ? 'Unable to load categories' : 'No categories available';
    }
    return 'Select product category';
  }, [categories, isCategoriesError, isCategoryLoadingState]);
  const disableCategorySelect = isCategoryLoadingState || !categories.length;

  const handleFilePick = async (event: ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files || []);
    if (!pickedFiles.length) return;

    onUploadStateChange(true);
    try {
      const uploads = await Promise.all(pickedFiles.map((file) => uploadToCloudinary(file)));
      const urls = uploads.map((result) => result.secure_url);
      onChange({
        ...value,
        images: [...urls, ...value.images],
      });
      setActiveImage(urls[0]);
      showNotification({ message: 'Images uploaded successfully.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to upload image.';
      showNotification({ message, type: 'error' });
    } finally {
      onUploadStateChange(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleRemoveActiveImage = () => {
    if (!activeImage) return;
    const nextImages = value.images.filter((image) => image !== activeImage);
    onChange({
      ...value,
      images: nextImages,
    });
    setActiveImage(nextImages[0] || '');
  };

  return (
    <MainCard>
      <div className={styles.panel}>
        <h3 className={styles.heading}>Upload Product Image</h3>

        <div className={styles.section}>
          <p className={styles.label}>Product Image</p>

          <div className={styles.previewCard}>
            {activeImage ? (
              <img src={activeImage} alt="Selected product" className={styles.previewImage} />
            ) : (
              <div className={styles.emptyPreview}>No image selected</div>
            )}
            <div className={styles.previewActions}>
              <Button
                className={styles.smallButton}
                type="button"
                variant="ghost"
                label={isUploading ? 'Uploading...' : 'Browse'}
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
              />
              {activeImage ? (
                <Button
                  className={styles.smallButton}
                  type="button"
                  variant="ghost"
                  label="Remove"
                  onClick={handleRemoveActiveImage}
                  disabled={isUploading}
                />
              ) : (
                <Button
                  className={styles.smallButton}
                  type="button"
                  variant="ghost"
                  label="Add"
                  onClick={() => inputRef.current?.click()}
                  disabled={isUploading}
                />
              )}
            </div>
            {isUploading && (
              <p className={styles.uploadStatus} aria-live="polite">
                Uploading images to Cloudinary...
              </p>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFilePick}
          />

          <div className={styles.thumbnailRow}>
            {value.images.map((image) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnail} ${activeImage === image ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <img src={image} alt="Product thumbnail" />
              </button>
            ))}

            <button type="button" className={styles.addImage} onClick={() => inputRef.current?.click()} disabled={isUploading}>
              <span className={styles.addIcon}>+</span>
              <span>Add Image</span>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.headingSmall}>Categories</h4>

          <InputField
            label="Product Categories"
            placeholder={categoryPlaceholder}
            value={value.categoryId}
            onChange={(event) =>
              onChange({
                ...value,
                categoryId: (event.target as HTMLInputElement).value,
              })
            }
            variant="dropdown"
            dropdownOptions={categoryOptions}
            disabled={disableCategorySelect}
          />
    
          <InputField
            label="Product Tag"
            placeholder="Select your product"
            value={value.tag}
            onChange={(event) =>
              onChange({
                ...value,
                tag: (event.target as HTMLInputElement).value,
              })
            }
            variant="dropdown"
            dropdownOptions={[
              { label: 'New Arrival', value: 'new' },
              { label: 'Featured', value: 'featured' },
              { label: 'Best Seller', value: 'best-seller' },
            ]}
          />
        </div>

        <div className={styles.section}>
          <h4 className={styles.headingSmall}>Select your color</h4>
          <div className={styles.colorRow}>
            {colors.map((color) => (
              <Button
                key={color}
                type="button"
                variant="ghost"
                label=""
                className={`${styles.colorSwatchButton} ${styles.colorSwatch} ${value.selectedColor === color ? styles.colorActive : ''}`}
                style={{ backgroundColor: color }}
                onClick={() =>
                  onChange({
                    ...value,
                    selectedColor: color,
                  })
                }
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default ProductMedia;