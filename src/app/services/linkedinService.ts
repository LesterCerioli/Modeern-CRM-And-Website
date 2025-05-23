import axios from "axios";
import dotenv from "dotenv";

/**
 * Interface for data user returned by LinkedIn
 */
interface LinkedInUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}


const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID as string;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI as string;

/**
 * Change authorization code by access token
 */
export async function exchangeLinkedInCodeForToken(code: string): Promise<string> {
  const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await axios.post(tokenUrl, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data.access_token;
}

/**
 * Find data from Linkedin profile
 */
export async function getLinkedInUserData(accessToken: string): Promise<LinkedInUser> {
  const profileUrl = "https://api.linkedin.com/v2/me";
  const emailUrl = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";

  const headers = { Authorization: `Bearer ${accessToken}` };


  const [profileResponse, emailResponse] = await Promise.all([
    axios.get(profileUrl, { headers }),
    axios.get(emailUrl, { headers }),
  ]);

  return {
    id: profileResponse.data.id,
    first_name: profileResponse.data.localizedFirstName,
    last_name: profileResponse.data.localizedLastName,
    email: emailResponse.data.elements[0]["handle~"].emailAddress,
  };
}
