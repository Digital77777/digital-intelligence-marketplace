import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { toolId } = req.query;

  if (!toolId || typeof toolId !== 'string') {
    return res.status(400).json({ error: 'Tool ID is required' });
  }

  try {
    const apiKey = await getApiKey(toolId as string);
    if (apiKey) {
      res.status(200).json({ apiKey });
    } else {
      res.status(404).json({ error: 'API Key not found' });
    }
  } catch (error: any) {
    console.error('Error getting API key:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

async function getApiKey(toolId: string): Promise<string | null> {
  try {
    const url = 'http://localhost:3000/api/access_mcp_resource?server_name=api-key-server&uri=apikey:///' + toolId;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('HTTP error! status: ' + response.status);
      return null;
    }

    const data = await response.json();

    if (data && data.contents && data.contents.length > 0) {
      return data.contents[0].text || null;
    }

    return null;
  } catch (error: any) {
    console.error('Error fetching API key from MCP server:', error);
    return null;
  }
}
