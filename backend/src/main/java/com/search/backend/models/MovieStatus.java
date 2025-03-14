package com.search.backend.models;

import lombok.Getter;

@Getter
public enum MovieStatus {
    ANNOUNCED("анонс", "announced"),
    COMPLETED("завершён", "completed"),
    FILMING("", "filming"),
    POSTPRODUCTION("Пост-продакшен", "post-production"),
    PREPRODUCTION("Пре-продакшен", "pre-production");

    private final String statusRus;
    private final String statusEng;

    MovieStatus(String statusRus, String statusEng) {
        this.statusRus = statusRus;
        this.statusEng = statusEng;
    }

    public static MovieStatus getStatusEnum(String statusEng) {
        for (MovieStatus statusEnum : MovieStatus.values()) {
            if (statusEnum.getStatusEng().equals(statusEng)) {
                return statusEnum;
            }
        }
        return null;
    }

}
