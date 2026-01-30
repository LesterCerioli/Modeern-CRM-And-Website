export interface CredentialRequest {
  token: string;
  organization_name: string;
  type: 'Identifier' | string;
  email: string;
  password: string;
  description: string;
}

export interface CredentialResponse {
  id: string;
  organization_id: string;
  organization_name: string | null;
  type: 'Identifier' | string;
  email: string;
  password: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CredentialFormData {
  credentialName: string;
  credentialType: string;
  credentialEmail: string;
  organization: string;
  description: string;
  credentialPassword: string;
}

export interface RawCredential {
  id: string;
  organization_id: string;
  organization_name: string;
  type: string;
  email: string;
  password: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RawCredentialsResponse {
  credentials: RawCredential[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  organization_name: string;
}

export interface RawCredentialsParams {
  organization_name?: string;
  page?: number;
  size?: number;
}

function isServer() {
  return typeof window === 'undefined';
}

function getNextJsBaseUrl() {
  if (!isServer()) {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '';
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 
         process.env.NEXTAUTH_URL || 
         'http://localhost:3000';
}

function getPythonApiBaseUrl() {
  return process.env.LTS_US_API_BASE_URL || process.env.NEXT_PUBLIC_LTS_US_API_BASE_URL;
}


async function getExternalToken() {
  const baseUrl = getNextJsBaseUrl();
  const apiUrl = `${baseUrl}/api/auth/token`;
  
  console.log('[CredentialService] Getting external token from Next.js API:', apiUrl);
  console.log('[CredentialService] Running on server?', isServer());
  console.log('[CredentialService] NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  
  console.log(`[CredentialService] Token response status: ${response.status}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[CredentialService] Failed to obtain JWT: ${response.status} - ${errorText}`);
    throw new Error(`Failed to obtain JWT from Next.js API: ${response.status} - ${errorText}`);
  }
  
  const tokenData = await response.json();
  console.log('[CredentialService] Token obtained successfully');
  console.log('[CredentialService] Token data keys:', Object.keys(tokenData));
  
  return tokenData; 
}

export async function createCredential(
  credentialData: CredentialFormData
): Promise<CredentialResponse> {
  console.group('[CredentialService] Starting createCredential');
  
  try {
    console.log('[CredentialService] Credential data received:', {
      credentialName: credentialData.credentialName,
      credentialType: credentialData.credentialType,
      credentialEmail: credentialData.credentialEmail,
      organization: credentialData.organization,
      descriptionLength: credentialData.description?.length || 0,
      hasPassword: !!credentialData.credentialPassword
    });

    const PYTHON_API_URL = getPythonApiBaseUrl();
    console.log('[CredentialService] LTS_US_API_BASE_URL (Python API):', PYTHON_API_URL);
    
    const NEXTJS_API_URL = getNextJsBaseUrl();
    console.log('[CredentialService] NEXT_PUBLIC_API_BASE_URL (Next.js API):', NEXTJS_API_URL);
    
    if (!PYTHON_API_URL) {
      console.error('[CredentialService] LTS_US_API_BASE_URL is not configured');
      console.error('[CredentialService] Configure variable LTS_US_API_BASE_URL on .env');
      throw new Error("LTS_US_API_BASE_URL is not configured");
    }

    
    console.log('[CredentialService] Step 1: Getting JWT token from Next.js API...');
    const tokenData = await getExternalToken();
    const jwt = tokenData.token || tokenData.access_token;
    
    if (!jwt) {
      console.error('[CredentialService] No JWT token found in response:', tokenData);
      throw new Error("Failed to obtain JWT from Next.js API");
    }
    
    console.log('[CredentialService] JWT token obtained (first 20 chars):', jwt.substring(0, 20) + '...');

    console.log('[CredentialService] Step 2: Preparing request body for Python API...');
    const requestBody: CredentialRequest = {
      token: jwt,
      organization_name: credentialData.organization,
      type: credentialData.credentialType,
      email: credentialData.credentialEmail,
      password: credentialData.credentialPassword,
      description: credentialData.description
    };

    console.log('[CredentialService] Request body for Python API:', {
      ...requestBody,
      token: '[REDACTED]',
      password: '[REDACTED]',
      descriptionLength: requestBody.description?.length || 0
    });

    console.log('[CredentialService] Step 3: Making request to Python API (LTS US API)...');
    const pythonApiUrl = `${PYTHON_API_URL}/credentials`;
    console.log('[CredentialService] Calling Python API:', pythonApiUrl);
    
    const response = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    console.log('[CredentialService] Python API response status:', response.status);
    
    const responseText = await response.text();
    console.log('[CredentialService] Python API response text (first 500 chars):', responseText.substring(0, 500));

    
    if (response.status === 401) {
      console.error('[CredentialService] 401 Unauthorized from Python API');
      throw new Error("401 Unauthorized - Token inválido ou expirado");
    }

    if (response.status === 404) {
      console.error('[CredentialService] 404 Not Found from Python API');
      console.error('[CredentialService] Full URL called:', pythonApiUrl);
      throw new Error(`404 Not Found - Endpoint não encontrado: ${pythonApiUrl}`);
    }

    if (!response.ok) {
      console.error(`[CredentialService] Python API error ${response.status}:`, responseText);
      throw new Error(`Python API error: ${response.status} - ${responseText.substring(0, 200)}`);
    }

    console.log('[CredentialService] Step 4: Parsing Python API response...');
    try {
      const responseData = JSON.parse(responseText);
      console.log('[CredentialService] Python API response data:', {
        id: responseData.id,
        email: responseData.email,
        type: responseData.type,
        organization_id: responseData.organization_id,
        created_at: responseData.created_at
      });
      
      console.log('[CredentialService] Credential created successfully in Python API!');
      console.groupEnd();
      
      return responseData as CredentialResponse;
    } catch (parseError) {
      console.error('[CredentialService] Error parsing JSON response from Python API:', parseError);
      console.error('[CredentialService] Raw response from Python API:', responseText);
      throw new Error(`Failed to parse Python API response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error('[CredentialService] Error in createCredential:', error);
    if (error instanceof Error) {
      console.error('[CredentialService] Error message:', error.message);
      console.error('[CredentialService] Error stack:', error.stack);
    }
    console.groupEnd();
    throw error;
  }
}

export async function createCredentialFromForm(
  formData: CredentialFormData
): Promise<CredentialResponse> {
  console.log('[CredentialService] createCredentialFromForm called');
  return createCredential(formData);
}


export async function credentialService(requestData: {
  token: string;
  organization_name: string;
  type: 'Identifier' | string;
  email: string;
  password: string;
  description: string;
}): Promise<CredentialResponse> {
  console.group('[CredentialService] credentialService function (route.js compatible)');
  console.log('[CredentialService] Raw request data from route.js:', {
    ...requestData,
    token: '[REDACTED]',
    password: '[REDACTED]',
    descriptionLength: requestData.description?.length || 0
  });
  
  const credentialFormData: CredentialFormData = {
    credentialName: `${requestData.type}_${requestData.email}`,
    credentialType: requestData.type,
    credentialEmail: requestData.email,
    organization: requestData.organization_name,
    description: requestData.description,
    credentialPassword: requestData.password
  };

  console.log('[CredentialService] Converted to CredentialFormData:', {
    ...credentialFormData,
    credentialPassword: '[REDACTED]'
  });
  
  try {
    const result = await createCredential(credentialFormData);
    console.log('[CredentialService] credentialService completed successfully');
    console.groupEnd();
    return result;
  } catch (error) {
    console.error('[CredentialService] credentialService failed:', error);
    console.groupEnd();
    throw error;
  }
}


export async function getRawCredentials(
  params?: RawCredentialsParams
): Promise<RawCredentialsResponse> {
  console.group('[CredentialService] getRawCredentials - DIRECT PYTHON API CALL');
  
  try {
    
    const PYTHON_API_URL = getPythonApiBaseUrl();
    console.log('[CredentialService] Python API URL:', PYTHON_API_URL);
    
    if (!PYTHON_API_URL) {
      throw new Error("LTS_US_API_BASE_URL is not configured. Check your environment variables.");
    }
    
    
    console.log('[CredentialService] Step 1: Getting JWT token from Python API...');
    const jwt = await getPythonApiToken();
    console.log('[CredentialService] Token obtained. Length:', jwt.length);
    console.log('[CredentialService] Token preview:', jwt.substring(0, 30) + '...');
    
    
    console.log('[CredentialService] Step 2: Building request parameters...');
    const queryParams = new URLSearchParams();
    
    
    const organizationName = params?.organization_name || 'Lucas Technology Service';
    queryParams.append('organization_name', organizationName);
    
    
    const page = params?.page || 1;
    const size = params?.size || 50;
    
    queryParams.append('page', page.toString());
    queryParams.append('size', size.toString());
    
    console.log('[CredentialService] Query parameters:', {
      organization_name: organizationName,
      page,
      size
    });
    
    
    const url = `${PYTHON_API_URL}/credentials?${queryParams.toString()}`;
    const safeUrl = url.replace(jwt, '[REDACTED]');
    console.log('[CredentialService] Step 3: Calling Python API:', safeUrl);
    
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "token": jwt  
      },
      cache: 'no-store' 
    });
    
    console.log('[CredentialService] Response status:', response.status);
    console.log('[CredentialService] Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('[CredentialService] Response length:', responseText.length);
    
    if (!response.ok) {
      console.error('[CredentialService] API error response:', responseText.substring(0, 500));
      
      if (response.status === 401) {
        throw new Error("Authentication failed - Token may be invalid or expired");
      }
      
      if (response.status === 404) {
        throw new Error(`Endpoint not found: ${PYTHON_API_URL}/credentials`);
      }
      
      throw new Error(`Python API error ${response.status}: ${responseText.substring(0, 200)}`);
    }
    
    
    console.log('[CredentialService] Step 4: Parsing response...');
    try {
      const responseData: RawCredentialsResponse = JSON.parse(responseText);
      
      console.log('[CredentialService] Success! Response data:', {
        total: responseData.total,
        page: responseData.page,
        size: responseData.size,
        total_pages: responseData.total_pages,
        organization_name: responseData.organization_name,
        credentials_count: responseData.credentials?.length || 0
      });
      
      if (responseData.credentials && responseData.credentials.length > 0) {
        console.log('[CredentialService] First credential:', {
          email: responseData.credentials[0].email,
          type: responseData.credentials[0].type,
          description: responseData.credentials[0].description
        });
      }
      
      console.groupEnd();
      return responseData;
      
    } catch (parseError) {
      console.error('[CredentialService] Error parsing JSON:', parseError);
      console.error('[CredentialService] Raw response:', responseText.substring(0, 500));
      throw new Error(`Failed to parse API response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error('[CredentialService] Error in getRawCredentials:', error);
    
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[CredentialService] Network error - Check if Python API is reachable:', getPythonApiBaseUrl());
    }
    
    console.groupEnd();
    throw error;
  }
}


async function getPythonApiToken(): Promise<string> {
  console.group('[CredentialService] getPythonApiToken - DIRECT TO Python API');
  
  const PYTHON_API_URL = getPythonApiBaseUrl();
  console.log('[CredentialService] Getting token from:', `${PYTHON_API_URL}/auth/token`);
  
  try {
    const response = await fetch(`${PYTHON_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "client_id": "lts_a7f_5202l",
        "client_secret": "k9Hp4$mQ!2vN6rT1"
      }),
      cache: 'no-store'
    });
    
    console.log('[CredentialService] Token response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CredentialService] Token error:', errorText);
      throw new Error(`Failed to get token from Python API: ${response.status} - ${errorText}`);
    }
    
    const tokenData = await response.json();
    console.log('[CredentialService] Token response keys:', Object.keys(tokenData));
    
    const jwt = tokenData.token;
    
    if (!jwt) {
      console.error('[CredentialService] No token in response:', tokenData);
      throw new Error("No token received from Python API");
    }
    
    console.log('[CredentialService] Token obtained successfully');
    console.groupEnd();
    return jwt;
    
  } catch (error) {
    console.error('[CredentialService] Error getting token:', error);
    console.groupEnd();
    throw error;
  }
}


function validatePythonApiConfig(): void {
  const PYTHON_API_URL = getPythonApiBaseUrl();
  
  if (!PYTHON_API_URL) {
    console.error('[CredentialService] CRITICAL: LTS_US_API_BASE_URL is not set!');
    console.error('[CredentialService] Add to .env.production or Vercel environment variables:');
    console.error('[CredentialService] LTS_US_API_BASE_URL=https://lts-us-api-python.onrender.com');
    throw new Error("Python API URL not configured");
  }
  
  console.log('[CredentialService] Configuration OK:', {
    pythonApiUrl: PYTHON_API_URL,
    nodeEnv: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production'
  });
}