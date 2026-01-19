import { getExternalToken } from "./externalApi";

export interface LoginCredentials {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const API_URL = process.env.LTS_US_API_BASE_URL;

  if (!API_URL) {
    throw new Error("LTS_US_API_BASE_URL");
  }

  
  const tokenData = await getExternalToken();
  const jwt = tokenData.token;

  if (!jwt) {
    throw new Error("Failed to obtain JWT from external API");
  }

  
  const requestBody = {
    token: jwt,
    email: credentials.email,
    password: credentials.password,
    role: credentials.role
  };

  
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  
  if (response.status === 401) {
    throw new Error("401 Unauthorized");
  }

  if (response.status === 404) {
    throw new Error("404 Not Found");
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`External API error: ${response.status} - ${text}`);
  }

  
  return response.json();
}
