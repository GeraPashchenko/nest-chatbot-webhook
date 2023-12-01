export const configuration = () => ({
  application: {
    port: parseInt(process.env.PORT, 10) || 3000,
    throttlerTTL: process.env.THROTTLE_TTL,
    throttlerLimit: process.env.THROTTLE_LIMIT,
  },
  openaiApi: {
    openapiKey: process.env.OPENAI_API_KEY,
  },
});
