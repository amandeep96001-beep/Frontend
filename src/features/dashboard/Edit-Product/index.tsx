import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from '../Add-Product/AddProducts.module.css';
import SearchBox from '../../../components/SearchBox/SearchBox';
import Button from '../../../components/Button/Button';
import { PlusIcon } from '../../../asset/icons';
import BasicDetail from '../Add-Product/BasicDetail/BasicDetail';
import ProductMedia from '../Add-Product/ProductMedia/ProductMedia';
import { BasicDetailFormState, CreateProductPayload, Product, ProductMediaState } from '../Add-Product/types';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../../redux/product.api';
import { useNotification } from '../../../providers/NotificationProvider';

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

const mapProductToBasicDetail = (product?: Product): BasicDetailFormState => {
  if (!product) return createInitialBasicDetail();
  return {
    ...createInitialBasicDetail(),
    title: product.title || '',
    description: product.description || '',
    brand: product.brand || '',
    sku: product.sku || '',
    type: product.type || '',
    basePrice: product.basePrice?.toString() || '',
    discountPrice: product.discountPrice?.toString() || '',
    taxIncluded: product.tax && product.tax > 0 ? 'yes' : 'no',
    tax: product.tax?.toString() || '',
    stockQuantity: product.stockQuantity?.toString() || '',
    stockStatus: product.stockStatus || 'in-stock',
    isUnlimited: Boolean(product.isUnlimited),
    startDate: product.startDate || '',
    endDate: product.endDate || '',
    weight: product.weight?.toString() || '',
    dimensions: {
      length: product.dimensions?.length?.toString() || '',
      width: product.dimensions?.width?.toString() || '',
      height: product.dimensions?.height?.toString() || '',
    },
    isFeatured: Boolean(product.isFeatured),
  };
};

const mapProductToMediaDetail = (product?: Product): ProductMediaState => {
  if (!product) return createInitialMediaDetail();
  const images = Array.isArray(product.image) ? product.image : product.image ? [product.image] : [];
  return {
    images,
    categoryId: product.categoryId || '',
    tag: product.tag || '',
    selectedColor: product.color || '#c8dfbe',
  };
};

const EditProduct = () => {
  const { id = '' } = useParams();
  const location = useLocation();
  const routeState = location.state as { product?: Product } | null;
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(id, { skip: !id || !!routeState?.product });
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [basicDetail, setBasicDetail] = useState<BasicDetailFormState>(() => createInitialBasicDetail());
  const [mediaDetail, setMediaDetail] = useState<ProductMediaState>(() => createInitialMediaDetail());
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (routeState?.product) {
      setBasicDetail(mapProductToBasicDetail(routeState.product));
      setMediaDetail(mapProductToMediaDetail(routeState.product));
      return;
    }
    if (!product) return;
    setBasicDetail(mapProductToBasicDetail(product));
    setMediaDetail(mapProductToMediaDetail(product));
  }, [product, routeState]);

  const canUpdate = useMemo(() => {
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

  const buildPayload = useCallback((): CreateProductPayload => {
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
      isActive: true,
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
  }, [basicDetail, mediaDetail, numberOrUndefined]);

  const deriveErrorMessage = useCallback((error: unknown) => {
    if (error && typeof error === 'object' && 'data' in error) {
      const data = (error as { data?: { message?: string; error?: string } }).data;
      return data?.message || data?.error || 'Unable to update product.';
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unable to update product.';
  }, []);

  const handleUpdate = useCallback(async () => {
    if (!id) return;
    if (isUploading) {
      showNotification({ message: 'Please wait for the image upload to finish.', type: 'info' });
      return;
    }
    if (!canUpdate) {
      showNotification({ message: 'Please fill all required fields and upload an image.', type: 'warning' });
      return;
    }

    try {
      const payload = buildPayload();
      await updateProduct({ id, payload }).unwrap();
      showNotification({ message: 'Product updated successfully.', type: 'success' });
      navigate('/');
    } catch (error) {
      showNotification({ message: deriveErrorMessage(error), type: 'error' });
    }
  }, [buildPayload, canUpdate, deriveErrorMessage, id, isUploading, navigate, showNotification, updateProduct]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.title}>Update Product</div>
          <div className={styles.actions}>
            <SearchBox
              variant="compact"
              placeholder="Search product"
              className={styles.searchCompact}
            />
            <Button
              label="Update Product"
              variant="primary"
              onClick={handleUpdate}
              loading={isUpdating}
              disabled={!canUpdate || isUpdating}
            />
            <Button label="Cancel" variant="ghost" onClick={() => {
              if (window.history.length > 1) navigate(-1);
              else navigate('/');
            }} />
            <Button label="" icon={<PlusIcon />} variant="ghost" onClick={() => {}} aria-label="Add" />
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContainer}>
          <BasicDetail
            value={basicDetail}
            onChange={setBasicDetail}
            onPublish={handleUpdate}
            onSaveDraft={() => {}}
            canPublish={canUpdate}
            isSubmitting={isUpdating || isProductLoading}
          />
        </div>
        <div className={styles.rightContainer}>
          <ProductMedia
            value={mediaDetail}
            onChange={setMediaDetail}
            isUploading={isUploading}
            onUploadStateChange={setIsUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
