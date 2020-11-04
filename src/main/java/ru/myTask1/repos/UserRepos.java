package ru.myTask1.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.myTask1.domain.User;


public interface UserRepos extends JpaRepository<User, Long> {
    User findByName(String username);


}
