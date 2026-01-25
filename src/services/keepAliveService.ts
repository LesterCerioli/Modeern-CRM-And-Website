import { getExternalToken } from "./externalApi";

const MINUTE_IN_MS = 60 * 1000;
const INTERVAL_MINUTES = 4; // IMPORTANT: Change to 4 minutes! (Render sleeps after 15)
const REQUEST_TIMEOUT = 60000; // Increase to 60 seconds (Render takes time to wake up)
const MAX_RETRIES = 3;

export async function startApiKeepAlive() {
    console.log(`🔔 [Keep-Alive] Starting Python API monitoring`);
    console.log(`⏰ Interval: ${INTERVAL_MINUTES} minutes`);
    console.log(`⏱️ Timeout: ${REQUEST_TIMEOUT/1000} seconds`);
    console.log(`🔄 Retries: ${MAX_RETRIES}`);
    console.log(`📅 Start: ${new Date().toISOString()}`);

   
    let successfulPings = 0;
    let failedPings = 0;
    let lastSuccessTime: Date | null = null;

    const pingApi = async (retryCount = 0): Promise<boolean> => {
        console.log(`🔄 [Keep-Alive] Attempt ${retryCount + 1} - ${new Date().toLocaleTimeString()}`);
        
        return new Promise(async (resolve) => {
            const timeoutId = setTimeout(() => {
                console.log(`⏰ [Keep-Alive] Timeout after ${REQUEST_TIMEOUT}ms in attempt ${retryCount + 1}`);
                resolve(false);
            }, REQUEST_TIMEOUT);

            try {
                const data = await getExternalToken();
                clearTimeout(timeoutId);
                
                successfulPings++;
                lastSuccessTime = new Date();
                
                console.log(`✅ [Keep-Alive] SUCCESS! ${new Date().toLocaleTimeString()}`);
                console.log(`📊 Statistics: ${successfulPings} successes, ${failedPings} failures`);
                
                if (data?.token) {
                    console.log(`🔑 Token obtained: ${data.token.substring(0, 15)}...`);
                }
                
                resolve(true);
                
            } catch (error) {
                clearTimeout(timeoutId);
                failedPings++;
                
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error(`❌ [Keep-Alive] ERROR in attempt ${retryCount + 1}: ${errorMessage}`);
                
                // If there are still retries, try again
                if (retryCount < MAX_RETRIES - 1) {
                    const retryDelay = 10000; // 10 seconds
                    console.log(`🔄 Trying again in ${retryDelay/1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    return pingApi(retryCount + 1).then(resolve);
                }
                
                resolve(false);
            }
        });
    };

    
    while (true) {
        try {
            console.log(`\n🎯 [Keep-Alive] Starting cycle - ${new Date().toLocaleString()}`);
            
            const success = await pingApi();
            
            if (!success) {
                console.error(`⚠️ [Keep-Alive] All ${MAX_RETRIES} attempts failed in this cycle!`);
                
            }
            
            
            const nextRun = new Date(Date.now() + INTERVAL_MINUTES * MINUTE_IN_MS);
            console.log(`⏭️ [Keep-Alive] Next ping scheduled for: ${nextRun.toLocaleTimeString()}`);
            console.log(`📈 Total statistics: ${successfulPings} ✅ | ${failedPings} ❌`);
            
            
            
            
        } catch (error) {
            console.error(`💥 [Keep-Alive] CRITICAL ERROR in loop:`, error);
            
        }

        
        const waitTime = INTERVAL_MINUTES * MINUTE_IN_MS;
        console.log(`😴 [Keep-Alive] Waiting ${INTERVAL_MINUTES} minutes...\n`);
        
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }
}


export function getKeepAliveStatus() {
    return {
        service: "API Keep-Alive",
        status: "running",
        timestamp: new Date().toISOString(),
        description: "Keeping Python API awake on Render"
    };
}