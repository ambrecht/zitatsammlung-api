create table zitate (
  id int not null auto_increment,
  created_at timestamp default current_timestamp(),
  updated_at timestamp default current_timestamp(),
  body varchar(5000) not null default '',
  seitenzahl int,
  buch_id int,
  autor_id int,
  user_id int,
  primary key (id)
);
create table autoren (
  id int not null auto_increment,
  icon varchar(50),
  vorname varchar(50) not null,
  nachname varchar(50) not null,
  geburt date,
  tod date,
  primary key (id)
);
create table buecher (
  id int not null auto_increment,
  titel varchar(50) not null,
  jahr int not null,
  verlag varchar(50) not null,
  autor_id int,
  primary key (id)
);
create table hashtags (
  id int not null auto_increment,
  created_at timestamp,
  tag varchar(50) not null,
  primary key (id)
);
create table hash2zitat (
  id int not null auto_increment,
  zitat_id int,
  hashtag_id int,
  primary key (id)
);
create table user (
  id int not null auto_increment,
  created_at timestamp,
  updated_at timestamp,
  username varchar(50) not null default '',
  bio varchar(500) not null default '',
  avatar varchar(200) not null default '',
  primary key (id)
);
create table kommentare (
  id int not null auto_increment,
  text varchar(5000) not null,
  created_at timestamp default current_timestamp(),
  updated_at timestamp default current_timestamp(),
  username_id int,
  primary key (id)
);
create table kommentar2zitat (
  id int not null auto_increment,
  zitat_id int,
  kommentar_id int,
  primary key (id)
);
alter table zitate
  add foreign key (buch_id)
  references buecher (id) on delete cascade;
alter table zitate
  add foreign key (autor_id)
  references autoren (id) on delete cascade;
alter table zitate
  add foreign key (user_id)
  references user (id);
alter table buecher
  add foreign key (autor_id)
  references autoren (id) on delete cascade;
alter table hash2zitat
  add foreign key (zitat_id)
  references zitate (id) on delete cascade;
alter table hash2zitat
  add foreign key (hashtag_id)
  references hashtags (id) on delete cascade;
alter table kommentare
  add foreign key (username_id)
  references user (id) on delete cascade;
alter table kommentar2zitat
  add foreign key (zitat_id)
  references zitate (id) on delete cascade;
alter table kommentar2zitat
  add foreign key (kommentar_id)
  references kommentare (id) on delete cascade;