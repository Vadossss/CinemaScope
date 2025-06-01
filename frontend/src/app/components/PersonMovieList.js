export default function PersonMovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md border border-yellow-100">
        <p>Фильмы не указаны</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-4">Участие в фильмах</h2>
      <ul className="space-y-2">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="bg-gray-50 p-3 text-black 600 rounded-md hover:bg-gray-100 transition"
          >
            <span className="font-medium">
              {movie.name || movie.alternativeName || "Без названия"}
            </span>
            {movie.rating && (
              <span className="ml-2 text-sm text-gray-500">— Рейтинг: {movie.rating}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}