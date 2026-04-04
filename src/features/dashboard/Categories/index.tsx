import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Categories.module.css';
import MainCard from '../../../components/Main-Card/MainCard';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/Form/InputField';
import { PlusIcon } from '../../../asset/icons';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../redux/product.api';
import { useNotification } from '../../../providers/NotificationProvider';
import { uploadToCloudinary } from '../../../utils/cloudinary';
import { deriveCategoryErrorMessage } from '../Add-Product/ProductMedia/utils';

type CategoryFormState = {
  name: string;
  description: string;
  imageFile: File | null;
};

const createInitialForm = (): CategoryFormState => ({
  name: '',
  description: '',
  imageFile: null,
});

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formState, setFormState] = useState<CategoryFormState>(() => createInitialForm());
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useNotification();
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    isError: isCategoriesError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

  const isBusy = isUploading || isCreating;

  useEffect(() => {
    if (!isCategoriesError) return;
    showNotification({ message: deriveCategoryErrorMessage(categoriesError), type: 'error' });
  }, [categoriesError, isCategoriesError, showNotification]);

  useEffect(() => {
    if (!formState.imageFile) {
      setImagePreview('');
      return;
    }
    const previewUrl = URL.createObjectURL(formState.imageFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [formState.imageFile]);

  const filteredCategories = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((category) => {
      const nameMatch = category.name.toLowerCase().includes(term);
      const descriptionMatch = category.description?.toLowerCase().includes(term) ?? false;
      return nameMatch || descriptionMatch;
    });
  }, [categories, searchTerm]);

  const resetForm = useCallback(() => {
    setFormState(createInitialForm());
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    if (isBusy) return;
    setIsDrawerOpen(false);
    resetForm();
  }, [isBusy, resetForm]);

  const handleInputChange = useCallback(
    (field: 'name' | 'description') => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    },
    []
  );

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormState((prev) => ({ ...prev, imageFile: file }));
  }, []);

  const deriveCreateErrorMessage = useCallback((error: unknown) => {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = (error as { data?: { message?: string; error?: string } }).data;
      return data?.message || data?.error || 'Unable to create category.';
    }
    if (error instanceof Error) return error.message;
    return 'Unable to create category.';
  }, []);

  const handleSubmit = useCallback(async () => {
    const trimmedName = formState.name.trim();
    const trimmedDescription = formState.description.trim();

    if (!trimmedName || !trimmedDescription || !formState.imageFile) {
      showNotification({ message: 'Please add a name, description, and image.', type: 'warning' });
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await uploadToCloudinary(formState.imageFile);
      await createCategory({
        name: trimmedName,
        description: trimmedDescription,
        image: uploadResult.secure_url,
      }).unwrap();
      showNotification({ message: 'Category created successfully.', type: 'success' });
      resetForm();
      setIsDrawerOpen(false);
      refetchCategories();
    } catch (error) {
      showNotification({ message: deriveCreateErrorMessage(error), type: 'error' });
    } finally {
      setIsUploading(false);
    }
  }, [createCategory, deriveCreateErrorMessage, formState, refetchCategories, resetForm, showNotification]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <h2 className={styles.pageTitle}>Categories</h2>
          <p className={styles.pageSubtitle}>Discover</p>
        </div>
        <div className={styles.actions}>
          <SearchBox
            variant="compact"
            placeholder="Search categories"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={styles.searchCompact}
          />
          <Button
            label="Add Category"
            variant="primary"
            icon={<PlusIcon />}
            onClick={openDrawer}
          />
          <Button label="More Action" variant="ghost" onClick={() => {}} />
        </div>
      </div>

      <MainCard>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Categories</h3>
          <span className={styles.sectionCount}>{categories.length} total</span>
        </div>
        {isCategoriesLoading || isCategoriesFetching ? (
          <div className={styles.emptyState}>Loading categories...</div>
        ) : filteredCategories.length ? (
          <div className={styles.categoryGrid}>
            {filteredCategories.map((category) => (
              <div key={category._id} className={styles.categoryCard}>
                <div className={styles.categoryThumb}>
                  {category.image ? (
                    <img src={category.image} alt={category.name} />
                  ) : (
                    <span className={styles.categoryFallback}>
                      {category.name.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>{category.name}</div>
                  <div className={styles.categoryDescription}>
                    {category.description || 'No description yet.'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No categories found.</div>
        )}
      </MainCard>

      <MainCard>
        <div className={styles.productHeader}>
          <div className={styles.tabs}>
            <button type="button" className={`${styles.tab} ${styles.tabActive}`}>
              All Products <span className={styles.tabCount}>(0)</span>
            </button>
            <button type="button" className={styles.tab}>Featured Products</button>
            <button type="button" className={styles.tab}>On Sale</button>
            <button type="button" className={styles.tab}>Out of Stock</button>
          </div>
          <div className={styles.productActions}>
            <SearchBox variant="compact" placeholder="Search your product" className={styles.productSearch} />
            <button type="button" className={styles.iconButton} aria-label="Filters">≡</button>
            <button type="button" className={styles.iconButton} aria-label="Settings">⋯</button>
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div>No.</div>
            <div>Product</div>
            <div>Created Date</div>
            <div>Order</div>
            <div>Action</div>
          </div>
          <div className={styles.tableEmpty}>No products available yet.</div>
        </div>
      </MainCard>

      <div
        className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.drawerOverlayOpen : ''}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        aria-hidden={!isDrawerOpen}
      >
        <aside className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`} role="dialog" aria-modal="true">
          <div className={styles.drawerHeader}>
            <div>
              <h3 className={styles.drawerTitle}>Add Category</h3>
              <p className={styles.drawerSubtitle}>Upload an image and add details.</p>
            </div>
            <button type="button" className={styles.drawerClose} onClick={closeDrawer} aria-label="Close drawer">
              ×
            </button>
          </div>

          <div className={styles.drawerBody}>
            <InputField
              label="Category Name"
              placeholder="Enter category name"
              value={formState.name}
              onChange={handleInputChange('name')}
            />
            <InputField
              label="Description"
              placeholder="Enter category description"
              value={formState.description}
              onChange={handleInputChange('description')}
              multiline
              rows={4}
            />

            <div className={styles.uploadCard}>
              <div className={styles.uploadPreview}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Category preview" />
                ) : (
                  <span className={styles.uploadPlaceholder}>Upload category image</span>
                )}
              </div>
              <div className={styles.uploadActions}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  aria-label="Upload category image"
                />
                <Button
                  label={formState.imageFile ? 'Change Image' : 'Choose Image'}
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                />
                {formState.imageFile && (
                  <span className={styles.fileName}>{formState.imageFile.name}</span>
                )}
              </div>
              {isUploading && <div className={styles.statusText}>Uploading image...</div>}
            </div>
          </div>

          <div className={styles.drawerFooter}>
            <Button label="Cancel" variant="ghost" onClick={closeDrawer} disabled={isBusy} />
            <Button
              label={isCreating ? 'Saving...' : 'Save Category'}
              variant="primary"
              onClick={handleSubmit}
              loading={isCreating}
              disabled={isBusy}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Categories;