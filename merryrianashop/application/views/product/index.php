<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<html>
	<head>
		<title>Product List</title>
	</head>
	<body>
		<h3>Product List</h3>
        <table border="1" cellpadding="2" cellspacing="2">
        	<tr>
        		<th>Id</th>
        		<th>Name</th>
        		<th>Photo</th>
        		<th>Status</th>
        		<th>Description</th>
        		<th>Price</th>
        		<th>Quantity</th>
        		<th>Sub Total</th>
        		<th>Action</th>
        	</tr>
        	<?php foreach ($products as $product) { ?>
        		<tr>
        			<td><?php echo $product->id; ?></td>
        			<td><?php echo $product->name; ?></td>
        			<td><img src="<?php echo base_url(); ?>assets/images/<?php echo $product->photo; ?>" width="50"></td>
        			<td><?php echo $product->status ? 'active' : 'inactive'; ?></td>
        			<td><?php echo $product->description; ?></td>
        			<td><?php echo $product->price; ?></td>
        			<td><?php echo $product->quantity; ?></td>
        			<td><?php echo $product->price * $product->quantity; ?></td>
        			<td>
        				<a href="<?php echo site_url('cart/buy/'.$product->id); ?>">Buy Now</a>
        			</td>
        		</tr>
        	<?php } ?>
        </table>
	</body>
</html>