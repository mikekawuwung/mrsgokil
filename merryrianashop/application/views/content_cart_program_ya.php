<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    $base_url = base_url();

    ?>
    <!DOCTYPE html>
    <head>
    <title>Merry Riana Shop</title>
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<meta content="ie=edge" http-equiv="x-ua-compatible">
	
	<link href="<?php echo base_url(); ?>assets/img/LOGO-M1.png" rel="shortcut icon">
	<link href="<?php echo base_url(); ?>assets/img/LOGO-M1.png" rel="apple-touch-icon">
	<link href="https://fast.fonts.net/cssapi/175a63a1-3f26-476a-ab32-4e21cbdb8be2.css" rel="stylesheet" type="text/css">
	<link href="<?php echo base_url(); ?>assets/bower_components/select2/dist/css/select2.min.css" rel="stylesheet">

	<link href="<?php echo base_url(); ?>assets/bower_components/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/dropzone/dist/dropzone.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/datatables/datatables.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/collapse/collapse.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/css/main.css?version=3.3" rel="stylesheet">

	<link href="http://localhost/mrrv3/assets/icon_fonts_assets/picons-thin/style.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<script src="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.css">


	<link href="<?= base_url('assets/icon_fonts_assets/font-awesome/css/font-awesome.min.css') ?>" rel="stylesheet">
	<style>
		.projects-list .project-head{
			padding:11px 40px;
		}

		.merahhati{
			color: #ae0001;
		}

		.bgmerahhati{
			background-color: #ae0001;
		}

		.borbgmerahhati{
			background-color: #ae0001;
			border-color: #ae0001;
		}

        .fbnya{
        border-color:#3b5998;
        background-color:#3b5998;
        }
        
        .twitternya{
            border-color:#1DA1F2;
            background-color:#1DA1F2;
        }
        
        .whatsappnya{
            border-color:#25d366;
            background-color:#25d366;
        }

        .instagramnya{
            border-color:#C13584;
            background-color:#C13584;
        }

        .downloadnya{
            border-color:#ae0001;
            background-color:#ae0001;
        }

        .element-wrapper .element-inner-header{
        
        }

        #tab_videonya{
            margin-top:167px;
        }

		body:before{
			background: linear-gradient(to right, #ae0001,#4d4d4d) !important;
		}

		#example_wrapper div.row {
			width: 100%;
		}

		select.form-control:not([size]):not([multiple]) {
			height: 40px;
		}

		input.form-control.blue:disabled {
			background-color: #d9edf7;
			border-color: #b7ddf0;
			color: #31708f;
			font-weight: bold;
			padding: 50px 10px 50px 10px;
			font-size: 3em;
			text-align: center;
		}

		input.form-control.red:disabled {
			background-color: #f2dede;
			border-color: #e6c1c1;
			color: #a94442;
			font-weight: bold;
			padding: 50px 10px 50px 10px;
			font-size: 3em;
			text-align: center;
		}

		input.form-control.warning:disabled {
			background-color: #fbf5d6;
			border-color: #f6eaa8;
			color: #8a6d3b;
			font-weight: bold;
			padding: 50px 10px 50px 10px;
			font-size: 3em;
			text-align: center;
		}

		input.form-control.success:disabled {
			background-color: #dff0d8;
			border-color: #c7e5bb;
			color: #3c763d;
			font-weight: bold;
			padding: 50px 10px 50px 10px;
			font-size: 3em;
			text-align: center;
		}

		div.value i.os-icon:hover {
			font-size: 2rem;
			cursor: pointer;
		}

		div.logout a {
			color: #a94442;
		}

		div.value a:hover {
			text-decoration: none;
		}

		.menu-mobile ul.main-menu>a li span {
			padding: 1rem;
			display: block;
			-webkit-box-flex: 1;
			-ms-flex: 1;
			flex: 1;
			transition: all 0.2s ease;
		}
	</style>

	<!-- Global Site Tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-88366516-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'UA-88366516-1');
	</script>

	<script src="<?php echo base_url(); ?>assets/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="<?php echo base_url(); ?>assets/datatables/datatables.min.js"></script>
	<!-- <script src="<?php echo base_url(); ?>assets/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script> -->
	<script type="text/javascript" class="init">
		$(document).ready(function() {
			$('#example').DataTable();
		});
	</script>

<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=627962924646381&ev=PageView&noscript=1"
/></noscript>
</head>

