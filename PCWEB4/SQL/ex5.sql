USE bikeshare;

--@block
-- 5.1
SELECT * FROM stations ORDER BY name;

--@block
-- 5.2
SELECT 
    trip_id,
    duration
FROM trips
WHERE duration > 500
ORDER BY duration DESC;

--@block
-- 5.3
SELECT
    start_date,
    start_station
FROM trips
WHERE bike_id = 450
ORDER BY start_date, start_station;