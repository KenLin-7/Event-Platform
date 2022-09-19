package com.group3.event_plaza.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "User")
 public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @Column(name = "user_id")
    private int userId;

    private String nickname;

    private String email;

    private String password;

    private String gender;

    private int phone;

    private Date dob;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
//    @JoinTable(name = "user_role",
//                joinColumns = {@JoinColumn(name = "user_id")},
//                inverseJoinColumns = {@JoinColumn(name = "role_id")}
//    )
    private List<Role> roles = new ArrayList<>();

    public User() {
    }

    public User(String nickname, String email, String password, String gender, int phone, Date dob) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.phone = phone;
        this.dob = dob;
    }

    public User(String nickname,String email,String password, int phone){
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", nickname='" + nickname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", gender='" + gender + '\'' +
                ", phone=" + phone +
                ", dob=" + dob +
                '}';
    }
}
