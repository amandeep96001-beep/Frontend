import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import MainCard from '../../../../components/Main-Card/MainCard';
import InputField from '../../../../components/Form/InputField';
import Button from '../../../../components/Button/Button';
import styles from './ProductMedia.module.css';

const ProductMedia = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previousImagesRef = useRef<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<string>('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [selectedColor, setSelectedColor] = useState('#c8dfbe');

  const isObjectUrl = (url: string) => url.startsWith('blob:');

  useEffect(() => {
    const removedImages = previousImagesRef.current.filter(
      (url) => isObjectUrl(url) && !images.includes(url)
    );

    removedImages.forEach((url) => URL.revokeObjectURL(url));
    previousImagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      previousImagesRef.current.forEach((url) => {
        if (isObjectUrl(url)) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const colors = useMemo(
    () => ['#c8dfbe', '#e2cbd0', '#dce2e6', '#ece4c6', '#5f6368'],
    []
  );

  const handleFilePick = (event: ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files || []);
    if (!pickedFiles.length) return;

    const nextImages = pickedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...nextImages, ...prev]);
    setActiveImage(nextImages[0]);
    event.target.value = '';
  };

  const handleRemoveActiveImage = () => {
    if (!activeImage) return;

    setImages((prev) => {
      const next = prev.filter((image) => image !== activeImage);
      setActiveImage(next[0] || '');
      return next;
    });
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
                label="Browse"
                onClick={() => inputRef.current?.click()}
              />
              {activeImage ? (
                <Button
                  className={styles.smallButton}
                  type="button"
                  variant="ghost"
                  label="Remove"
                  onClick={handleRemoveActiveImage}
                />
              ) : (
                <Button
                  className={styles.smallButton}
                  type="button"
                  variant="ghost"
                  label="Add"
                  onClick={() => inputRef.current?.click()}
                />
              )}
            </div>
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
            {images.map((image) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnail} ${activeImage === image ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <img src={image} alt="Product thumbnail" />
              </button>
            ))}

            <button type="button" className={styles.addImage} onClick={() => inputRef.current?.click()}>
              <span className={styles.addIcon}>+</span>
              <span>Add Image</span>
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.headingSmall}>Categories</h4>

          <InputField
            label="Product Categories"
            placeholder="Select your product"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="dropdown"
            dropdownOptions={[
              { label: 'Phone', value: 'phone' },
              { label: 'Laptop', value: 'laptop' },
              { label: 'Accessories', value: 'accessories' },
            ]}
          />

          <InputField
            label="Product Tag"
            placeholder="Select your product"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
                className={`${styles.colorSwatchButton} ${styles.colorSwatch} ${selectedColor === color ? styles.colorActive : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
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