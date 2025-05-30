export default function PersonMovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>Фильмы не указаны</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold font-bold text-black mb-4">Фильмы</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.name || movie.alternativeName || movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}