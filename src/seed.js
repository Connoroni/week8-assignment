// Not running anything from here, just putting in sql queries that I'm running in supabase

//! Creating tables
// CREATE TABLE IF NOT EXISTS posts (
//     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     username VARCHAR(255),
//     timestamp TIMESTAMP,
//     post_title VARCHAR(255),
//     post_image TEXT
//   );

//   CREATE TABLE IF NOT EXISTS comments (
//     id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//     username VARCHAR(255),
//     timestamp TIMESTAMP,
//     comment_text VARCHAR(255),
//     post_id INT REFERENCES posts(id)
//   );

//! Inserting dummy data (each one run separately)
// INSERT INTO posts (username, timestamp, post_title, img)
// VALUES ('John Smith', current_timestamp, 'Lovely Orangutan Photo', 'https://www.agoodplace.co.uk/images/tut-tut2.jpg');
// INSERT INTO posts (username, timestamp, post_title, img)
// VALUES ('Connor', current_timestamp, 'Hull Scenery', 'https://www.planetware.com/photos-large/ENG/england-hull-the-deep.jpg');

// INSERT INTO comments (username, timestamp, comment_text, post_id)
// VALUES ('Tony', current_timestamp, 'That is such a cute orangutan!', 1);
// INSERT INTO comments (username, timestamp, comment_text, post_id)
// VALUES ('Alison', current_timestamp, 'Lovely photo, my dude', 2);
// INSERT INTO comments (username, timestamp, comment_text, post_id)
// VALUES ('Monkey_Lover', current_timestamp, 'I like monkeys. :)', 1);
// INSERT INTO comments (username, timestamp, comment_text, post_id)
// VALUES ('U. R. Rong', current_timestamp, 'Umm actually, orangutans are apes not monkeys...', 1);

//! Example selects
//? Selecting all posts for the posts page (very simple)
// SELECT * FROM posts

//? Selecting comments matching the post's id
// SELECT * FROM comments WHERE post_id = 1;
// in the actual query it will be something like:
// `SELECT * FROM comments WHERE post_id = $1`, [params.id]
