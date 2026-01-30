import "dotenv/config";
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
    const vectorStoreId = "vs_697bfdc85e608191910e209f6a259a51";
    console.log("✅ Using Vector Store:", vectorStoreId);

    const filePaths = [
        "knowledge-base/services.md",
        "knowledge-base/faq.md",
        "knowledge-base/contact.md",
    ];

    for (const p of filePaths) {
        if (!fs.existsSync(p)) {
            throw new Error(`No encuentro el archivo: ${p}`);
        }
    }

    const fileStreams = filePaths.map((p) => fs.createReadStream(p));

    // ✅ En esta versión del SDK hay que pasar { files: [...] }
    const batch = await client.vectorStores.fileBatches.uploadAndPoll(
        vectorStoreId,
        { files: fileStreams }
    );

    console.log("✅ File batch status:", batch.status);
    console.log("✅ File counts:", batch.file_counts);
    console.log("\n🎯 LISTO. Tu VECTOR_STORE_ID es:", vectorStoreId);
}

main().catch((err) => {
    console.error("❌ Error:", err?.response?.data || err);
    process.exit(1);
});
