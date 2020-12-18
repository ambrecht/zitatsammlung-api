WITH input AS (
   SELECT '{
      "tablename_a":[{"a_id":1,"b_id":2,"c_id":3}, {"a_id":2,"b_id":51,"c_id":3}]
      }'::json AS j
)
-- Ignore a_id. It's set automatically by PostgreSQL. 
-- Think about cutting it from input.
INSERT INTO table_a (b_id, c_id)
SELECT b_id, c_id
FROM   input i
     , json_populate_recordset(NULL::table_a, i.j->'tablename_a') t