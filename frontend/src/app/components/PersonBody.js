export default function PersonBody({ person }) {
  return (
    <div className="mb-6 space-y-3 text-gray-700">
      <p><strong>Пол:</strong> {person.sex || "Неизвестно"}</p>
      <p><strong>Рост:</strong> {person.growth || "Неизвестно"}</p>
      <p>
        <strong>День рождения:</strong>{" "}
        {person.birthday ? new Date(person.birthday).toISOString().split("T")[0] : "Неизвестно"}
      </p>
      <p><strong>Возраст:</strong> {person.age || "Неизвестно"}</p>
      {person.death && <p><strong>Дата смерти:</strong> {person.death}</p>}


      {person.deathPlace?.length > 0 && (
        <p><strong>Место смерти:</strong> {person.deathPlace.map(place => place.name).join(", ")}</p>
      )}

      {person.spouses?.length > 0 && (
        <p><strong>Супруги:</strong> {person.spouses.map(spouse => spouse.name).join(", ")}</p>
      )}

      <p><strong>Награды:</strong> {person.countAwards || "Нет данных"}</p>

      {person.profession?.length > 0 && (
        <p><strong>Профессии:</strong> {person.profession.map(p => p.value).join(", ") || "-"}</p>
      )}

      {person.facts?.length > 0 && (
        <div>
          <strong>Факты:</strong>
          <ul className="list-disc list-inside">
            {person.facts.map((fact, index) => (
              <li key={index}>{fact.value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}