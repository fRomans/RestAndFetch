package ru.myTask1.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.myTask1.domain.Role;
import ru.myTask1.domain.User;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface UserService {

     List<User> findAllService();

     void saveService(User user) ;

     void deleteByIdService(Long id);

     String UserPasswEncoderService(String password) ;


     User UserUpdateService(User user, Set<Role> role) ;

     User findByUserName(String username) ;



     UserDetails loadUserByUsername(String username) throws UsernameNotFoundException ;

     Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) ;

}
