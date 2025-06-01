package com.search.backend.repositories;

import com.search.backend.models.NewsMongo;
import org.hibernate.query.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;

public interface NewsRepositoryMongo extends MongoRepository<NewsMongo, Long> {


}
