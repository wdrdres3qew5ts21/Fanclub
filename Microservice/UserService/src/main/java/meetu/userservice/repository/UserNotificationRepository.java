/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package meetu.userservice.repository;

import meetu.userservice.model.UserNotification;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Test
 */
public interface UserNotificationRepository extends MongoRepository<UserNotification, String> {
    
}
