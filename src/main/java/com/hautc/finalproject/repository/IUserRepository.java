package com.hautc.finalproject.repository;

import com.hautc.finalproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IUserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    User findByUsernameAndEnabled(String userName, short enabled);

    @Query("SELECT u FROM User u WHERE u.id = ?1")
    User findByUserById(Integer id);

    void deleteById(Integer id);

    List<User> findByUsernameContaining(String username);

    @Transactional
    @Modifying
    @Query("UPDATE User u set u.password = ?1 where username = ?2")
    void changePassword(String password, String username);
}
