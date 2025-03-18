import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ApiFunction<T, P> = (params: P) => Promise<T>;

export function useApi<T, P>(apiFunction: ApiFunction<T, P>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (params: P) => {
      try {
        setState({ data: null, loading: true, error: null });
        const data = await apiFunction(params);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'An error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [apiFunction]
  );

  return { ...state, execute };
}

export function useApiNoParams<T>(apiFunction: () => Promise<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    try {
      setState({ data: null, loading: true, error: null });
      const data = await apiFunction();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, [apiFunction]);

  return { ...state, execute };
} 