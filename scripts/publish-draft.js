const fs = require('fs');
const path = require('path');

const draftsDir = path.join(__dirname, '../content/drafts');
const blogsPath = path.join(__dirname, '../content/blogs.json');

const draftFiles = fs.readdirSync(draftsDir)
  .filter(f => f.endsWith('.json'))
  .sort();

if (draftFiles.length === 0) {
  console.log('No drafts to publish — queue is empty.');
  process.exit(0);
}

const nextDraftFile = draftFiles[0];
const draftPath = path.join(draftsDir, nextDraftFile);
const draft = JSON.parse(fs.readFileSync(draftPath, 'utf-8'));

// Set publish date to today
const today = new Date().toISOString().split('T')[0];
draft.date = today;

const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));
blogs.posts.unshift(draft);
fs.writeFileSync(blogsPath, JSON.stringify(blogs, null, 2));

fs.unlinkSync(draftPath);

console.log(`Published: "${draft.title}" on ${today}`);
console.log(`Drafts remaining: ${draftFiles.length - 1}`);
