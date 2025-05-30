export default function PersonHeader({ person }) {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 items-start mb-8">
      {/* Фото */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          src={(person.photo || "/base_poster.svg").replace("https:https://", "https://")}
          alt={person.name}
          className="w-72 h-auto rounded-xl shadow-md object-cover"
        />
      </div>

      {/* Имя и англ. имя */}
      <div className="flex-1">
        <h1 className="font-bold text-black text-[50px]">
          {person.name || person.enName}
        </h1>
        {person.name && person.enName && (
          <p className="text-gray-600 italic text-xl mb-4">
            {person.enName}
          </p>
        )}
      </div>
    </div>
  );
}