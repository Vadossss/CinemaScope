export default function PersonBody({ person }) {
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("ru-RU") : "Неизвестно";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
      <p><strong>Пол:</strong> {person.sex || "Неизвестно"}</p>
      <p><strong>Рост:</strong> {person.growth ? `${person.growth} см` : "Неизвестно"}</p>
      <p><strong>Дата рождения:</strong> {formatDate(person.birthday)}</p>
      <p><strong>Возраст:</strong> {person.age ?? "Неизвестно"}</p>
      {person.death && <p><strong>Дата смерти:</strong> {formatDate(person.death)}</p>}
      {person.deathPlace?.length > 0 && (
        <p><strong>Место смерти:</strong> {person.deathPlace.map(p => p.name).join(", ")}</p>
      )}
      {person.spouses?.length > 0 && (
        <p><strong>Супруги:</strong> {person.spouses.map(s => s.name).join(", ")}</p>
      )}
      <p><strong>Награды:</strong> {person.countAwards ?? "Нет данных"}</p>
      {person.profession?.length > 0 && (
        <p><strong>Профессии:</strong> {person.profession.map(p => p.value).join(", ")}</p>
      )}

      {person.facts?.length > 0 && (
        <div className="col-span-full mt-4">
          <h3 className="font-semibold text-lg mb-2">Интересные факты:</h3>
          <ul className="list-disc list-inside space-y-1 pl-4">
            {person.facts.map((fact, i) => (
              <li key={i}>{fact.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}