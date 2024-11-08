import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
// export const runtime = 'edge';

export const maxDuration = 60;

export async function POST(req: Request) {
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        model: 'gpt-4o-mini',
        assistant_id: process.env.OPENAI_ASSISTANT_ID
          ? process.env.OPENAI_ASSISTANT_ID
          : '',
        instructions: `
					You are a virtual assistant for JNL Steel, using only information from the website https://jnlsteel.com. Do not use knowledge from anywhere else.
        `,
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);
    }
  );
}
