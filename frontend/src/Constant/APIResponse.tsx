export interface APIResponse {
  result: { isAdmin: any };
  token: string;
}

export function checkAuthentication(responseString: string | null): boolean {
  if (!responseString) {
    return false;
  }

  try {
    const apiResponse: APIResponse = JSON.parse(responseString);
    const { token } = apiResponse;
    return !!token;
  } catch (error) {
    console.error('Failed to parse API response:', error);
    return false;
  }
}

export function checkAdmin(responseString: string | null): boolean {
  if (!responseString) {
    return false;
  }

  try {
    const apiResponse: APIResponse = JSON.parse(responseString);
    const { isAdmin } = apiResponse.result;
    return !!isAdmin;
  } catch (error) {
    console.error('Failed to parse API response:', error);
    return false;
  }
}