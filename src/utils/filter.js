export const getFilters = (courses) => {
  const subjects = new Set();
  const genres = new Set();
  const grades = new Set();

  courses.forEach((it) => {
    subjects.add(it.subject);
    genres.add(it.genre);
    it.grades.forEach((grade) => grades.add(grade));
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

export const FilterType = {
  SUBJECT: `subject`,
  GENRE: `genre`,
  GRADE: `class`,
  SEARCH: `search`,
};

export const getCoursesByFilter = (courses, filterType, filterValue) => {
  if (filterValue.toLowerCase().startsWith(`все `) || filterValue === ``) {
    return courses;
  }

  switch (filterType) {
    case FilterType.SUBJECT:
      return courses.filter((it) => it.subject === filterValue);
    case FilterType.GENRE:
      return courses.filter((it) => it.genre === filterValue);
    case FilterType.GRADE:
      return courses.filter((it) => it.grades.includes(filterValue));
    case FilterType.SEARCH:
      const searchString = filterValue.toLowerCase();
      return courses.filter((it) => it.title.toLowerCase().includes(searchString));
    default:
      return courses;
  }
};
