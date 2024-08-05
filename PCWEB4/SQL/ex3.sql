USE book_review;

--@block
-- 3A.1
SELECT
	genre,
	AVG(year)
FROM books
GROUP BY genre;

--@block
-- 3A.2
SELECT
	genre,
	MAX(year)
FROM books
GROUP BY genre;

--@block
-- 3A.3
SELECT
	genre,
	MIN(year)
FROM books
GROUP BY genre;

--@block
-- 3A.4
SELECT * FROM books ORDER BY year DESC;

--@block
-- 3A.5
SELECT * FROM books ORDER BY year DESC, author;

--@block
-- 3A.6
SELECT genre, year FROM books ORDER BY genre, year DESC;

--@block
-- book_reviews
INSERT INTO books (title, author, year, genre, sub_genre)
VALUES ('book1', 'author1', 2024, 'genre1', 'sub_genre1');
INSERT INTO books (title, author, year, genre, sub_genre)
VALUES ('book2', 'author2', 2024, 'genre2', 'sub_genre2');

--@block
UPDATE books SET year = 2025 WHERE title = 'book1' OR title = 'book2';

--@block
DELETE FROM books WHERE title = 'book1' OR title = 'book2';

--@block
-- movies_reviews
USE movie_reviews;

--@block
SELECT movie_name FROM movies WHERE movie_name LIKE '%2';

--@block
SELECT movie_name FROM movies WHERE movie_name LIKE '%ovi%';

--@block
SELECT movie_name FROM movies WHERE movie_name LIKE 'm%';

--@block
SELECT * FROM userinfo WHERE password LIKE '%p%';