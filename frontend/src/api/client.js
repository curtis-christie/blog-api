const API_BASE_URL = "http://localhost:3001/api";

function normalizeResponse(data) {
  if (!data) return data;

  if (data.data) {
    return data.data;
  }

  return data;
}

export async function apiRequest(endpoint, options = {}) {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  let responseData = null;

  try {
    responseData = await response.json();
  } catch {
    responseData = null;
  }

  if (!response.ok) {
    const errorMessage = responseData?.message || responseData?.error || "Request failed.";

    throw new Error(errorMessage);
  }

  return normalizeResponse(responseData);
}
