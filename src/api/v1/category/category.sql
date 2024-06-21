/*
    @name getCategoryIdBySlug
*/
SELECT id
FROM category
WHERE slug = :slug;
