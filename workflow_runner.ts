import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Triggers a GitHub Actions workflow via the workflow_dispatch event.
 * @param owner - The repository owner (e.g., 'octocat')
 * @param repo - The repository name (e.g., 'hello-world')
 * @param workflowFileName - The workflow file name (e.g., 'main.yml')
 * @param githubToken - GitHub personal access token with 'repo' and 'workflow' scopes
 * @param ref - The git reference (branch or tag) to run the workflow on (e.g., 'main')
 * @param inputs - Optional inputs for the workflow
 */
export async function triggerGithubWorkflow({
  owner,
  repo,
  workflowFileName,
  githubToken,
  ref,
  inputs = {}
}: {
  owner: string;
  repo: string;
  workflowFileName: string;
  githubToken: string;
  ref: string;
  inputs?: Record<string, any>;
}): Promise<void> {
  const data = JSON.stringify({ ref, inputs });

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${owner}/${repo}/actions/workflows/${workflowFileName}/dispatches`,
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'workflow-runner-script',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  await new Promise<void>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Failed to trigger workflow: ${res.statusCode} ${res.statusMessage} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Example usage:
if (require.main === module) {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN not set in .env file');
  }
  triggerGithubWorkflow({
    owner: 'anurag-d-ctk', // TODO: replace with actual owner
    repo: 'jsons',      // TODO: replace with actual repo
    workflowFileName: 'test.yml', // TODO: replace with actual workflow file name
    githubToken,
    ref: 'main',            // TODO: replace with actual branch or tag
    inputs: {}              // TODO: add workflow inputs if needed
  }).then(() => {
    console.log('Workflow triggered successfully');
  }).catch(err => {
    console.error('Error triggering workflow:', err);
  });
}

// Note: Install 'node-fetch' and 'dotenv' if not already present:
// npm install node-fetch dotenv
