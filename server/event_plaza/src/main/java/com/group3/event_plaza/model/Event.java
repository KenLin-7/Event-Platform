package com.group3.event_plaza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Event {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventId;

    private String description;

    private int maxParticipant;

    private String status;

    private String image;

    private String title;

    private String location;

    private Timestamp startDate;

    @ManyToOne
    @JoinColumn(name = "owner")
    @JsonIgnoreProperties(value = "registrations")

    private User owner;

    @OneToMany(mappedBy = "event",fetch = FetchType.LAZY)
    @JsonIgnoreProperties("role")
    private List<Registration> registrationList;

    private String categoryName;


    public Event(String description, int maxParticipant, String status, String image,
                 String title, String location, Timestamp startDate, String categoryName) {
        this.description = description;
        this.maxParticipant = maxParticipant;
        this.status = status;
        this.image = image;
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.categoryName = categoryName;
    }

    public Event() {
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMaxParticipant() {
        return maxParticipant;
    }

    public void setMaxParticipant(int maxParticipant) {
        this.maxParticipant = maxParticipant;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }


    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Registration> getRegistrationList() {
        return registrationList;
    }

    public void setRegistrationList(List<Registration> registrationList) {
        this.registrationList = registrationList;
    }


//    @Override
//    public String toString() {
//        return "Event{" +
//                "eventId=" + eventId +
//                ", description='" + description + '\'' +
//                ", maxParticipant=" + maxParticipant +
//                ", status='" + status + '\'' +
//                ", image='" + image + '\'' +
//                ", title='" + title + '\'' +
//                ", location='" + location + '\'' +
//                ", startDate=" + startDate +
//                ", owner=" + owner +
//                ", category=" + category +
//                ", registrationList=" + registrationList +
//                '}';
//    }
}
