package net.elmardi.orderservice.model;

import lombok.*;

@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;
}
