package com.search.backend.models;

import lombok.Getter;

/**
 * Перечисление, представляющее статусы фильма.
 * Каждый статус имеет два представления: на русском и английском языке.
 */
@Getter
public enum MovieStatus {

    /**
     * Статус, когда фильм был анонсирован.
     * Русское название: "анонс", английское название: "announced".
     */
    ANNOUNCED("анонс", "announced"),

    /**
     * Статус, когда фильм завершён.
     * Русское название: "завершён", английское название: "completed".
     */
    COMPLETED("завершён", "completed"),

    /**
     * Статус, когда фильм находится в процессе съемок.
     * Русское название: "в процессе создания", английское название: "filming".
     */
    FILMING("в процессе создания", "filming"),

    /**
     * Статус, когда фильм находится на этапе пост-продакшн.
     * Русское название: "Пост-продакшен", английское название: "post-production".
     */
    POSTPRODUCTION("Пост-продакшен", "post-production"),

    /**
     * Статус, когда фильм находится на этапе предпродакшена.
     * Русское название: "Пре-продакшен", английское название: "pre-production".
     */
    PREPRODUCTION("Пре-продакшен", "pre-production");

    private final String statusRus;
    private final String statusEng;

    /**
     * Конструктор для инициализации значений статуса на русском и английском языках.
     *
     * @param statusRus статус на русском языке
     * @param statusEng статус на английском языке
     */
    MovieStatus(String statusRus, String statusEng) {
        this.statusRus = statusRus;
        this.statusEng = statusEng;
    }

    /**
     * Получить статус по английскому названию.
     * Если совпадение найдено, возвращает соответствующий элемент перечисления.
     *
     * @param statusEng английский статус фильма
     * @return соответствующий статус из перечисления или null, если статус не найден
     */
    public static MovieStatus getStatusEnum(String statusEng) {
        for (MovieStatus statusEnum : MovieStatus.values()) {
            if (statusEnum.getStatusEng().equals(statusEng)) {
                return statusEnum;
            }
        }
        return null;
    }

}
