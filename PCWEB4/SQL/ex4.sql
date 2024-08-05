USE movie_reviews;

--@block
-- 4A.1
SELECT COUNT(*)
FROM reviews
JOIN movies ON reviews.movie_id = movies.movie_id
WHERE movies.movie_name = 'movie1';

--@block
-- 4A.2
SELECT
    reviews.user_id,
    reviews.movie_id,
    reviews.ratings,
    movies.movie_name
FROM reviews
JOIN userinfo ON reviews.user_id = userinfo.user_id
LEFT JOIN movies ON reviews.movie_id = movies.movie_id
WHERE userinfo.username='user1';

--@block
-- 4B
USE company_data;

--@block
-- 4B.1
SELECT
    b.title,
    r.average_rating
FROM books as b
JOIN reviews as r ON b.id = r.book_id;

--@block
-- 4B.2
SELECT
    b.title,
    r.average_rating
FROM books as b
JOIN reviews as r ON b.id = r.book_id
WHERE r.average_rating > 4.4;