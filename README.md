=> Change the DB cred in dev.env file before running

::API doc link::

http://localhost:2100/apidoc/


********************************************************

::Run the server::
 
```
npm run start:dev
```


*******************************************************


::SQL Script(SQL Server DB)::


```
CREATE database store ;
use store;

create table store.dbo.product(
	id int identity(1,1) primary key,
	name varchar(100) not null,
	description varchar(500),
	price decimal(15,4) not null,
	make int,
	created_at datetime default getdate(),
	updated_at datetime default getdate(),
	deleted_at datetime
);

create table store.dbo.cart(
	id int identity(1,1) primary key,
	user_id int not null,
	product_id int not null,
	created_at datetime default getdate(),
	updated_at datetime default getdate(),
	deleted_at datetime
);

create table store.dbo.buyer(
	id int identity(1,1) primary key,
	name varchar(100),
	email varchar(200) not null,
	password varchar(100) not null,
	created_at datetime default getdate(),
	updated_at datetime default getdate(),
	deleted_at datetime
);

ALTER TABLE store.dbo.cart 
ADD CONSTRAINT FK_buyer_cart
FOREIGN KEY (user_id) 
REFERENCES store.dbo.buyer(id);

ALTER TABLE store.dbo.cart 
ADD CONSTRAINT FK_product_cart
FOREIGN KEY (product_id) 
REFERENCES store.dbo.product(id);

INSERT into  store.dbo.buyer (buyer.name,buyer.email,buyer.password) 
values ('Raj Malhotra','raj@yopmail.com','test@123');

INSERT into store.dbo.product (name,description, price, make)
values
('Acer Nitro', 'A gaming laptop', 75999.00, 2019),
('Macbook Pro', 'A everyday performance laptop', 150000.00, 2020);
```
