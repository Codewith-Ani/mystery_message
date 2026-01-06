import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const prompt =
			'Create three open-ended and engaging questions for an anonymous social messaging platform like Qooh.me. Use universal, friendly themes and avoid personal or sensitive topics.';

		const controller = new AbortController();
		req.signal.addEventListener('abort', () => controller.abort());

		const result = streamText({
			model: openai('gpt-5.2-chat-latest'),
			maxOutputTokens: 400,
			temperature: 0.3,
			messages: [
				{
					role: 'system',
					content:
						"Output exactly three questions in a single line separated by ' || '. No extra text.",
				},
				{ role: 'user', content: prompt },
			],
		});

		return result.toTextStreamResponse();
	} catch (error) {
		return new Response(
			JSON.stringify({ error: 'Failed to generate response' }),
			{ status: 500 }
		);
	}
}
