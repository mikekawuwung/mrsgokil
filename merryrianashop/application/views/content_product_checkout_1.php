<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
    $base_url = base_url();

    ?>
    <!DOCTYPE html>
    <head>
    <title>Merry Riana Reseller</title>
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<meta content="ie=edge" http-equiv="x-ua-compatible">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
	
	<link href="<?php echo base_url(); ?>assets/img/LOGO-M1.png" rel="shortcut icon">
	<link href="<?php echo base_url(); ?>assets/img/LOGO-M1.png" rel="apple-touch-icon">
	<!-- <link href="https://fast.fonts.net/cssapi/175a63a1-3f26-476a-ab32-4e21cbdb8be2.css" rel="stylesheet" type="text/css"> -->
	<link href="<?php echo base_url(); ?>assets/bower_components/select2/dist/css/select2.min.css" rel="stylesheet">

	<link href="<?php echo base_url(); ?>assets/bower_components/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/dropzone/dist/dropzone.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/datatables/datatables.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/fullcalendar/dist/fullcalendar.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/bower_components/collapse/collapse.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/css/main.css?version=3.3" rel="stylesheet">

	<!-- <link href="http://localhost/mrrv3/assets/icon_fonts_assets/picons-thin/style.css" rel="stylesheet"> -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<script src="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.css">

	<!-- ICON -->
	<!--<link rel="stylesheet" href="https://allyoucan.cloud/cdn/icofont/1.0.1/icofont.css" integrity="sha384-jbCTJB16Q17718YM9U22iJkhuGbS0Gd2LjaWb4YJEZToOPmnKDjySVa323U+W7Fv" crossorigin="anonymous"> -->

	<link href="<?= base_url('assets/icon_fonts_assets/icofont/icofont.min.css') ?>" rel="stylesheet">
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
				<span>Merry Riana Reseller</span>
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
       <!--                 	<div class="element-info">-->
       <!--                 		<a href="<?= base_url('product'); ?>" class="btn btn-default btn-sm borbgmerahhati text-white"><i class="icofont-undo text-white"></i>-->
       <!--                 			Kembali-->
       <!--                 		</a>-->
							<!--</div>-->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card mb-3 w-100">
                                        <div class="card-header bgmerahhati text-white">Merchandise Form</div>
                                        <div class="card-body text-black">

										<div class="wajib">
											<label for="">Nama</label>
											<input class="form-control" value="<?php echo (!empty($user['name'])) ? $user['name'] : '' ?>" id="name" name="name" type="text" placeholder="" style="width:100%">
										</div>

                                        <div class="mt-3 wajib">
                                            <label>No HP</label>
                                            <input class="form-control" value="<?php echo (!empty($user['phone'])) ? $user['phone'] : '' ?>" id="phone" name="phone" type="number" placeholder="">
                                        </div>

                                        <div class="mt-3 wajib">
                                            <label for="">Email</label>
                                            <input class="form-control" value="<?php echo (!empty($user['email'])) ? $user['email'] : '' ?>" id="email" name="email" type="text" placeholder="">
                                        </div>

                                        <div class="mt-3 wajib">
                                            <label>Alamat</label>
                                            <input class="form-control" id="alamat" name="alamat" type="text" placeholder="Jalan, nomor rumah, kelurahan, kecamatan">
                                        </div>

										<div class="mt-3">
                                            <label>Catatan (optional)</label>
                                            <input class="form-control" value="" id="catatan" name="catatan" type="text" placeholder="Ukuran, Warna">
                                        </div>

                                        <div class="mt-3">
                                            <label>Provinsi</label>
                                            <select name="provinsi" id="provinsi" class="form-control">
                                                <option value="">-Pilih Provinsi-</option>

                                            </select>
                                        </div>

                                        <div class="mt-3">
                                            <label>Kota</label>
                                            <select name="kota" id="kota" class="form-control">
                                                <option value="">-Pilih Kota-</option>

                                            </select>
                                        </div>

                                        <div class="mt-3">
                                            <label>Harga</label>
                                            <select name="harga" id="harga" class="form-control">
                                                <option value="">-Pilih Harga-</option>

                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card mb-3 w-100">
                                        <div class="card-header bgmerahhati text-white">Pesanan Anda</div>
                                        <div class="card-body text-black">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="col"><b>Produk</b></th>
                                                            <th scope="col"><b>Quantity</b></th>
                                                            <th scope="col"><b>Total</b></th>
                                                            <th scope="col"><b>Action</b></th>
                                                        </tr>
														<?php 
														if(!empty($items)){
														
														foreach($items as $row){
														?>
                                                        <tr>
                                                            <th scope="col"><?= $row['merch_name'] ?></th>
                                                            <th scope="col"><?= $row['quantity'] ?></th>
															<th scope="col"><?= $row['price']*$row['quantity'] ?></th>
															<th scope="col"><a href="<?php echo site_url('cart/remove/'.$row['id']); ?>">X</a></th>
                                                        </tr>
														<?php } } ?>
                                                        <tr>
                                                            <th scope="col"><b>Subtotal</b></th>
                                                            <th scope="col"><b></b></th>
															<td scope="col"><b><?= $total ?></b></td>
															<td scope="col"></td>
                                                        </tr>
														<tr>
                                                            <th scope="col"><b>Ongkir</b></th>
                                                            <th scope="col"><b></b></th>
                                                            <th scope="col" id="hargaongkir"></th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                        <tr>
                                                            <th scope="col"><b>Total</b></th>
                                                            <th scope="col"><b></b></th>
                                                            <th scope="col" id="totalharga"><b><?= $total ?></b></th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="card">
                                                    <div class="card-body">
                                                        <b>Online Payment via Midtrans</b>
                                                        <footer class="blockquote-footer">Pembayaran dengan <cite title="Source Title">Midtrans</cite></footer>
                                                    </div>
                                                    <div class="card-footer">
                                                    	<a href="<?= base_url('product'); ?>" class="btn btn-default btn-sm borbgmerahhati text-uppercase text-white">Tambah Pesanan</a>
                                                        <button id="pay-button" class="btn btn-default btn-sm borbgmerahhati text-uppercase text-white float-right">Pesan Sekarang</button>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('#form_data').trigger("reset");
		$('#modal_tambah').modal('show');
		$('#pay-button').prop('disabled', true);
		fetch_provinsi();
		
		bonusSD();
		bundlingLSS();
		bundlingMSD();
		bundlingMRFK();
		bundlingPoster();
    });
    
    function bundlingMSD() {
		var msd = isExist(4);
		var mdd = isExist(7);
		var paket = isExist(29);
		var array = [4, 7];
		var title = "Beli 2 lebih hemat!";
		var text = "Harga normal <strike><font color='red'>Rp. 275.000</font></strike>, jadi hanya <font color='green'>Rp. 245.000</font>";
		var imageUrl = "http://m1.merryriana.com/assets/img/merchandise/3c52842817c5bf95d103669f9ee480e2.jpg";
		console.log(msd);
		console.log(mdd);
		console.log(paket);
		if((msd != -1) && (mdd == -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 29, array);
		} else if((msd == -1) && (mdd != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 29, array);
		} else if((msd != -1) && (mdd != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 29, array);
		}
	}
	
	function bundlingLSS() {
		var msd = isExist(4);
		var lss = isExist(5);
		var paket = isExist(33);
		var array = [4, 5];
		var title = "Beli 2 lebih hemat!";
		var text = "Harga normal <strike><font color='red'>Rp. 215.000</font></strike>, jadi hanya <font color='green'>Rp. 195.000</font>";
		var imageUrl = "http://m1.merryriana.com/assets/img/merchandise/a3dcca5757a3b9b0dad83df3c0570c85.jpeg";
		console.log(msd);
		console.log(lss);
		console.log(paket);
		if((msd != -1) && (lss == -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 33, array);
		} else if((msd == -1) && (lss != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 33, array);
		} else if((msd != -1) && (lss != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 33, array);
		}
	}
	
	function bundlingMRFK() {
		var mrfk1 = isExist(19);
		var mrfk2 = isExist(24);
		var paket = isExist(28);
		var array = [19, 24];
		var title = "Beli 2 lebih hemat!";
		var text = "Harga normal <strike><font color='red'>Rp. 240.000</font></strike>, jadi hanya <font color='green'>Rp. 215.000</font>";
		var imageUrl = "http://m1.merryriana.com/assets/img/merchandise/43b9327e156c6eee4a7cc2bffb1ce1bd.jpg";
		console.log(mrfk1);
		console.log(mrfk2);
		console.log(paket);
		if((mrfk1 != -1) && (mrfk2 == -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 28, array);
		} else if((mrfk1 == -1) && (mrfk2 != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 28, array);
		} else if((mrfk1 != -1) && (mrfk2 != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 28, array);
		}
	}

	function bundlingPoster() {
		var poster1 = isExist(20);
		var poster2 = isExist(14);
		var paket = isExist(30);
		var array = [20, 14];
		var title = "Beli 2 lebih hemat!";
		var text = "Harga normal <strike><font color='red'>Rp. 270.000</font></strike>, jadi hanya <font color='green'>Rp. 240.000</font>";
		var imageUrl = "http://m1.merryriana.com/assets/img/merchandise/f5fc9ed751c3b8847e7d03f6190b0794.jpg";
		console.log(poster1);
		console.log(poster2);
		console.log(paket);
		if((poster1 != -1) && (poster2 == -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 30, array);
		} else if((poster1 == -1) && (poster2 != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 30, array);
		} else if((poster1 != -1) && (poster2 != -1) && (paket == -1)) {
			swalPaket(title, text, imageUrl, 30, array);
		}
	}
	
	function bonusSD() {
		var totalharga = <?= $total ?>;
		var ada = isExist(23);
		console.log("hasil" + ada);
		if ((totalharga < 200000) && (ada != -1)) {
			console.log("ke sini");
			removeItem(23);
			reload_page();
		} else if((totalharga < 200000) && (ada == -1)) {
			var title = "Eits Tunggu Dulu...";
			var text = "Belanja lagi yuk biar dapet promo";
			var confirm = "Belanja lagi"
			swalertTawar(title, text, confirm);
		} else if((totalharga >= 200000) && (ada == -1)) {
			var title = "Selamat!";
			var text = "Anda mendapatkan promo menarik";
			var confirm = "Ambil"
			swalertAmbil(title, text, confirm);
		}
	}
	
	function removeItem(id) {
		var id = id;
		$.ajax({
			url: "<?php echo base_url('cart/remove/'); ?>" + id,
			type: "GET",
			dataType: "json",
			success: function(result) {
				console.log(id + " sudah dihapus");
			},
			error: function(e) {
				console.log(e);
			}
		})
	}
	
	function isExist(id) {
		var dataItems = <?= json_encode($items); ?>;
		for (var i = 0; i < dataItems.length; i++) {
            if (dataItems[i]['id'] == id) {
                return i;
            }
        }
        return -1;
	}
	
	function swalPaket(title, text, imageUrl, id, id_array) {
		Swal.fire({
		title: title,
		html: text,
		imageUrl: imageUrl,
		imageHeight: 400,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> Ambil',
		confirmButtonAriaLabel: 'Thumbs up, great!',
		cancelButtonText:
			'<i class="fa fa-thumbs-down"></i> Nanti Saja',
		cancelButtonAriaLabel: 'Thumbs down'
		}).then((result) => {
			if(result.value) {
				console.log('diambil');
				id_array.forEach(element => {
					removeItem(element);
					console.log(element + ' dihapus');
				});
				// removeItem(4)
				// removeItem(7)
				window.location.href = "<?= base_url('cart/buy/'); ?>" + id;
			} else {
				console.log('gak jadi');
			}
		});
	}
	
	function swalertAmbil(title, text, confirm) {
		Swal.fire({
		title: title,
		text: text,
		imageUrl: 'http://m1.merryriana.com/assets/img/merchandise/650a345cc8d004cbb62c05db21ada40d.jpeg',
		imageHeight: 400,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> ' + confirm,
		confirmButtonAriaLabel: 'Thumbs up, great!',
		cancelButtonText:
			'<i class="fa fa-thumbs-down"></i> Nanti Saja',
		cancelButtonAriaLabel: 'Thumbs down'
		}).then((result) => {
			if(result.value) {
				console.log(result);
				console.log(result.value);
				window.location.href = "<?php echo base_url('cart/buy/23'); ?>";
			} else {
				console.log('gak jadi');
			}
		});
	}

	function swalertTawar(title, text, confirm) {
		Swal.fire({
		title: title,
		text: text,
		imageUrl: 'http://m1.merryriana.com/assets/img/merchandise/650a345cc8d004cbb62c05db21ada40d.jpeg',
		imageHeight: 400,
		showCancelButton: true,
		focusConfirm: false,
		confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> ' + confirm,
		confirmButtonAriaLabel: 'Thumbs up, great!',
		cancelButtonText:
			'<i class="fa fa-thumbs-down"></i> Nanti Saja',
		cancelButtonAriaLabel: 'Thumbs down'
		}).then((result) => {
			if(result.value) {
				console.log(result);
				console.log(result.value);
				window.location.href = "<?php echo base_url('product'); ?>";
			} else {
				console.log('gak jadi');
			}
		});
	}

	$('#showorder').click(function() {
		$('#form_data').trigger("reset");
		$('#modal_tambah').modal('show');
		fetch_provinsi();
	});

	$('#provinsi').change(function() {
		fetch_kota();
		$('#kota').empty();
		$('#harga').empty();
		$('#hargaongkir').empty();
		fetch_harga();
		check_button();
    });

	$('#kota').change(function() {
		fetch_harga();
		$('#harga').empty();	
		$('#hargaongkir').empty();
		check_button();
		
    });

	$('#harga').change(function() {
		$('#hargaongkir').empty();
		set_ongkir();
		check_button();
	});

	$('.wajib input').keyup(function() {
		var empty = false;
		var hargaongkir = document.getElementById("hargaongkir").innerHTML;
		$('.wajib input').each(function() {
			if ($(this).val().length == 0) {
				empty = true;
			}
		});

		if (empty || hargaongkir == null || hargaongkir == '') {
			$('#pay-button').prop('disabled', true);
		} else {
			check_button();
		}
	});

	function check_button() {
		var empty = false;
		$('.wajib input').each(function() {
			if ($(this).val().length == 0) {
				empty = true;
			}
		});

		var hargaongkir = document.getElementById("hargaongkir").innerHTML;
		if(hargaongkir == null || hargaongkir == '') {
			if (empty) {
				$('#pay-button').prop('disabled', true);
			} else {
				$('#pay-button').prop('disabled', true);
			}
		} else {
			if (empty) {
				$('#pay-button').prop('disabled', true);
			} else {
				$('#pay-button').prop('disabled', false);
			}
		}
		console.log(hargaongkir);
	}

	function set_ongkir() {
		var price = document.getElementById("harga");
		var harga = price.options[price.selectedIndex].value;
		var total = <?= $total; ?>;
		$('#hargaongkir').html(harga);
		$('#totalharga').html(parseInt(harga) + parseInt(total));
	}

	function fetch_provinsi() {
		$.ajax({
			url: "https://merryriana.com/server_api/provinsi",
			type: "GET",
			dataType: "json",
			success: function(result) {
				console.log(result);
				$.each(result, function(index, item) {
				$('#provinsi').append('<option value="' + item.province_id + '">' + item.province + '</option>');
			});

			},
			error: function(e) {
				console.log(e);
			}
		})
    }

	
	function fetch_kota() {
		var province_id = $('#provinsi').val();
		$.ajax({
			url: "https://merryriana.com/server_api/kota",
			type: "POST",
			dataType: "json",
			data: {
				'province_id': province_id
			},
			success: function(result) {
				console.log(result);
				$('#kota').append('<option value="">-Pilih Kota-</option>');
				$('#harga').append('<option value="">-Pilih Harga-</option>');
				$.each(result, function(index, item) {
					if(item.province_id == province_id){	
						$('#kota').append('<option value="' + item.city_id + '">' + item.city_name + '</option>');
						if(index==0) {
							console.log("nol");
							fetch_harga();
						}
					}
				});
			},
			error: function(e) {
				console.log(e);
			}
		})
    }

	function fetch_harga() {
		var city_id = $('#kota').val();
		var totalberat = <?php echo $totalberat ?>;
		dataBerat = {
				'berat': totalberat,
				'id_kota_tujuan': city_id,
				'alamat_lengkap': "Grogol"
			};
		console.log(dataBerat);
		$.ajax({
			url: "https://merryriana.com/server_api/cost",
			type: "POST",
			dataType: "json",
			data: JSON.stringify(dataBerat),
			success: function(result) {
				console.log(result);
				$('#harga').append('<option value="">-Pilih Harga-</option>');
				$.each(result, function(index, item) {
					$('#harga').append('<option value="' + item.cost[0].value + '">JNE ' + item.cost[0].etd + ' Hari | ' + item.cost[0].value + '</option>');
				});
				
			},
			error: function(e) {
				console.log(e);
			}
		})
    }

	$('#pay-button').click(function (event) {
        
		console.log('pay-button');

		event.preventDefault();
		$('#pay-button').prop("disabled", true);
		$('#pay-button').html('<i class="fas fa-spinner fa-pulse"></i> LOADING...');

		var name = $('#name').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		var alamat = $('#alamat').val();
		var catatan = $('#catatan').val();

		var prov = document.getElementById("provinsi");
		var provinsi = prov.options[prov.selectedIndex].text;

		var city = document.getElementById("kota");
		var kota = city.options[city.selectedIndex].text;

		var price = document.getElementById("harga");
		var harga = price.options[price.selectedIndex].value;
		var ekspedisi = price.options[price.selectedIndex].text;

		var ongkir = {
						id: "ONGKIR",
						judul: ekspedisi,
						gambar: null,
						deskripsi: null,
						kategori: null,
						harga: harga,
						jumlah: 1,
						berat: 0
					}
		
		var dataCustomer = {
							id_buku: "MSD_1, Ukuran M",
							name: name,
							email: email,
							phone: phone,
							shipping_details: alamat + ' ' + kota + ' ' + provinsi + ' ' + ekspedisi,
							source: "m1",
							code: "merch",
							campaign: "merch-m1",
							aff: "<?php echo (!empty($user['aff'])) ? $user['aff'] : ''; ?>"
						};

		var dataProduk = [];
		var dataProdukOngkir = [];
		var dataItems = <?= json_encode($items); ?>;
		var length = <?= count($items); ?>;
		var stringProduct = '';
		var arrayItems = [];
		var objItem = {
			nama_produk: "",
			jumlah: null,
			harga: null
		}
		for(var i=0; i<length; i++) {
			var item = {};
			stringProduct += dataItems[i]['merch_name'] + ' ' + dataItems[i]['quantity'] + ', ';
			item.id = dataItems[i]['id'];
			item.judul = dataItems[i]['merch_name'];
			item.gambar = dataItems[i]['img'];
			item.deskripsi = dataItems[i]['deskripsi'];
			item.kategori = "Kategori";
			item.harga = dataItems[i]['price'];
			item.jumlah = dataItems[i]['quantity'];
			item.berat = dataItems[i]['berat'];
			dataProduk.push(item);
			
			objItem.nama_produk = dataItems[i]['slug'];
			objItem.jumlah = dataItems[i]['quantity'];
			objItem.harga = dataItems[i]['price'];
			arrayItems.push(objItem);
		}
		dataProdukOngkir = dataProduk.slice();
		dataProdukOngkir.push(ongkir);
		// stringProduct += ekspedisi + ' ';
		stringProduct += catatan;
		dataCustomer.id_buku = stringProduct;

		var dataMerch = [];
		dataMerch.push(dataCustomer);
		dataMerch.push(dataProdukOngkir);

		console.log(dataMerch);
		
		$.ajax({
		  url: "https://merryriana.com/server_api/payment",
		  type : "POST",
		  data: JSON.stringify(dataMerch),
		  dataType: "json",
		  success: function(response) {
			console.log(response);

			window.location.href = response;

			$.ajax({
				url: "<?php echo base_url('cart/clear'); ?>",
				type: "GET",
				success: function(response) {
					console.log("Clear");
				}
			})

		  }
		});

		$.ajax({
		  url: "https://leads.merryriana.com/post_data/input_merch_wordpress",
		  type : "POST",
		  data: {
                    'id_buku': dataCustomer.id_buku,
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'shipping_details': dataCustomer.shipping_details,
                    'source': dataCustomer.source,
                    'code': dataCustomer.code,
                    'campaign': dataCustomer.campaign,
                    'aff': dataCustomer.aff
                },
		  dataType: "json",
		  success: function(response) {
			console.log(response);			
		  },
		});
		
		
		if (dataCustomer.aff != '') {
		    var price = document.getElementById("harga");
    		var harga = price.options[price.selectedIndex].value;
    		var total = <?= $total; ?>;
    
    		$.ajax({
    		  url: "https://m1.merryriana.com/post_data/update_address",
    		  type : "POST",
    		  data: {
                        'id_buku': dataCustomer.id_buku,
                        'name': name,
                        'email': email,
                        'phone': phone,
                        'shipping_details': dataCustomer.shipping_details,
    					'total': parseInt(harga) + parseInt(total),
    					'json': JSON.stringify(arrayItems),
                        'source': dataCustomer.source,
                        'code': dataCustomer.code,
                        'campaign': dataCustomer.campaign,
    					'aff': dataCustomer.aff
                    },
    		  dataType: "json",
    		  success: function(response) {
    			console.log(response);			
    		  },
    		});
		
                $.ajax({
                    url: "https://leads.merryriana.com/post_data/",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'name': name,
                        'email': email,
                        'phone': phone,
                        'branch': '-',
                        'program_mr': '-',
                        'source': dataCustomer.source,
                        'code': dataCustomer.code,
                        'campaign': dataCustomer.campaign,
                        'referral': dataCustomer.aff
                    },
                    success: function(result) {
                        console.log(result);
                    },
                    error: function(xhr, status, errorThrown) {
                        // $("form").submit();
                    }
                });
                
                for (let i = 0; i < dataProduk.length; i++) {
        			const item = dataProduk[i];
        
        			$.ajax({
        			url: "https://m1.merryriana.com/merchandise/send_data_merch",
        			type : "POST",
        			data: {
        						'merch_id': item.id,
        						'name': name,
        						'email': email,
        						'phone_redirect': phone,
        						'shipping_details': dataCustomer.shipping_details,
        						'source': dataCustomer.source,
        						'code': dataCustomer.code,
        						'campaign': dataCustomer.campaign,
        						'aff': dataCustomer.aff
        					},
        			dataType: "json",
        			success: function(response) {
        				console.log(response);			
        			},
        			});
        			
        		}
		
            }
		
		
	});

	function reload_page() {
		window.location.reload();
	}
</script>
</body>
</html>