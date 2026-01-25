export interface ProjectRequest {
  token: string;
  organization_name: string;
  name: string;
  code: string;
  description: string;
  owner_username: string;
  template_agile_method: string;
  settings: Record<string, any>;
}

export interface ProjectResponse {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  description: string;
  owner_id: string;
  owner_username: string;
  template_agile_method: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  settings: Record<string, any>;
}

export interface ProjectFormData {
  projectName: string;
  agileMethodology: string;
  projectCode: string;
  organization: string;
  description: string;
  ownerUser: string;
}

export interface RawProject {
  id: string;
  organization_id: string;
  name: string;
  code: string;
  description: string;
  owner_id: string;
  template_agile_method: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface RawProjectsResponse {
  success: boolean;
  count: number;
  total_count: number;
  projects: RawProject[];
  limit: number;
  offset: number;
  organization_name: string;
  include_deleted: boolean;
}

export interface RawProjectsParams {
  organization_name?: string;
  limit?: number;
  offset?: number;
  include_deleted?: boolean;
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
         'https://lts-us-website.vercel.app';
}


function getPythonApiBaseUrl() {
  return process.env.LTS_US_API_BASE_URL || process.env.NEXT_PUBLIC_LTS_US_API_BASE_URL;
}


async function getExternalToken() {
  const baseUrl = getNextJsBaseUrl();
  const apiUrl = `${baseUrl}/api/auth/token`;
  
  console.log('[ProjectService] Getting external token from Next.js API:', apiUrl);
  console.log('[ProjectService] Running on server?', isServer());
  console.log('[ProjectService] NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  
  console.log(`[ProjectService] Token response status: ${response.status}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ProjectService] Failed to obtain JWT: ${response.status} - ${errorText}`);
    throw new Error(`Failed to obtain JWT from Next.js API: ${response.status} - ${errorText}`);
  }
  
  const tokenData = await response.json();
  console.log('[ProjectService] Token obtained successfully');
  console.log('[ProjectService] Token data keys:', Object.keys(tokenData));
  
  return tokenData;
}

export async function createProject(
  projectData: ProjectFormData
): Promise<ProjectResponse> {
  console.group('[ProjectService] Starting createProject');
  
  try {
    console.log('[ProjectService] Project data received:', {
      projectName: projectData.projectName,
      projectCode: projectData.projectCode,
      organization: projectData.organization,
      agileMethodology: projectData.agileMethodology,
      descriptionLength: projectData.description?.length || 0,
      ownerUser: projectData.ownerUser
    });

    
    const PYTHON_API_URL = getPythonApiBaseUrl();
    console.log('[ProjectService] LTS_US_API_BASE_URL (Python API):', PYTHON_API_URL);
    
    
    const NEXTJS_API_URL = getNextJsBaseUrl();
    console.log('[ProjectService] NEXT_PUBLIC_API_BASE_URL (Next.js API):', NEXTJS_API_URL);
    
    if (!PYTHON_API_URL) {
      console.error('[ProjectService] LTS_US_API_BASE_URL it is not configured');
      console.error('[ProjectService] Configure variable LTS_US_API_BASE_URL on .env');
      throw new Error("LTS_US_API_BASE_URL it is not configured");
    }

    
    console.log('[ProjectService] Step 1: Getting JWT token from Next.js API...');
    const tokenData = await getExternalToken();
    const jwt = tokenData.token || tokenData.access_token;
    
    if (!jwt) {
      console.error('[ProjectService] No JWT token found in response:', tokenData);
      throw new Error("Failed to obtain JWT from Next.js API");
    }
    
    console.log('[ProjectService] JWT token obtained (first 20 chars):', jwt.substring(0, 20) + '...');

    
    console.log('[ProjectService] Step 2: Preparing request body for Python API...');
    const requestBody: ProjectRequest = {
      token: jwt,
      organization_name: projectData.organization,
      name: projectData.projectName,
      code: projectData.projectCode,
      description: projectData.description,
      owner_username: projectData.ownerUser,
      template_agile_method: projectData.agileMethodology,
      settings: {}
    };

    console.log('[ProjectService] Request body for Python API:', {
      ...requestBody,
      token: '[REDACTED]', 
      descriptionLength: requestBody.description?.length || 0
    });

    
    console.log('[ProjectService] Step 3: Making request to Python API (LTS US API)...');
    const pythonApiUrl = `${PYTHON_API_URL}/projects`;
    console.log('[ProjectService] Calling Python API:', pythonApiUrl);
    
    const response = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    console.log('[ProjectService] Python API response status:', response.status);
    
    
    const responseText = await response.text();
    console.log('[ProjectService] Python API response text (first 500 chars):', responseText.substring(0, 500));

    
    if (response.status === 401) {
      console.error('[ProjectService] 401 Unauthorized from Python API');
      throw new Error("401 Unauthorized - Token inválido ou expirado");
    }

    if (response.status === 404) {
      console.error('[ProjectService] 404 Not Found from Python API');
      console.error('[ProjectService] Full URL called:', pythonApiUrl);
      throw new Error(`404 Not Found - Endpoint não encontrado: ${pythonApiUrl}`);
    }

    if (response.status === 409) {
      console.error('[ProjectService] 409 Conflict from Python API');
      throw new Error("409 Conflict - Código do projeto já existe");
    }

    if (!response.ok) {
      console.error(`[ProjectService] Python API error ${response.status}:`, responseText);
      throw new Error(`Python API error: ${response.status} - ${responseText.substring(0, 200)}`);
    }

   
    console.log('[ProjectService] Step 4: Parsing Python API response...');
    try {
      const responseData = JSON.parse(responseText);
      console.log('[ProjectService] Python API response data:', {
        id: responseData.id,
        name: responseData.name,
        code: responseData.code,
        organization_id: responseData.organization_id,
        is_active: responseData.is_active,
        created_at: responseData.created_at
      });
      
      console.log('[ProjectService] Project created successfully in Python API!');
      console.groupEnd();
      
      return responseData as ProjectResponse;
    } catch (parseError) {
      console.error('[ProjectService] Error parsing JSON response from Python API:', parseError);
      console.error('[ProjectService] Raw response from Python API:', responseText);
      throw new Error(`Failed to parse Python API response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
    }
    
  } catch (error) {
    console.error('[ProjectService] Error in createProject:', error);
    if (error instanceof Error) {
      console.error('[ProjectService] Error message:', error.message);
      console.error('[ProjectService] Error stack:', error.stack);
    }
    console.groupEnd();
    throw error;
  }
}


export async function createProjectFromForm(
  formData: ProjectFormData
): Promise<ProjectResponse> {
  console.log('[ProjectService] createProjectFromForm called');
  return createProject(formData);
}


export async function projectService(requestData: {
  token: string;
  organization_name: string;
  name: string;
  code: string;
  description: string;
  owner_username: string;
  template_agile_method: string;
  settings?: Record<string, any>;
}): Promise<ProjectResponse> {
  console.group('[ProjectService] projectService function (route.js compatible)');
  console.log('[ProjectService] Raw request data from route.js:', {
    ...requestData,
    token: '[REDACTED]',
    descriptionLength: requestData.description?.length || 0
  });
  
  
  const projectFormData: ProjectFormData = {
    projectName: requestData.name,
    agileMethodology: requestData.template_agile_method,
    projectCode: requestData.code,
    organization: requestData.organization_name,
    description: requestData.description,
    ownerUser: requestData.owner_username
  };

  console.log('[ProjectService] Converted to ProjectFormData:', projectFormData);
  
  try {
    const result = await createProject(projectFormData);
    console.log('[ProjectService] projectService completed successfully');
    console.groupEnd();
    return result;
  } catch (error) {
    console.error('[ProjectService] projectService failed:', error);
    console.groupEnd();
    throw error;
  }
}
export async function getRawProjects(
  params?: RawProjectsParams
): Promise<RawProjectsResponse> {
  console.group('[ProjectService] getRawProjects - PRODUCTION DEBUG VERSION');
  
  // DEBUG: Log all environment information
  console.log('[ProjectService] === ENVIRONMENT DEBUG ===');
  console.log('[ProjectService] NODE_ENV:', process.env.NODE_ENV);
  console.log('[ProjectService] VERCEL:', process.env.VERCEL ? 'YES' : 'NO');
  console.log('[ProjectService] VERCEL_ENV:', process.env.VERCEL_ENV);
  console.log('[ProjectService] VERCEL_URL:', process.env.VERCEL_URL);
  
  console.log('[ProjectService] === CONFIGURATION DEBUG ===');
  console.log('[ProjectService] NEXT_PUBLIC_API_BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL || 'NOT SET');
  console.log('[ProjectService] LTS_US_API_BASE_URL (raw):', process.env.LTS_US_API_BASE_URL ? 'SET' : 'NOT SET');
  console.log('[ProjectService] NEXT_PUBLIC_LTS_US_API_BASE_URL:', process.env.NEXT_PUBLIC_LTS_US_API_BASE_URL || 'NOT SET');
  console.log('[ProjectService] NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'NOT SET');
  
  console.log('[ProjectService] === FUNCTION DEBUG ===');
  console.log('[ProjectService] getNextJsBaseUrl():', getNextJsBaseUrl());
  console.log('[ProjectService] getPythonApiBaseUrl():', getPythonApiBaseUrl());
  console.log('[ProjectService] isServer():', isServer());
  console.log('[ProjectService] Input params:', params);
  
  try {
    // 1. Get Python API URL
    const PYTHON_API_URL = getPythonApiBaseUrl();
    console.log('[ProjectService] Resolved Python API URL:', PYTHON_API_URL);
    
    if (!PYTHON_API_URL) {
      console.error('[ProjectService] ERROR: Python API URL is not configured!');
      throw new Error("Python API URL is not configured. Check LTS_US_API_BASE_URL environment variable.");
    }
    
    // 2. Get JWT token
    console.log('[ProjectService] === STEP 1: Getting JWT Token ===');
    
    const tokenData = await getExternalToken();
    console.log('[ProjectService] Token data received. Has token:', !!(tokenData.token || tokenData.access_token));
    
    const jwt = tokenData.token || tokenData.access_token;
    
    if (!jwt) {
      console.error('[ProjectService] ERROR: No JWT token found in response!');
      throw new Error("Failed to obtain JWT token from Next.js API");
    }
    
    console.log('[ProjectService] Token obtained successfully. Length:', jwt.length);
    
    // 3. Build query parameters
    console.log('[ProjectService] === STEP 2: Building Query Parameters ===');
    const queryParams = new URLSearchParams();
    
    // CRITICAL: Add token as query parameter
    queryParams.append('token', jwt);
    
    // Organization name
    const orgName = params?.organization_name || 'default';
    queryParams.append('organization_name', orgName);
    
    // Other parameters with defaults
    const limit = params?.limit || 100;
    const offset = params?.offset || 0;
    const includeDeleted = params?.include_deleted || false;
    
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    queryParams.append('include_deleted', includeDeleted.toString());
    
    console.log('[ProjectService] Query params:', {
      limit,
      offset,
      include_deleted: includeDeleted,
      organization: orgName
    });
    
    // 4. Build URLs for testing
    console.log('[ProjectService] === STEP 3: Building API URLs ===');
    
    const endpoints = [
      { name: 'A', path: '/projects/raw' },
      { name: 'B', path: '/projects-raw' },
      { name: 'C', path: '/projects' }
    ];
    
    const results = [];
    
    for (const endpoint of endpoints) {
      console.log(`[ProjectService] Testing endpoint ${endpoint.name} (${endpoint.path})...`);
      
      const url = `${PYTHON_API_URL}${endpoint.path}?${queryParams.toString()}`;
      const safeUrl = url.replace(jwt, '[REDACTED]');
      console.log(`[ProjectService] URL: ${safeUrl}`);
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log(`[ProjectService] Endpoint ${endpoint.name} status: ${response.status}`);
        
        const responseText = await response.text();
        
        if (response.ok) {
          console.log(`[ProjectService] ✓ Endpoint ${endpoint.name} succeeded!`);
          
          try {
            const responseData: RawProjectsResponse = JSON.parse(responseText);
            console.log(`[ProjectService] Parsed ${responseData.projects?.length || 0} projects`);
            
            console.groupEnd();
            return responseData;
          } catch (parseError) {
            console.error(`[ProjectService] Failed to parse response from ${endpoint.name}:`, parseError);
            results.push({ endpoint: endpoint.name, status: 'parse_error', error: parseError });
          }
        } else {
          console.log(`[ProjectService] Endpoint ${endpoint.name} failed with ${response.status}`);
          results.push({ endpoint: endpoint.name, status: response.status, error: responseText.substring(0, 100) });
        }
        
      } catch (fetchError) {
        console.error(`[ProjectService] Fetch error for ${endpoint.name}:`, fetchError);
        
        // Type-safe error extraction
        let errorMessage = 'Unknown error';
        if (fetchError instanceof Error) {
          errorMessage = fetchError.message;
        } else if (typeof fetchError === 'string') {
          errorMessage = fetchError;
        } else if (fetchError && typeof fetchError === 'object' && 'message' in fetchError) {
          errorMessage = String((fetchError as any).message);
        }
        
        results.push({ endpoint: endpoint.name, status: 'fetch_error', error: errorMessage });
      }
    }
    
    // All endpoints failed
    console.error('[ProjectService] ✗ All endpoints failed!');
    console.error('[ProjectService] Results:', results);
    
    throw new Error(
      `Failed to connect to Python API. Tried ${endpoints.length} endpoints. ` +
      `Check: 1) API URL configuration, 2) Network connectivity, 3) CORS settings. ` +
      `Base URL: ${PYTHON_API_URL}`
    );
    
  } catch (error) {
    console.error('[ProjectService] === FATAL ERROR ===');
    
    // Type-safe error handling
    if (error instanceof Error) {
      console.error('[ProjectService] Error type:', error.constructor.name);
      console.error('[ProjectService] Error message:', error.message);
      console.error('[ProjectService] Error stack:', error.stack);
    } else {
      console.error('[ProjectService] Unknown error type:', typeof error);
      console.error('[ProjectService] Error value:', error);
    }
    
    // Provide user-friendly error message
    let friendlyMessage = 'Failed to fetch projects';
    
    if (error instanceof Error) {
      if (error.message.includes('timeout') || error.name === 'AbortError') {
        friendlyMessage = 'Request timeout - Python API may be down or unreachable';
      } else if (error.message.includes('network') || error.name === 'TypeError') {
        friendlyMessage = 'Network error - Cannot connect to Python API';
      } else if (error.message.includes('401')) {
        friendlyMessage = 'Authentication failed - Token may be invalid or expired';
      } else if (error.message.includes('404')) {
        friendlyMessage = 'Endpoint not found - Check Python API configuration';
      }
    }
    
    console.error('[ProjectService] Friendly error:', friendlyMessage);
    console.groupEnd();
    
    // Re-throw with proper typing
    if (error instanceof Error) {
      throw new Error(`${friendlyMessage}: ${error.message}`);
    } else {
      throw new Error(friendlyMessage);
    }
  }
}
