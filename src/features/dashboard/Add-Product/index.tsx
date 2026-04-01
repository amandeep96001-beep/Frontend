import { useCallback, useMemo, useState } from 'react';
import styles from './AddProducts.module.css';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import { PlusIcon } from '../../../asset/icons';
import BasicDetail from './BasicDetail/BasicDetail';
import ProductMedia from './ProductMedia/ProductMedia';
import { BasicDetailFormState, ProductMediaState } from './types';
import { useCreateProductMutation } from '../../../redux/product.api';
import { useNotification } from '../../../providers/NotificationProvider';
import { CreateProductPayload } from './types';

type SubmissionMode = 'publish' | 'draft';

const createInitialBasicDetail = (): BasicDetailFormState => ({
  title: '',
  description: '',
  brand: '',
  sku: '',
  type: '',
  basePrice: '',
  discountPrice: '',
  taxIncluded: 'yes',
  tax: '',
  stockQuantity: '',
  stockStatus: 'in-stock',
  isUnlimited: false,
  startDate: '',
  endDate: '',
  weight: '',
  dimensions: {
    length: '',
    width: '',
    height: '',
  },
  isFeatured: false,
});

const createInitialMediaDetail = (): ProductMediaState => ({
  images: [],
  categoryId: '',
  tag: '',
  selectedColor: '#c8dfbe',
});

const AddProduct = () => {
  const [basicDetail, setBasicDetail] = useState<BasicDetailFormState>(() => createInitialBasicDetail());
  const [mediaDetail, setMediaDetail] = useState<ProductMediaState>(() => createInitialMediaDetail());
  const [isUploading, setIsUploading] = useState(false);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { showNotification } = useNotification();

  const canPublish = useMemo(() => {
    const hasRequiredBasicFields =
      basicDetail.title.trim() &&
      basicDetail.description.trim() &&
      basicDetail.brand.trim() &&
      basicDetail.sku.trim() &&
      basicDetail.type.trim() &&
      basicDetail.basePrice.trim();
    const hasRequiredMediaFields = mediaDetail.categoryId.trim() && mediaDetail.images.length > 0;
    return Boolean(hasRequiredBasicFields && hasRequiredMediaFields && !isUploading);
  }, [basicDetail, mediaDetail, isUploading]);

  const numberOrUndefined = useCallback((value: string) => {
    const trimmed = value.trim();
    if (trimmed === '') return undefined;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : undefined;
  }, []);

  const buildPayload = useCallback(
    (mode: SubmissionMode): CreateProductPayload => {
      const categoryId = mediaDetail.categoryId.trim();
      const payload: CreateProductPayload = {
        title: basicDetail.title.trim(),
        description: basicDetail.description.trim(),
        brand: basicDetail.brand.trim(),
        categoryId,
        basePrice: Number(basicDetail.basePrice.trim()) || 0,
        sku: basicDetail.sku.trim(),
        type: basicDetail.type.trim(),
        dimensions: {
          length: numberOrUndefined(basicDetail.dimensions.length),
          width: numberOrUndefined(basicDetail.dimensions.width),
          height: numberOrUndefined(basicDetail.dimensions.height),
        },
        isActive: mode === 'publish',
        image: mediaDetail.images,
        tax: basicDetail.taxIncluded === 'yes' ? Number(basicDetail.tax || 0) : 0,
      };

      const discountPrice = numberOrUndefined(basicDetail.discountPrice);
      if (discountPrice !== undefined) {
        payload.discountPrice = discountPrice;
      }

      const weight = numberOrUndefined(basicDetail.weight);
      if (weight !== undefined) {
        payload.weight = weight;
      }

      if (mediaDetail.tag) {
        payload.tag = mediaDetail.tag;
      }

      if (mediaDetail.selectedColor) {
        payload.color = mediaDetail.selectedColor;
      }

      if (basicDetail.isFeatured) {
        payload.isFeatured = true;
      }

      return payload;
    },
    [basicDetail, mediaDetail, numberOrUndefined]
  );

  const resetForm = useCallback(() => {
    setBasicDetail(createInitialBasicDetail());
    setMediaDetail(createInitialMediaDetail());
  }, []);

  const deriveErrorMessage = useCallback((error: unknown) => {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = (error as { data?: { message?: string; error?: string } }).data;
      return data?.message || data?.error || 'Unable to save product.';
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unable to save product.';
  }, []);

  const handleSubmit = useCallback(
    async (mode: SubmissionMode) => {
      if (isUploading) {
        showNotification({ message: 'Please wait for the image upload to finish.', type: 'info' });
        return;
      }

      if (!canPublish) {
        showNotification({ message: 'Please fill all required fields and upload an image.', type: 'warning' });
        return;
      }

      try {
        const payload = buildPayload(mode);
        await createProduct(payload).unwrap();
        showNotification({
          message: mode === 'publish' ? 'Product published successfully.' : 'Product saved as draft.',
          type: 'success',
        });
        resetForm();
      } catch (error) {
        showNotification({ message: deriveErrorMessage(error), type: 'error' });
      }
    },
    [buildPayload, canPublish, createProduct, deriveErrorMessage, isUploading, resetForm, showNotification]
  );

  const handleBasicDetailChange = useCallback((next: BasicDetailFormState) => {
    setBasicDetail(next);
  }, []);

  const handleMediaDetailChange = useCallback((next: ProductMediaState) => {
    setMediaDetail(next);
  }, []);

  const handleUploadStateChange = useCallback((status: boolean) => {
    setIsUploading(status);
  }, []);

  const handlePublish = useCallback(() => {
    void handleSubmit('publish');
  }, [handleSubmit]);

  const handleDraft = useCallback(() => {
    void handleSubmit('draft');
  }, [handleSubmit]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.title}>Add New Product</div>
          <div className={styles.actions}>
            <SearchBox
              variant="compact"
              placeholder="Search product for add"
              className={styles.searchCompact}
            />
            <Button
              label="Publish Product"
              variant="primary"
              onClick={handlePublish}
              loading={isLoading}
              disabled={!canPublish || isLoading}
            />
            <Button
              label="Save to draft"
              variant="ghost"
              onClick={handleDraft}
              disabled={isLoading || isUploading}
            />
            <Button label="" icon={<PlusIcon />} variant="ghost" onClick={() => {}} aria-label="Add" />
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <BasicDetail
            value={basicDetail}
            onChange={handleBasicDetailChange}
            onPublish={handlePublish}
            onSaveDraft={handleDraft}
            canPublish={canPublish}
            isSubmitting={isLoading}
          />
        </div>
        <div className={styles.rightContainer}>
          <ProductMedia
            value={mediaDetail}
            onChange={handleMediaDetailChange}
            isUploading={isUploading}
            onUploadStateChange={handleUploadStateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
