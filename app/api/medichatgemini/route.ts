/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Pinecone } from "@pinecone-database/pinecone";
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Message, StreamData, streamText } from "ai";
// import { queryPineconeVectorStore } from "@/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

// const pinecone = new Pinecone({
//     apiKey: process.env.PINECONE_API_KEY ?? "",
// });

const google = createGoogleGenerativeAI({
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    apiKey: process.env.GEMINI_API_KEY
});

const model = google('models/gemini-1.5-flash', { // gemini-1.5-pro-latest
    safetySettings: [
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
});

// async function ensureNamespaceExists(indexName: string, namespace: string) {
//     try {
//         // Check if the namespace contains any vectors by querying it
//         const queryResult = await pinecone.index(indexName).query({
//             topK: 1,
//             vector: [0], // Use a zero vector as a placeholder for the query
//             namespace: namespace,
//         } as any);

//         // If no matches are found, upsert a placeholder vector to create the namespace
//         if (!queryResult.matches || queryResult.matches.length === 0) {
//             await pinecone.index(indexName).upsert({
//                 namespace: namespace,
//                 vectors: [{ id: 'placeholder', values: [0] }] // Placeholder vector
//             } as any);
//             console.log(`Namespace '${namespace}' created with a placeholder vector.`);
//         } else {
//             console.log(`Namespace '${namespace}' already exists.`);
//         }
//     } catch (error) {
//         console.error("Error ensuring namespace:", error);
//     }
// }

export async function POST(req: Request) {
    const reqBody = await req.json();
    console.log(reqBody);

    const messages: Message[] = reqBody.messages;
    const userQuestion = `${messages[messages.length - 1].content}`;

    const reportData: string = reqBody.data.reportData;
    // const query = `Represent this for searching relevant passages: patient medical report says: \n${reportData}. \n\n${userQuestion}`;

    // await ensureNamespaceExists('index-one', 'ns1');

    // const retrievals = await queryPineconeVectorStore(pinecone, 'index-one', "ns1", query);


    //     Here is a summary of a patient's clinical report, and a user query. Some generic clinical findings are also provided that may or may not be relevant for the report.
    //   Go through the clinical report and answer the user query.
    //   Ensure the response is factually accurate, and demonstrates a thorough understanding of the query topic and the clinical report.
    //   Before answering you may enrich your knowledge by going through the provided clinical findings. 
    //   The clinical findings are generic insights and not part of the patient's medical report. Do not include any clinical finding if it is not relevant for the patient's case.

    //   \n\n**Patient's Clinical report summary:** \n${reportData}. 
    //   \n**end of patient's clinical report** 

    //   \n\n**User Query:**\n${userQuestion}?
    //   \n**end of user query** 

    //   \n\n**Generic Clinical findings:**
    //   \n\n${retrievals}. 
    //   \n\n**end of generic clinical findings** 

    //   \n\nProvide thorough justification for your answer.
    //   \n\n**Answer:**

    const finalPrompt = `Let's answer a user's question about a patient's clinical report in a friendly and easy-to-understand way.
Go through the patient's clinical report and provide a response that is both accurate and considerate, directly addressing the user's question.
  
Use any relevant medical knowledge to clarify points, but keep it specific to this patient’s case and avoid including unrelated clinical details. 
Remember to avoid any personal details, like the user's or patient's name, and keep the focus on the clinical insights.

\n\n**Patient's Clinical Report Summary:**\n${reportData}.\n**End of Clinical Report** 

\n\n**User's Question:**\n${userQuestion}?\n**End of User's Question** 

Respond thoughtfully, in a warm and conversational tone, as if speaking directly to the user.

\n\n**Answer:**`;

    const data = new StreamData();
    // data.append({
    //     retrievals: retrievals
    // });

    const result = await streamText({
        model: model,
        prompt: finalPrompt,
        onFinish() {
            data.close();
        }
    });

    return result.toDataStreamResponse({ data });
}
