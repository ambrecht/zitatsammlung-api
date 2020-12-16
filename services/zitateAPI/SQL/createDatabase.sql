CREATE TABLE autoren (
    id SERIAL PRIMARY KEY NOT NULL,
    icon varchar(50),
    vorname varchar(50) NOT NULL,
    nachname varchar(50) NOT NULL,
    geburt date,
    tod date
);
CREATE TABLE buecher (
    id SERIAL PRIMARY KEY NOT NULL,
    titel varchar(50) NOT NULL,
    jahr INTEGER NOT NULL,
    verlag varchar(50) NOT NULL,
    autor_id INTEGER REFERENCES autoren (id) ON DELETE CASCADE
);
CREATE TABLE hashtags (
    id SERIAL PRIMARY KEY NOT NULL,
    created_at timestamp,
    tag varchar(50) NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    username varchar(50) NOT NULL DEFAULT '',
    bio varchar(500) NOT NULL DEFAULT '',
    avatar varchar(200) NOT NULL DEFAULT ''
);
CREATE TABLE zitate (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body_text varchar(5000) NOT NULL DEFAULT '',
    seitenzahl INTEGER,
    buch_id INTEGER REFERENCES buecher (id) ON DELETE CASCADE,
    autor_id INTEGER REFERENCES autoren (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id)
);
CREATE TABLE hash2zitat (
    id SERIAL PRIMARY KEY,
    zitat_id INTEGER REFERENCES zitate (id) ON DELETE CASCADE,
    hashtag_id INTEGER REFERENCES hashtags (id) ON DELETE CASCADE
);
CREATE TABLE kommentare (
    id SERIAL PRIMARY KEY NOT NULL,
    text varchar(5000) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    username_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE kommentar2zitat (
    id SERIAL PRIMARY KEY,
    zitat_id INTEGER REFERENCES zitate (id) ON DELETE CASCADE,
    kommentar_id INTEGER REFERENCES kommentare (id) ON DELETE CASCADE
);