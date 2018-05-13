DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	("Phone Case", "Cell phones & Accesories", 13.59, 100),
	("Sunglasses", "Clothes, Shoes & Jewlry", 19.95, 56),
	("The Girl on the Train: A Novel", "Books", 3.99, 65),
	("Echo Dot", "Devices", 39.99, 80),
	("Bluetooth Headphones", "Cell phones & Accesories", 14.99, 40),
	("Food Storage Containers", "Home & Kitchen", 19.70, 18),
	("LED String Lights", "Garden & Outdoor", 10.39, 105),
	("Hammock", "Sports & Outdoors", 23.95, 91),
	("Argan Oil", "Beauty & Personal Care", 11.99, 12),
	("Projector", "Office Products", 129.99, 39);


