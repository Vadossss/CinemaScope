export default function PersonHeader({ person }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Фото */}
      <div className="">
        <img
          src={(person.photo || "/base_poster.svg").replace("https:https://",  "https://")} 
          alt={person.name}
          loading="lazy"
          className="w-72 h-auto rounded-xl shadow-md object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Имя и англ. имя */}
      <div className="flex-1">
        <h1 className="font-bold text-black text-4xl md:text-5xl">{person.name || person.enName}</h1>
        {person.name && person.enName && person.name !== person.enName && (
          <p className="text-gray-600 italic text-xl mt-2">или {person.enName}</p>
        )}
      </div>
    </div>
  );
}