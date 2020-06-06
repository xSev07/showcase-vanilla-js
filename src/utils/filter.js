export const getFilters = (courses) => {
  const subjects = new Set();
  const genres = new Set();
  const grades = new Set();

  courses.forEach((it) => {
    subjects.add(it.subject);
    genres.add(it.genre);
    it.grade.forEach((grade) => grades.add(grade));
  });

  const filters = {
    subjects: Array.from(subjects).sort(),
    genres: Array.from(genres).sort(),
    grades: Array.from(grades).sort((a, b) => a - b),
  };

  filters.subjects.unshift(`Все предметы`);
  filters.genres.unshift(`Все жанры`);
  filters.grades.unshift(`Все классы`);

  return filters;
};
