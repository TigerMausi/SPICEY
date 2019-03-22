DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiver INT NOT NULL REFERENCES users(id),
    sender INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
