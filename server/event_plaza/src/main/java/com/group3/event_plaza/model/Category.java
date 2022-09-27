package com.group3.event_plaza.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int categoryId;

    private String categoryName;

    @OneToMany
    private List<Event> eventList;
}
