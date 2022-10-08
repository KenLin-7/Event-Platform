package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.model.dto.NotificationDTO;
import com.group3.event_plaza.model.result.NotificationResult;
import com.group3.event_plaza.repository.NotificationRepository;
import com.group3.event_plaza.repository.RegistrationRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.MessageService;
import com.group3.event_plaza.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationImpl implements NotificationService, MessageService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private RegistrationRepository registrationRepository;


    /**
     * Send private notification to user
     * @param email
     */
    @Override
    public void notifyUser(String email,String message) {
        simpMessagingTemplate.convertAndSendToUser(email,
                "/notification",message);

    }

    /**
     * Send notification when event has been updated
     * @param eventId
     * @param message
     */
    @Override
    public void eventNotification(String eventId,String message){
        simpMessagingTemplate.convertAndSend("/event/"+eventId+"/notification",message);
    }


    @Override
    public void create(Notification notification,String email) {
        notification.setRead(false);
        User receiver = userRepository.findByEmail(email);
        notification.setReceiver(receiver);
        notificationRepository.save(notification);
    }


    /**
     * Get user unread notification
     * @param email
     * @return
     */
    @Override
    @Transactional
    public List<NotificationDTO> getAll(String email) {
        int userId = userRepository.findUseIdBYEmail(email);
        List<List<NotificationResult>> resultList = notificationRepository.findAllUnRead(userId);
        List<NotificationDTO> notifications = new ArrayList<>();
        for (List<NotificationResult> notificationResult:resultList) {
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setNotificationId(notificationResult.get(0).getNotification_Id());
            notificationDTO.setReceiver(notificationResult.get(0).getReceiver());
            notificationDTO.setCreatedTime(notificationResult.get(0).getCreated_Time());
            notificationDTO.setMessage(notificationResult.get(0).getMessage());
            notifications.add(notificationDTO);
        }
        return notifications;
    }



    @Override
    public void update(int notificationId) {

    }

    @Override
    public void updateAll(List<Notification> notifications){
        for (Notification notification: notifications) {
            notification.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }



    @Override
    public Integer getCount(String email) {
        int userId = userRepository.findUseIdBYEmail(email);
        return notificationRepository.countByReceiver_UserId(userId);
    }

    @Override
    public void createNotifications(int eventId) {
        // TODO get participant email to save notification
    }

    @Override
    public List<Integer> getUserEvent(String email) {
        Integer userId = userRepository.findUseIdBYEmail(email);
        List<Integer> eventIds = registrationRepository.findUserJoinedEventId(userId);
        return  eventIds;
    }
}
