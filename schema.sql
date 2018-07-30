CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) ,
    price DECIMAL(10,2),
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Espresso Maker','HOME & KITCHEN',125.45,32),
	('Laptop 14inch','Electronics',699.00,250),
    ('Wireless Mouse','Electronics',12.49,50),
    ('Tablet Bag','Electronics', 9.49,25),
    ('27inch HD Monitor','Electronics',159.00,17),
    ('Solar Lights Outdoor','Outdoor & Garden',23.96,42),
    ('Wooden Handle Tool Set','Outdoor & Garden',19.99,31),
    ('Outdoor Dining Set','Outdoor & Garden',575.99,9),
    ('Japanese Matcha Whisk','HOME & KITCHEN',13.55,16),
    ('Iced Coffee and Tea Brewing System','HOME & KITCHEN',34.55,27);