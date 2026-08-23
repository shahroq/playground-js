CREATE TABLE IF NOT EXISTS newsletters (
  id SERIAL PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing', -- processing | completed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_sends (
  id SERIAL PRIMARY KEY,
  newsletter_id INTEGER NOT NULL REFERENCES newsletters(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'pending', -- pending | sent | failed
  error TEXT,
  sent_at TIMESTAMPTZ
);