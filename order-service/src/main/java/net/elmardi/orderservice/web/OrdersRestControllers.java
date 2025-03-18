package net.elmardi.orderservice.web;

import net.elmardi.orderservice.entities.Order;
import net.elmardi.orderservice.repository.OrderRepository;
import net.elmardi.orderservice.restClients.InventoryRestClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api")

public class OrdersRestControllers {
    private OrderRepository orderRepository;
    private InventoryRestClient inventoryRestClient;

    public OrdersRestControllers(OrderRepository orderRepository, InventoryRestClient inventoryRestClient) {
        this.orderRepository = orderRepository;
        this.inventoryRestClient = inventoryRestClient;
    }

    @GetMapping("/orders")
    public List<Order> findAllOrders() {
        List<Order> AllOrders = orderRepository.findAll();
        AllOrders.forEach(o->{
            o.getProductItems().forEach(productItem -> {
                productItem.setProduct(inventoryRestClient.findProductById(productItem.getProductId()));
            });
        });
        return AllOrders;
    }

    @GetMapping("/orders/{id}")
    public Order findOrderById(@PathVariable String id) {
        Order order = orderRepository.findById(id).get();
        order.getProductItems().forEach(productItem -> {
            productItem.setProduct(inventoryRestClient.findProductById(productItem.getProductId()));
        });
        return order;
    }
}
