/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pinecone } from "@pinecone-database/pinecone";
// import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
// import { modelname, namespace, topK } from "./app/config";
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_TOKEN)
export async function queryPineconeVectorStore(
  client: Pinecone,
  indexName: string,
  namespace: string,
  query: string
): Promise<string> {
  const apiOutput = await hf.featureExtraction({
    model: "mixedbread-ai/mxbai-embed-large-v1",
    inputs: query,
  });
  console.log(apiOutput);
  
  const queryEmbedding = Array.from(apiOutput);
  const index = client.Index(indexName);
  const queryResponse = await index.namespace(namespace).query({
    topK: 5,
    vector: queryEmbedding as any,
    includeMetadata: true,
    includeValues: false
  });

  console.log(queryResponse);
  

  if (queryResponse.matches.length > 0) {
    const concatenatedRetrievals = queryResponse.matches
      .map((match, idx) =>`\nClinical Finding ${idx+1}: \n ${match.metadata?.chunk}`)
      .join(". \n\n");
    return concatenatedRetrievals;
  } else {
    return "<nomatches>";
  }
}