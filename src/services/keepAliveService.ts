import { getExternalToken } from "./externalApi";



const MINUTE_IN_MS = 60 * 1000;
const INTERVAL_MINUTES = 2; // Render geralmente desliga após 15min, 2min é bem seguro.

export async function startApiKeepAlive() {
    console.log(`[Keep-Alive] Iniciando monitoramento da API externa a cada ${INTERVAL_MINUTES} minutos...`);

    
    while (true) {
        try {
            const data = await getExternalToken();
            console.log(`[Keep-Alive] Ping realizado com sucesso: ${new Date().toISOString()}`);
            
        } catch (error) {
            console.error(`[Keep-Alive] Erro ao tentar acordar a API:`, error instanceof Error ? error.message : error);
        }

        
        await new Promise(resolve => setTimeout(resolve, INTERVAL_MINUTES * MINUTE_IN_MS));
    }
}