<body>
	<div class="all-wrapper menu-top">
		<div class="layout-w">
	<!--================== START - Menu top ==================-->
		<div class="desktop-menu menu-top-w menu-activated-on-hover">
				<div class="menu-top-i">
					<div class="logo-w">
						<a class="logo" href="<?= base_url('online_program_ya'); ?>"><img src="<?php echo base_url(); ?>assets/logo.png" style="width:50px;"></a>
					</div>
				
					<div class="logged-user-w">
						<ul class="main-menu">
						 <!--   <li class="menu float-left" style="color:#fa163f; border-right: none;">-->
							<!--	<a href="<?php echo base_url('merchandise'); ?>">-->
							<!--	<div class="icon-w mt-2">-->
							<!--		<div class="os-icon os-icon-delivery-box-2"></div>-->
							<!--	</div><span>Merchandise</span></a>-->
							<!--</li>-->
							<li class="menu float-left" style="color:#fa163f; border-right: none;">
								<a href="<?php echo base_url('online_program_ya'); ?>">
								<div class="icon-w">
									<div class="fa fa-dropbox merahhati"></div>
								</div><span>Program</span></a>
							</li>
							<li class="menu float-left" style="color:#fa163f; border-right: none;">
								<a href="<?php echo base_url('cartprogramya/list_chart'); ?>">
								<div class="icon-w">
									<div class="fa fa-shopping-cart"></div>
								</div><span class="count">Cart : <?= $jumlah; ?>  </span></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
<!--================== END - Menu top ==================-->

<!--================== START - Mobile Menu ==================-->
		<div class="menu-mobile menu-activated-on-click color-scheme-dark">
			<div class="mm-logo-buttons-w">
				<span>Merry Riana Shop</span>
				<div class="mm-buttons">
					<div class="content-panel-open">
						<div class="os-icon os-icon-grid-circles"></div>
					</div>
					<div class="mobile-menu-trigger">
						<div class="os-icon os-icon-hamburger-menu-1"></div>
					</div>
				</div>
			</div>
			<div class="menu-and-user">
				<ul class="main-menu">
				 <!--   <li class="sub-menu">-->
					<!--	<a href="<?php echo base_url('merchandise') ?>">-->
					<!--	<div class="icon-w">-->
					<!--		<div class="os-icon os-icon-delivery-box-2"></div>-->
					<!--	</div><span>Merchandise</span></a>							-->
					<!--</li>	-->
					<li class="menu">
						<a href="<?php echo base_url('online_program_ya'); ?>">
						<div class="icon-w">
							<div class="fa fa-dropbox"></div>
						</div><span>Program</span></a>							
					</li>
					<li class="menu">
						<a href="<?php echo base_url('cartprogramya/list_chart'); ?>">
						<div class="icon-w">
							<div class="fa fa-shopping-cart"></div>
						</div><span>Cart : <?= $jumlah; ?></span></a>		
					</li>
				</ul>
			</div>
		</div>
		<!--================== END - Mobile Menu ==================-->		
