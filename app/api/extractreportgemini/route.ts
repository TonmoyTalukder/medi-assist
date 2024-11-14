import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyAF5SpnZ4DcRZHx5eOSmcItQhmAWZeucA8");
// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const prompt = `Attached is an image of a clinical report. 
Go over the the clinical report and identify biomarkers that show slight or large abnormalities. Then summarize in 120 words. You may increase the word limit if the report has multiple pages. Do not output patient's personal details like name, date etc and hospital details, you have to strictly maintain this. Make sure to include numerical values and key details from the report, including report title.: `;

export async function POST(req: Request) {
    const { base64 } = await req.json();
    const filePart = fileToGenerativePart(base64)

    const generatedContent = await model.generateContent([prompt, filePart]);

    const textResponse = generatedContent.response.candidates![0].content.parts[0].text;
    return new Response(textResponse, { status: 200 })
}

function fileToGenerativePart(imageData: string) {
    return {
        inlineData: {
            data: imageData.split(",")[1],
            mimeType: imageData.substring(
                imageData.indexOf(":") + 1,
                imageData.lastIndexOf(";")
            ),
        },
    }
}