import { getExternalToken } from "./externalApi";


export interface UserCreation {
  name: string;
  email: string;
  password: string;
  role: string;
  organization_name: string;
}

export interface UserCreationResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  organization_name: string;
  created_at: string;
  updated_at: string;
}

export interface ResetPassword {
  email: string;
  new_passwor: string;
}

export interface ResetPasswordResponse {
  id: string;
  email: string;
  new_password: string;
}

export async function createUser(
  userData: UserCreation
): Promise<UserCreationResponse> {
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
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    organization_name: userData.organization_name
  };

  
  const response = await fetch(`${API_URL}/users/register`, {
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
export async function createResetPassword(
  resetData: ResetPassword
): Promise<ResetPasswordResponse> {
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
    email: resetData.email,
    new_password: resetData.new_passwor
  };

  
  const response = await fetch(`${API_URL}/users/reset-password`, {
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
