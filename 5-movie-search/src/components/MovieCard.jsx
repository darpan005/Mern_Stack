import noimage from "../assets/no-image.webp"

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : noimage
        }
        alt= {movie.Poster !== "N/A" ? movie.Title : "No Poster Available"}

        onError={(e)=>{
          e.target.src = noimage;
        }}
      />

      <h3>{movie.Title}</h3>

      <p>{movie.Year}</p>

      <p>{movie.Type}</p>
    </div>
  );
}

export default MovieCard;