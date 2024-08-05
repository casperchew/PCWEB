USE company_data;

--@block
-- 6
SELECT * FROM employees WHERE salary > 90000;

--@block
-- 7
SELECT
    e.emp_id,
    e.name,
    c.client_id,
    c.client_name,
    w.total_sales
FROM employees as e
JOIN works_with as w ON e.emp_id = w.emp_id
JOIN clients as c ON w.client_id = c.client_id;