import { QueryClient } from "@tanstack/react-query";

async function throwIfResNotOk(res) {
  if (!res.ok) {
    let errorText;
    try {
      const errorData = await res.json();
      errorText = errorData.message || res.statusText;
    } catch (e) {
      errorText = res.statusText;
    }
    const error = new Error(errorText);
    error.status = res.status;
    throw error;
  }
}

export async function apiRequest(path, options = {}) {
  const res = await fetch(path, options);
  await throwIfResNotOk(res);
  return res.json();
}

export const getQueryFn = ({ on401 }) => 
  async ({ queryKey }) => {
    try {
      const [path] = Array.isArray(queryKey) ? queryKey : [queryKey];
      const isStd = typeof path === "string";
      const fetchPath = isStd ? path : path.path;
      const fetchOpt = isStd ? {} : path.options || {};
      const res = await fetch(fetchPath, fetchOpt);
      if (res.status === 401 && on401 === "returnNull") {
        return null;
      }
      await throwIfResNotOk(res);
      return res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: false,
      queryFn: getQueryFn({ on401: "throw" }),
    },
  },
});