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
  console.group('[ProjectService] Starting getRawProjects');
  try {
    // Debug: Verificar todas as variáveis de ambiente relevantes
    console.log('[ProjectService] Environment variables check:', {
      LTS_US_API_BASE_URL: process.env.LTS_US_API_BASE_URL,
      NEXT_PUBLIC_LTS_US_API_BASE_URL: process.env.NEXT_PUBLIC_LTS_US_API_BASE_URL,
      NODE_ENV: process.env.NODE_ENV
    });

    const PYTHON_API_URL = getPythonApiBaseUrl();
    console.log('[ProjectService] Python API URL from getPythonApiBaseUrl():', PYTHON_API_URL);
    
    if (!PYTHON_API_URL) {
      console.error('[ProjectService] ERROR: Python API URL is not configured');
      console.error('[ProjectService] Available env vars:', Object.keys(process.env).filter(key => 
        key.includes('LTS') || key.includes('API') || key.includes('BASE_URL')
      ));
      throw new Error("Python API URL not configured. Check LTS_US_API_BASE_URL env variable.");
    }

    console.log('[ProjectService] Getting JWT token...');
    const tokenData = await getExternalToken();
    const jwt = tokenData.token || tokenData.access_token;

    if (!jwt) {
      console.error('[ProjectService] No JWT token received:', tokenData);
      throw new Error("Failed to get JWT token from auth endpoint");
    }
    
    console.log('[ProjectService] JWT token obtained (first 20 chars):', jwt.substring(0, 20) + '...');

    // Construir query parameters
    const queryParams = new URLSearchParams();
    
    if (params?.organization_name) {
      queryParams.append('organization_name', params.organization_name);
    }
    
    // Usar valores padrão se não fornecidos
    const limit = params?.limit || 1000;
    const offset = params?.offset || 0;
    const include_deleted = params?.include_deleted || false;
    
    queryParams.append('limit', limit.toString());
    queryParams.append('offset', offset.toString());
    queryParams.append('include_deleted', include_deleted.toString());

    // IMPORTANTE: Verificar o endpoint correto
    // Se /projects-raw não existir, tente /projects ou outro endpoint
    const endpoint = '/projects-raw'; // Altere se necessário
    const url = `${PYTHON_API_URL}${endpoint}?${queryParams.toString()}`;
    
    console.log('[ProjectService] Full URL to call:', url);
    console.log('[ProjectService] Query params:', {
      organization_name: params?.organization_name,
      limit,
      offset,
      include_deleted
    });

    // Tentar diferentes formatos de headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Tente diferentes formatos de autenticação
    const authHeaders = [
      { "Authorization": `Bearer ${jwt}` },
      { "token": jwt },
      { "x-access-token": jwt },
      { "X-Access-Token": jwt }
    ];

    let lastError: Error | null = null;
    
    // Tentar diferentes formatos de headers
    for (const authHeader of authHeaders) {
      try {
        console.log('[ProjectService] Trying with auth header:', Object.keys(authHeader)[0]);
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            ...headers,
            ...authHeader
          },
          // Adicionar timeout para evitar espera infinita
          signal: AbortSignal.timeout(30000) // 30 segundos timeout
        });
        
        console.log('[ProjectService] Response status:', response.status);
        console.log('[ProjectService] Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('[ProjectService] Response text (first 500 chars):', responseText.substring(0, 500));
        
        if (!response.ok) {
          console.error(`[ProjectService] API error ${response.status}:`, responseText);
          
          if (response.status === 404) {
            // Endpoint não encontrado, talvez tentar outro
            throw new Error(`Endpoint ${endpoint} not found (404)`);
          }
          
          if (response.status === 401 || response.status === 403) {
            // Token inválido ou formato de header incorreto
            continue; // Tenta próximo formato de header
          }
          
          throw new Error(`API error ${response.status}: ${responseText.substring(0, 200)}`);
        }
        
        // Tentar parsear JSON
        try {
          const responseData = JSON.parse(responseText);
          console.log('[ProjectService] Response parsed successfully:', {
            success: responseData.success,
            count: responseData.count,
            total_count: responseData.total_count,
            projects_count: responseData.projects?.length || 0,
            limit: responseData.limit,
            offset: responseData.offset
          });
          
          console.groupEnd();
          return responseData as RawProjectsResponse;
          
        } catch (parseError) {
          console.error('[ProjectService] Error parsing JSON:', parseError);
          throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}`);
        }
        
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.log('[ProjectService] Attempt failed:', lastError.message);
        // Continue para próxima tentativa
      }
    }
    
    // Se todas as tentativas falharem
    throw lastError || new Error("All authentication header attempts failed");
    
  } catch (error) {
    console.error('[ProjectService] Error in getRawProjects:', error);
    
    // Adicionar mais informações de debug
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[ProjectService] Network/fetch error. Possible CORS or connectivity issue.');
      console.error('[ProjectService] Verify Python API is running and accessible from Vercel.');
    }
    
    console.groupEnd();
    throw error;
  }
}
