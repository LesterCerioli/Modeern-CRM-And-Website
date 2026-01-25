
import { startApiKeepAlive } from './services/keepAliveService';


process.on('uncaughtException', (error) => {
    console.error('🚨 [Main] UNCAUGHT EXCEPTION:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
    
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 [Main] UNHANDLED REJECTION:', reason);
});


async function startService() {
    console.log('='.repeat(60));
    console.log('🚀 [Main] STARTING KEEP-ALIVE SERVICE');
    console.log('='.repeat(60));
    console.log(`📅 Started at: ${new Date().toLocaleString()}`);
    console.log(`🖥️  Platform: ${process.platform} ${process.arch}`);
    console.log(`⚙️  Node.js: ${process.version}`);
    console.log('='.repeat(60));

    try {
        
        console.log('🔄 [Main] Starting keep-alive service...');
        await startApiKeepAlive();
    } catch (error) {
        console.error('💥 [Main] Keep-alive service stopped unexpectedly:', error);
        
        
        console.log('🔄 [Main] Restarting service in 1 minute...');
        setTimeout(() => {
            console.log('🔄 [Main] Attempting restart now...');
            startService();
        }, 60000);
    }
}


setInterval(() => {
    console.log(`❤️  [Main] Service heartbeat - ${new Date().toLocaleString()}`);
    
    
    const memoryUsage = process.memoryUsage();
    const usedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const totalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    console.log(`🧠 [Main] Memory: ${usedMB}MB / ${totalMB}MB`);
}, 5 * 60 * 1000); // Every 5 minutes


startService().catch(error => {
    console.error('💥 [Main] CRITICAL FAILURE during startup:', error);
    
    
    setTimeout(() => {
        console.log('🔄 [Main] Attempting to bootstrap again...');
        startService();
    }, 120000);
});


process.on('SIGTERM', () => {
    console.log('🛑 [Main] Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 [Main] Received SIGINT, shutting down...');
    process.exit(0);
});