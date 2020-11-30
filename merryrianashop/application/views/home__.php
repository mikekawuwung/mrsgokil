<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$base_url = base_url();

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
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

	<script src="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.css">
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<style type="text/css" id="enject"></style>

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
		
		// start here size
		function open_modal_size(id) {
			// let id = document.getElementById("product_id").value;
			$('#id_merch').trigger("reset");
			$('#id_merch').val(id);

			$('#modalSize').modal('show');
			
			var clothing = [11, 12, 13, 15, 16, 17, 31, 34, 35, 36, 37, 38, 54, 43, 42, 68, 69, 70, 71];
			var kosong = [15, 42, 16];
			var hoodie = [31, 34, 35, 36, 37, 38, 54];
			
			
    			 //   $('#size').append('<option value="XS">XS</option>');
    			 //   $('#size').append('<option value="S">S</option>');
    			 //   $('#size').append('<option value="M">M</option>');
    			 //   $('#size').append('<option value="L">L</option>');
    			 //   $('#size').append('<option value="XL">XL</option>');
    			 //   $('#size').append('<option value="XXL">XXL</option>');
    			 
    	    $('#size').empty();
			
			if(kosong.includes(id)) {
			    if(id == 15) {
    			    $('#size').append('<option value="S">S</option>');
			    } else if(id == 42) {
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="XL">XL</option>');
			    } else if(id == 16) {
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="M">M</option>');
    			    $('#size').append('<option value="L">L</option>');
			    }
			} else if(id == 17) {
    			    $('#size').append('<option value="S">S</option>');
			} else if(hoodie.includes(id)) {
			    if(id == 54) {
    			    $('#size').append('<option value="XS">XS</option>');
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="M">M</option>');
    			    $('#size').append('<option value="L">L</option>');
    			    $('#size').append('<option value="XL">XL</option>');
    			    $('#size').append('<option value="XXL">XXL</option>');
			    } else {
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="M">M</option>');
    			    $('#size').append('<option value="L">L</option>');
    			    $('#size').append('<option value="XL">XL</option>');
    			    $('#size').append('<option value="XXL">XXL</option>');
			    }
			} else if(id == 68 || 69 || 70 || 71) {
    			    $('#size').append('<option value="XS">XS</option>');
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="M">M</option>');
    			    $('#size').append('<option value="L">L</option>');
    			    $('#size').append('<option value="XL">XL</option>');
    			    $('#size').append('<option value="XXL">XXL</option>');
			    } else {
    			    $('#size').append('<option value="XS">XS</option>');
    			    $('#size').append('<option value="S">S</option>');
    			    $('#size').append('<option value="M">M</option>');
    			    $('#size').append('<option value="L">L</option>');
    			    $('#size').append('<option value="XL">XL</option>');
			}

			var newurl = "<?php echo site_url('cart/buy/'); ?>" + id;
			$('#set_url').attr('href', newurl);
		}

		function send() {
			id = $('#id_merch').val();
			var newurl = "<?php echo site_url('cart/buy/'); ?>" + id;

			var size = document.getElementById("size");
			var ukuran = size.options[size.selectedIndex].value;

			var newurl = "<?php echo site_url('cart/buy/'); ?>" + id + "?Ukuran=" + ukuran;
			window.location.href = newurl;
		}
		// end here size
	</script>
  </head>
  <body>
	<div class="all-wrapper menu-top">
		<div class="layout-w">

		<!--================== START - Menu top ==================-->
		<div class="desktop-menu menu-top-w menu-activated-on-hover">
				<div class="menu-top-i">
					<div class="logo-w">
						<a class="logo" href="<?= base_url('product'); ?>"><img src="<?php echo base_url(); ?>assets/logo.png" style="width:50px;"></a>
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
								<a href="<?php echo base_url('product'); ?>">
								<div class="icon-w">
									<div class="fa fa-dropbox merahhati"></div>
								</div><span>Product</span></a>
							</li>
							<li class="menu float-left" style="color:#fa163f; border-right: none;">
								<a href="<?php echo base_url('cart/list_chart'); ?>">
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
						<a href="<?php echo base_url('product'); ?>">
						<div class="icon-w">
							<div class="fa fa-dropbox"></div>
						</div><span>Product</span></a>							
					</li>
					<li class="menu">
						<a href="<?php echo base_url('cart/list_chart'); ?>">
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
				<div class="col-sm-12">
				<div class="element-wrapper">
					<div class="element-box">
						<div class="element-info">
							<div class="row align-items-center">
								<div class="col-sm-8">
									<div class="element-info-with-icon">
									<div class="element-info-icon">
										<div class="fa fa-dropbox merahhati"></div>
									</div>
									<div class="element-info-text">
									   <h5 class="element-inner-header">Merchandise</h5>
										<div class="element-inner-desc">
										Yuk selalu termotivasi dengan Product Miss Merry riana.
										</div>
									</div>
									</div>
								</div>
							</div>
						</div>
					<div class='row'>
    					<div class='col-md-12'>
    					    <p class='w-100 h-100 text-center' style='background-color: #ae0001; color: #fff; font-size: 22px; font-weight: 500'><label class='mt-3'>Produk Terbaru</label></p>
    					</div>
					</div>
					<hr>
					
					<!-- Baris ke-1 -->
					<div class="row">
						<?php 
						// if(!empty($products)){
						
						foreach($products_uptodate as $product){
						?>
						<div class="col-md-3" id="main">
							<div class="card-group">
							<div class="card" style="margin-bottom:10px;">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>"><img class="card-img-top" src="<?= base_url('assets/img/merchandise/'. $product->img); ?>" alt=""/></a>
								<div class="card-body">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>">
									<p class="card-title merahhati" style="font-weight:bold; font-size:13px;">
									    <?php if($product->stock != 0) {?>
									        <?= $product->merch_name ?>
									    <?php } else { ?>
									        <?= "[Pre-Order] " . $product->merch_name ?>
									    <?php } ?>
									</p>
								</a>
								<!--<p><?= $product->deskripsi ?></p>-->
								<!-- <p class="element-inner-header" style="font-size:20px"><b>Rp <?php echo number_format($row->price) ?></b></p> -->
								</div>
								<div class="card-footer borbgmerahhati" style="font-weight: 400;outline: none;color: #fff;">
								    <!-- start here size -->
									<?php if($product->kategori == 'clothing') { ?>
										<!-- <input type="hidden" id="product_id" value="<?php //echo $product->id; ?>"> -->
										<button type="button" id="button_add" onclick="open_modal_size(<?= $product->id; ?>)" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									<?php } else { ?>
									<a href="<?php echo site_url('cart/buy/'.$product->id); ?>">
										<button type="button" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									</a>
									<?php } ?>
									<!-- end here size -->
								<!--<a href="<?php// echo site_url('cart/buy/'.$product->id); ?>">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-left">-->
								<!--		<i class="fa fa-shopping-cart"></i> Add to Cart-->
								<!--	</button>-->
								<!--</a>-->
								<!--<a href="#">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-right">Rp. <?= number_format($product->price) ?></button>-->
								<!--</a>-->
                                    <font style="font-size: 15px; color: #fff;  font-weight: 600" class="float-right">Rp. <?= number_format($product->price) ?></font>								
								</div>
							</div>
							</div>
						</div>
						<?php 
						// }
						} 
						?>
					</div>
					
					<hr>
					
					<div class='row'>
    					<div class='col-md-12'>
    					    <p class='w-100 h-100 text-center' style='background-color: #ae0001; color: #fff; font-size: 22px; font-weight: 500'><label class='mt-3'>Produk Terlaris</label></p>
    					</div>
					</div>
					
					<hr>
					
					<!-- Baris ke-2 -->
					<div class="row">
						<?php 
						// if(!empty($products)){
						
						foreach($products_populer as $product){
						?>
						<div class="col-md-3" id="main">
							<div class="card-group">
							<div class="card" style="margin-bottom:10px;">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>"><img class="card-img-top" src="<?= base_url('assets/img/merchandise/'. $product->img); ?>" alt=""/></a>
								<div class="card-body">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>">
									<p class="card-title merahhati" style="font-weight:bold; font-size:13px;">
									    <?php if($product->stock != 0) {?>
									    <?= $product->merch_name ?>
									    <?php } else { ?>
									    <?= "[Pre-Order] " . $product->merch_name ?>
									    <?php } ?>
									</p>
								</a>
								<!--<p><?= $product->deskripsi ?></p>-->
								<!-- <p class="element-inner-header" style="font-size:20px"><b>Rp <?php echo number_format($row->price) ?></b></p> -->
								</div>
								<div class="card-footer borbgmerahhati" style="font-weight: 400;outline: none;color: #fff;">
								    <!-- start here size -->
									<?php if($product->kategori == 'clothing') { ?>
										<!-- <input type="hidden" id="product_id" value="<?php //echo $product->id; ?>"> -->
										<button type="button" id="button_add" onclick="open_modal_size(<?= $product->id; ?>)" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									<?php } else { ?>
									<a href="<?php echo site_url('cart/buy/'.$product->id); ?>">
										<button type="button" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									</a>
									<?php } ?>
									<!-- end here size -->
								<!--<a href="<?php// echo site_url('cart/buy/'.$product->id); ?>">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-left">-->
								<!--		<i class="fa fa-shopping-cart"></i> Add to Cart-->
								<!--	</button>-->
								<!--</a>-->
								<!--<a href="#">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-right">Rp. <?= number_format($product->price) ?></button>-->
								<!--</a>-->
								<font style="font-size: 15px; color: #fff;  font-weight: 600" class="float-right">Rp. <?= number_format($product->price) ?></font>
								</div>
							</div>
							</div>
						</div>
						<?php 
						// }
						} 
						?>
					</div>

					<hr>
					
					<div class='row'>
    					<div class='col-md-12'>
    					    <p class='w-100 h-100 text-center' style='background-color: #ae0001; color: #fff; font-size: 22px; font-weight: 500'><label class='mt-3'>Semua Product</label></p>
    					</div>
					</div>
					
					<hr>

					<!-- Baris ke-3 -->
					<div class="row">
						<?php 
						// if(!empty($products)){
						
						foreach($products as $product){
						?>
						<div class="col-md-3" id="main">
							<div class="card-group">
							<div class="card" style="margin-bottom:10px;">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>"><img class="card-img-top" src="<?= base_url('assets/img/merchandise/'. $product->img); ?>" alt=""/></a>
								<div class="card-body">
								<a href="<?= base_url('product/detail?id=' . $product->id) ?>">
									<p class="card-title merahhati" style="font-weight:bold; font-size:13px;">
									    <?php if($product->stock != 0) {?>
									    <?= $product->merch_name ?>
									    <?php } else { ?>
									    <?= "[Pre-Order] " . $product->merch_name ?>
									    <?php } ?>
									</p>
								</a>
								<!--<p><?= $product->deskripsi ?></p>-->
								<!-- <p class="element-inner-header" style="font-size:20px"><b>Rp <?php echo number_format($row->price) ?></b></p> -->
								</div>
								<div class="card-footer borbgmerahhati" style="font-weight: 400;outline: none;color: #fff;">
								    <!-- start here size -->
									<?php if($product->kategori == 'clothing') { ?>
										<!-- <input type="hidden" id="product_id" value="<?php //echo $product->id; ?>"> -->
										<button type="button" id="button_add" onclick="open_modal_size(<?= $product->id; ?>)" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									<?php } else { ?>
									<a href="<?php echo site_url('cart/buy/'.$product->id); ?>">
										<button type="button" class="btn btn-sm btn-default float-left">
											<i class="fa fa-shopping-cart"></i> Add to Cart
										</button>
									</a>
									<?php } ?>
									<!-- end here size -->
								<!--<a href="<?php// echo site_url('cart/buy/'.$product->id); ?>">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-left">-->
								<!--		<i class="fa fa-shopping-cart"></i> Add to Cart-->
								<!--	</button>-->
								<!--</a>-->
								<!--<a href="#">-->
								<!--	<button type="button" class="btn btn-sm btn-default float-right">Rp. <?= number_format($product->price) ?></button>-->
								<!--</a>-->
								<font style="font-size: 15px; color: #fff;  font-weight: 600" class="float-right">Rp. <?= number_format($product->price) ?></font>
								</div>
							</div>
							</div>
						</div>
						<?php 
						// }
						} 
						?>
					</div>

					<hr>

					<div class="row">
						<div class="col-md-9" style="padding: 12px 15px;background: #EEF5FF;border: 1px solid #AEC8FF;text-align: center;">
						<h2>Mau penuhi Harimu dengan Motivasi ?</h2>
						</div>
						<div class="col-md-3">
						<a href="https://merryrianashop.com" target="_blank"><button class="btn btn-info borbgmerahhati" style="width: 100%;height: 100%;font-size: 1.5em;font-weight: bold;cursor:pointer;"> Dapatkan Sekarang </button></a>

						</div>
					</div>
					</div>
				</div>
				
