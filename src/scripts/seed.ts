import { DB } from './db/db.ts';

async function seed() {
  const db = DB.getInstance();

  await db.exec(`
    INSERT INTO bookmarks (url, title, description, tags) VALUES
      ('https://bun.sh', 'Bun', 'A fast, all-in-one JavaScript runtime', 'runtime, javascript'),
      ('https://github.com', 'GitHub', 'Where the world builds software', 'git, developer'),
      ('https://typescriptlang.org', 'TypeScript', 'JavaScript with syntax for types', 'typescript, types'),
      ('https://sqlite.org', 'SQLite', 'A small, fast, reliable, embedded SQL database engine', 'database'),
      ('https://browserbase.com', 'Browserbase', 'Browser automation made easy', 'automation, browser'),
      ('https://stripe.com', 'Stripe', 'Financial infrastructure for the internet', 'payments, api'),
      ('https://openai.com', 'OpenAI', 'AI that helps you do more amazing things', 'ai, machine-learning')
  `);

  console.log('✅ Database seeded with 7 sample bookmarks');
}

seed().catch(console.error);