<?php defined('BASEPATH') or exit('No direct script access allowed'); ?>
<html>
	<head>
		<title>Cart Info</title>
	</head>
	<body>
		<h3>Cart Info</h3>
        <table border="1" cellpadding="2" cellspacing="2">
        	<tr>
        		<th>Id</th>
        		<th>Name</th>
        		<th>Photo</th>
        		<th>Price</th>
        		<th>Quantity</th>
        		<th>Sub Total</th>
        		<th>Action</th>
        	</tr>
        	<?php foreach ($items as $item) { ?>
        		<tr>
        			<td><?php echo $item['id']; ?></td>
        			<td><?php echo $item['name']; ?></td>
        			<td><img src="<?php echo base_url() ?>assets/images/<?php echo $item['photo']; ?>" width="50"></td>
        			<td><?php echo $item['price']; ?></td>
        			<td><?php echo $item['quantity']; ?></td>
        			<td><?php echo $item['price'] * $item['quantity']; ?></td>
        			<td align="center">
        				<a href="<?php echo site_url('cart/remove/'.$item['id']); ?>">X</a>
        			</td>
        		</tr>
        	<?php } ?>
        		<tr>
        			<td colspan="6" align="right">Total</td>
        			<td><?php echo $total; ?></td>
        		</tr>
        </table>
        <br>
        <a href="<?php echo site_url('product'); ?>">Continue Shopping</a>
	</body>
</html>