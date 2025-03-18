package net.elmardi.orderservice;

import net.elmardi.orderservice.entities.Order;
import net.elmardi.orderservice.entities.OrderState;
import net.elmardi.orderservice.entities.ProductItem;
import net.elmardi.orderservice.model.Product;
import net.elmardi.orderservice.repository.OrderRepository;
import net.elmardi.orderservice.repository.ProductItemRepository;
import net.elmardi.orderservice.restClients.InventoryRestClient;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(
			OrderRepository orderRepository,
			ProductItemRepository productItemRepository,
			InventoryRestClient inventoryRestClient
	) {
		return args -> {
			//List<Product> allProducts = inventoryRestClient.getAllProducts();

			List<String> productsIds = List.of("P01", "P02", "P03");

			for (int i = 0; i < 5; i++){
				Order order = Order.builder()
						.id(UUID.randomUUID().toString())
						.date(LocalDate.now())
						.state(OrderState.PENDING)
						.build();

				Order savedOrder = orderRepository.save(order);

				productsIds.forEach(productId->{
					ProductItem productItem = ProductItem.builder()
							.productId(productId)
							.quantity(new Random().nextInt(10))
							.price(Math.random()*600+100)
							.order(savedOrder)
							.build();
					productItemRepository.save(productItem);
				});
			}
		};
	}
}
