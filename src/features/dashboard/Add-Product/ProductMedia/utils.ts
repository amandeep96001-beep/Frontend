export const deriveCategoryErrorMessage = (error: unknown): string => {
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