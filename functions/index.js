SELECT title, domestic_sales, international_sales 
FROM movies
  JOIN boxoffice
    ON movies.id = boxoffice.movie_id;

    // This is for inner join where values from multiple tables need to have matching values:
    // https://sqlbolt.com/lesson/select_queries_with_joins 