package net.elmardi.orderservice.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import net.elmardi.orderservice.model.Product;

@Entity
@NoArgsConstructor @AllArgsConstructor @Builder @Getter @Setter @ToString
public class ProductItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String productId;
    private double price;
    private int quantity;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Order order;

    @Transient
    private Product product;
}
