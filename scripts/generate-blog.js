const https = require('https');
const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '../content/blogs.json');
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY secret not set in GitHub repository.');
  process.exit(1);
}

const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
const existingSlugs = blogs.posts.map(p => p.slug);
const existingTitles = blogs.posts.map(p => p.title.toLowerCase());

const TOPIC_POOL = [
  'How to Write a Compelling Author Bio That Builds Trust',
  'How to Price Your Self-Published Book for Maximum Royalties',
  'How to Get Book Reviews on Amazon: Proven Strategies',
  'Book Launch Strategy for First-Time Authors',
  'How to Build an Author Email List Before Your Book Launches',
  'How to Write a Literary Agent Query Letter',
  'How to Write a Memoir: Step-by-Step Guide',
  "Children's Book Publishing: Complete Guide for New Authors",
  'How to Use Amazon Ads to Sell More Books',
  'How to Write a Business Book That Establishes Authority',
  'How to Find a Literary Agent in 2026',
  'Book Interior Formatting Guide for Self-Publishers',
  'How to Build an Author Website That Converts Visitors',
  'Print on Demand vs Offset Printing for Self-Publishers',
  'How to Use Social Media to Market Your Book',
  'How to Write a Book Faster Without Sacrificing Quality',
  'Nonfiction Book Structure: How to Organize Your Ideas',
  'How to Turn Your Book Into a Speaking Career',
  'How to Write a Book Series: Planning and Execution',
  'How to License Your Book Rights for Passive Income',
  'How to Convert Your Book to an Audiobook in 2026',
  'How to Write a Strong Book Title and Subtitle',
  'How to Use BookTok to Market Your Book',
  'Book Cover Design Principles Every Author Should Know',
  'How to Write a Nonfiction Book Outline That Actually Works',
  'How to Build an Author Brand From Scratch',
  'Kindle Unlimited vs Wide Distribution: Which Is Better',
  'How to Write a Self-Help Book That Sells',
  'How to Market a Book With Zero Budget',
  'How to Get Your Book Into Bookstores',
];

const unusedTopics = TOPIC_POOL.filter(topic => {
  const keywords = topic.toLowerCase().split(' ').slice(3, 7).join(' ');
  return !existingTitles.some(t => t.includes(keywords));
});

const availableTopics = unusedTopics.length > 0 ? unusedTopics : TOPIC_POOL;
const chosenTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
const today = new Date().toISOString().split('T')[0];

const prompt = `You are an expert SEO content writer for "Duck Book Writers", a professional book writing, ghostwriting, and publishing services company.

Write a fully SEO-optimized blog post. Return ONLY raw valid JSON — no markdown, no code fences, no explanation. Just the JSON object.

Topic: ${chosenTopic}
Publish date: ${today}
Target reader: First-time authors, entrepreneurs, and professionals wanting to write or publish a book.

Return this exact JSON structure:
{
  "slug": "seo-friendly-slug-with-year-2026",
  "title": "Full SEO Title Under 65 Characters Including Year",
  "excerpt": "Compelling meta description 150-160 characters with primary keyword and clear value proposition for the reader.",
  "content": "Full blog content as plain text. Paragraphs separated by double newlines. Section headings on their own line followed by double newline then content. No HTML. No markdown symbols."
}

Content requirements:
- 1800 to 2500 words total
- Primary keyword appears in first paragraph, multiple section headings, and conclusion
- 10 to 12 clearly named sections (headings as plain text lines)
- Each section has 2 to 4 substantive paragraphs with specific, actionable advice
- Step-by-step structure where the topic allows it
- Real examples, specific numbers, and concrete recommendations
- Final section naturally mentions Duck Book Writers professional services as a resource
- slug must not match any of these existing slugs: ${existingSlugs.join(', ')}`;

function callClaudeAPI(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 5000,
      messages: [{ role: 'user', content: prompt }],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) return reject(new Error(parsed.error.message));
          resolve(parsed.content[0].text);
        } catch (e) {
          reject(new Error('Failed to parse Claude API response: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`Topic selected: "${chosenTopic}"`);
  console.log('Calling Claude API to generate blog post...');

  const rawText = await callClaudeAPI(prompt);

  let post;
  try {
    post = JSON.parse(rawText.trim());
  } catch {
    // Try extracting JSON if wrapped in extra text
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('No valid JSON found in Claude response.');
    post = JSON.parse(match[0]);
  }

  if (!post.slug || !post.title || !post.excerpt || !post.content) {
    throw new Error('Generated post is missing required fields.');
  }

  // Ensure slug uniqueness
  if (existingSlugs.includes(post.slug)) {
    post.slug = `${post.slug}-${today}`;
  }

  post.date = today;

  blogs.posts.unshift(post);
  fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));

  console.log(`\nPublished successfully!`);
  console.log(`Title : ${post.title}`);
  console.log(`Slug  : /blog/${post.slug}`);
  console.log(`Date  : ${post.date}`);
  console.log(`Words : ~${post.content.split(' ').length}`);
}

main().catch((err) => {
  console.error('Blog generation failed:', err.message);
  process.exit(1);
});