<!-- start here size -->
<!-- Modal Size-->
<div class="modal fade" id="modalSize" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Pilih Ukuran</h4><br>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">

                <input type="hidden" id="id_merch" name="id_merch" value="">

                <div class="form-group row">
                    <label for="status" class="col-sm-3 col-form-label">Pilih Ukuran</label>
                    <div class="col-sm-9">
                        <select class="form-control" id="size" name="size" required>
                            <!--<option id="size-xs" value="XS">XS</option>-->
                            <!--<option value="S">S</option>-->
                            <!--<option value="M">M</option>-->
                            <!--<option value="L">L</option>-->
                            <!--<option value="XL">XL</option>-->
                            <!--<option value="XXL">XXL</option>-->
                        </select>
                    </div>
                </div>

            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
				<!-- <a id="set_url" href="<?php //echo site_url('cart/buy/'.$product->id); ?>"> -->
                	<button class="btn btn-primary btn-block" onclick="send()" type="button"><b>Submit</b></button>
				<!-- </a> -->
            </div>

        </div>
    </div>
</div>
<!-- end here size -->

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
<script type="text/javascript">
	function addtocart(id){        
		if(id != ""){
			$.ajax({
			url:'<?php echo base_url(); ?>home/tambahcart',
			type:'POST',
			dataType:'json',
			data:{ 
					'id' : id 
				},

			success: function(data) {
			$('.count').html(data.count);
			console.log(data);
			//location.reload();
			}
			});
		} else {
			return false;
		}
		return false;
  	}
</script>
</body>
</html>