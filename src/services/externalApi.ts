export async function getExternalToken() {
    const API_URL = process.env.LTS_US_API_BASE_URL;
    const CLIENT_ID = 'lts_a7f_5202l';
    const CLIENT_SECRET = 'k9Hp4$mQ!2vN6rT1';

    const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        })
    });
    if (!response.ok) {
        throw new Error("Failed to authenticate with external API");
    }
    return response.json();
}