<div class="content-w">
    <div class="content-i">
        <div class="content-box">
            <div class="row">
                <div class="col-md-12">
                    <div class="element-wrapper">
                        <div class="element-box">
                        	<!-- <div class="element-info">
                        		<a href="#" onclick="window.history.go(-1)" class="btn btn-default btn-sm borbgmerahhati text-white"><i class="icofont-undo text-white"></i>
                        			Kembali
                        		</a>
							</div> -->
							<div class="table-responsive">
								<table class="table table-striped table-hovered">
									<thead class="bgmerahhati text-white">
				                        <tr class="text-left">
				                            <!-- <th class="text-center">Id</th> -->
				                            <!-- <th class="text-center">Image</th> -->
				                            <th class="text-center">Program</th>
				                            <th class="text-center">Quantity</th>
				                            <th class="text-center" style="display:none;">Size</th>
				                            <th class="text-center">Price</th>
				                            <th class="text-center">Subtotal</th>
				                            <th class="text-center">Action</th>
				                        </tr>
				                    </thead>
				                    <tbody>
										<form method="post" action="<?= base_url('cartprogramya/update'); ?>">
										<?php 
											if(!empty($items)){
											$index = 0;
														
											foreach($items as $row){
										?>
				                        <tr class="text-center">
				                        	<!-- <td><?= $row['id']; ?></td> -->
				                            <!-- <td><img src="https://dummyimage.com/50x50/55595c/fff" /></td> -->
				                            <td><?= $row['program_name']; ?></td>
				                            <!-- start here validasi sd -->
											<?php if($row['id'] == 23) { ?>
											<td>
												<!-- <?php //echo $row['quantity']; ?>  -->
												<a href="<?= base_url('cartprogramya/remove_one/' . $row['id']);?>" class="btn bgmerahhati text-white btn-sm">-</a> 
												<?php // echo $row['quantity']; ?> 
													<input id="uintTextBox" type="number" name="count<?= $index; ?>" min="1" max="<?php echo floor(($total - ($row['quantity']*$row['price']))/200000); ?>" value="<?= $row['quantity']; ?>"></input> 
												<?php if($row['quantity'] < floor(($total - ($row['quantity']*$row['price']))/200000)) { ?>
												<a href="<?= base_url('cartprogramya/add_one/' . $row['id']);?>" class="btn bgmerahhati text-white btn-sm">+</a>
											<?php } ?>
											</td>
											<?php } else { ?>
				                            <td>
												<!-- <a href="<?= base_url('cartprogramya/remove_one/' . $row['id']);?>" class="btn bgmerahhati text-white btn-sm">-</a>  -->
												<?php // echo $row['quantity']; ?> 
													<input id="uintTextBox" type="number" name="count<?= $index; ?>" min="1" max="99" value="<?= $row['quantity']; ?>"></input> 
												<!-- <a href="<?= base_url('cartprogramya/add_one/' . $row['id']);?>" class="btn bgmerahhati text-white btn-sm">+</a> -->
											</td>
											<?php } ?>
											<!-- end here validasi sd -->
											<td style="display:none;">
												<!-- start here size atas-->
												<?php if($row['kategori'] == 'clothing') { ?>
												<select id="size" name="size<?= $index; ?>">
													<option value="XS" <?php echo ($row['size'] == "XS") ? "selected" : "" ?>>XS</option>
													<option value="S" <?php echo ($row['size'] == "S") ? "selected" : "" ?>>S</option>
													<option value="M" <?php echo ($row['size'] == "M") ? "selected" : "" ?>>M</option>
													<option value="L" <?php echo ($row['size'] == "L") ? "selected" : "" ?>>L</option>
													<option value="XL" <?php echo ($row['size'] == "XL") ? "selected" : "" ?>>XL</option>
													<option value="XXL" <?php echo ($row['size'] == "XXL") ? "selected" : "" ?>>XXL</option>
												</select>
												<?php } else { ?>
													<select id="size" name="size<?= $index; ?>" style="display:none;">
														<option value=""></option>
													</select>
												<?php } ?>
												<!-- end here size bawah-->
											</td>
				                            <td>Rp. <?= number_format($row['price']); ?></td>  
				                            <td class="text-center">Rp. <?= number_format($row['quantity']*$row['price']); ?></td>
				                            <td class="text-center">
												<!-- <a href="<?php echo site_url('cartprogramya/removeitem/'.$row['id']); ?>"><i class="fa fa-trash merahhati"></i></a> -->
												<a href="<?php echo site_url('cartprogramya/removeitem/'.$row['id']); ?>" style="color: red;" >Hapus Program</a>
				                            </td>
											<input type="hidden" name="jumlah" value=<?= $index + 1; ?>>
											<input type="hidden" name="id<?= $index; ?>" value=<?= $row['id'] ?>>
				                        </tr>
										<?php  $index++; } } ?>
				                        <tr>
				                            <td></td>
				                            <!-- <td></td> -->
				                            <td></td>
				                            <tdstyle="display:none;"></td>
				                            <td></td>
				                            <td class="text-center">Total</td>
				                            <td class="text-center">Rp. <?= number_format($total) ?></td>
				                            <td></td>
				                        </tr>
				                        <?php 
											if(!empty($items)){
										?>
										<tr>
				                            <td></td>
				                            <!-- <td></td> -->
				                            <td></td>
				                            <tdstyle="display:none;"></td>
				                            <td></td>
				                            <td></td>
				                            <td class="text-center"><button type="submit" class="btn btn-sm bgmerahhati text-white">Update Jumlah</button></td>
				                            <td></td>
				                        </tr>
				                        <?php } ?>
				                        </form>
				                    </tbody>
								</table>
							</div>
                        </div>
                    </div>
                </div>
                <div class="col mb-1">
		            <div class="row">
		                <div class="col-md-6">
							<a href="<?= base_url('online_program_ya'); ?>">
		                    	<button class="btn btn-md btn-block borbgmerahhati text-white text-uppercase">Continue Shopping</button>
		                	<a>
						</div>
		                <div class="col-md-6 text-right">
							<a href="<?= base_url('cartprogramya'); ?>">
		                    	<button class="btn btn-md btn-block borbgmerahhati text-white text-uppercase">Checkout</button>
		                	</a>
						</div>
		            </div>
		        </div>
            </div>
        </div>
    </div>
</div>
</div>
<div class="display-type"></div>
</div>
<script src="<?php echo base_url(); ?>assets/bower_components/moment/moment.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/chart.js/dist/Chart.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/select2/dist/js/select2.full.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/ckeditor/ckeditor.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap-validator/dist/validator.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/dropzone/dist/dropzone.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/editable-table/mindmup-editabletable.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/tether/dist/js/tether.min.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/util.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/alert.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/button.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/carousel.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/collapse.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/dropdown.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/modal.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/tab.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/tooltip.js"></script>
<script src="<?php echo base_url(); ?>assets/bower_components/bootstrap/js/dist/popover.js"></script>
<script src="<?php echo base_url(); ?>assets/js/main.js?version=3.3"></script>
<link href="<?php echo base_url(); ?>assets/jquery-ui-datepicker/jquery-ui.min.css" rel="stylesheet">
<link href="<?php echo base_url(); ?>assets/jquery-ui-datepicker/jquery-ui.theme.css" rel="stylesheet">
<script src="<?php echo base_url(); ?>assets/jquery-ui-datepicker/jquery-ui.min.js"></script>
<script type="text/javascript">
	$(function () {
	    // $("#example1").DataTable();
	    $('#example-cart').DataTable({
	      "paging": true,
	      "lengthChange": false,
	      "searching": true,
	      "ordering": true,
	      "info": true,
	      "autoWidth": false,
	    });
	  });
</script>
</body>
</html>