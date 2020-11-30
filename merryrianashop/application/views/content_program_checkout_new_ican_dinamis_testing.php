<?php
defined('BASEPATH') or exit('No direct script access allowed');
$base_url = base_url();

?>
<!DOCTYPE html>

<head>
	<title>Merry Riana Shop</title>
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
	<link href="<?php echo base_url(); ?>assets/css/intlTelInput.css" rel="stylesheet">
	<link href="<?php echo base_url(); ?>assets/css/css-validation/screen.css" rel="stylesheet">

	<!-- <link href="http://localhost/mrrv3/assets/icon_fonts_assets/picons-thin/style.css" rel="stylesheet"> -->
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
	<script src="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/bower_components/sweetalert-master/dist/sweetalert.css">

	<!-- ICON -->
	<!--<link rel="stylesheet" href="https://allyoucan.cloud/cdn/icofont/1.0.1/icofont.css" integrity="sha384-jbCTJB16Q17718YM9U22iJkhuGbS0Gd2LjaWb4YJEZToOPmnKDjySVa323U+W7Fv" crossorigin="anonymous"> -->

	<link href="<?= base_url('assets/icon_fonts_assets/icofont/icofont.min.css') ?>" rel="stylesheet">
	<style>
		.projects-list .project-head {
			padding: 11px 40px;
		}

		.merahhati {
			color: #ae0001;
		}

		.bgmerahhati {
			background-color: #ae0001;
		}

		.borbgmerahhati {
			background-color: #ae0001;
			border-color: #ae0001;
		}

		.fbnya {
			border-color: #3b5998;
			background-color: #3b5998;
		}

		.twitternya {
			border-color: #1DA1F2;
			background-color: #1DA1F2;
		}

		.whatsappnya {
			border-color: #25d366;
			background-color: #25d366;
		}

		.instagramnya {
			border-color: #C13584;
			background-color: #C13584;
		}

		.downloadnya {
			border-color: #ae0001;
			background-color: #ae0001;
		}

		.element-wrapper .element-inner-header {}

		#tab_videonya {
			margin-top: 167px;
		}

		body:before {
			background: linear-gradient(to right, #ae0001, #4d4d4d) !important;
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
						<a class="logo" href="<?= base_url('online_program_ican'); ?>"><img src="<?php echo base_url(); ?>assets/logo.png" style="width:50px;"></a>
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
								<a href="<?php echo base_url('online_program_ican'); ?>">
									<div class="icon-w">
										<div class="fa fa-dropbox merahhati"></div>
									</div><span>Program</span>
								</a>
							</li>
							<li class="menu float-left" style="color:#fa163f; border-right: none;">
								<a href="<?php echo base_url('cartprogramican/list_chart'); ?>">
									<div class="icon-w">
										<div class="fa fa-shopping-cart"></div>
									</div><span class="count">Cart : <?= $jumlah; ?> </span>
								</a>
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
							<a href="<?php echo base_url('online_program_ican'); ?>">
								<div class="icon-w">
									<div class="fa fa-dropbox"></div>
								</div><span>Program</span>
							</a>
						</li>
						<li class="menu">
							<a href="<?php echo base_url('cartprogramican/list_chart'); ?>">
								<div class="icon-w">
									<div class="fa fa-shopping-cart"></div>
								</div><span>Cart : <?= $jumlah; ?></span>
							</a>
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
										<div class="row">


											<div class="col-md-12">
												<div class="card mb-3 w-100">
													<div class="card-header bgmerahhati text-white">
														Parents Detail
														<a href="<?php echo base_url('cartprogramican/reset'); ?>" class="btn btn-light btn-sm text-uppercase text-dark float-right">Reset Form</a>
													</div>
													<div class="card-body text-black">
														<div class="row">
															<div class="col-md-6">
																<div class="wajib">
																	<label for="">Nama Ayah<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control " value="<?php echo (!empty($user['name'])) ? $user['name'] : '' ?>" id="nameayah" name="nameayah" type="text" placeholder="" style="width:100%" required>
																</div>

																<div class="mt-3 wajib">
																	<label>No HP Ayah<small><span style="color:red;"> *required</span></small></label><br>
																	<input type="hidden" id="hpvalidayah" value="false">
																	<input class="form-control numeric" value="<?php echo (!empty($user['hp'])) ? $user['hp'] : '' ?>" maxlength="12" onkeyup="checkMobileAyah()" id="phoneayah" name="phoneayah" type="text" placeholder="contoh : 8123456789" required>
																	<span id="message_mobile_ayah" style="font-size: 10px;"></span>
																</div>

																<div class="mt-3 wajib">
																	<label for="">Email Ayah<small><span style="color:red;"> *required</span></small></label>
																	<input type="hidden" id="emailvalidayah" value="false"></input>
																	<input class="form-control" value="<?php echo (!empty($user['email'])) ? $user['email'] : '' ?>" id="emailayah" name="emailayah" type="text" placeholder="" onkeyup="email_validation_ayah()" style="width:100%" required>
																	<span id='message_email_ayah' style="font-size:10px;font-weight:bold">
																</div>
															</div>

															<div class="col-md-6">
																<div class="wajib">
																	<label for="">Nama Ibu<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control" value="<?php echo (!empty($user['namaibu'])) ? $user['namaibu'] : '' ?>" id="nameibu" name="nameibu" type="text" placeholder="" style="width:100%" required>
																</div>

																<div class="mt-3 wajib">
																	<label>No HP Ibu<small><span style="color:red;"> *required</span></small></label><br>
																	<input type="hidden" id="hpvalidibu" value="false">
																	<input class="form-control numeric" value="<?php echo (!empty($user['hpibu'])) ? $user['hpibu'] : '' ?>" onkeyup="checkMobileIbu()" maxlength="12" id="phoneibu" name="phoneibu" type="text" placeholder="contoh : 8123456789" required>
																	<span id="message_mobile_ibu" style="font-size: 10px;"></span>
																</div>

																<div class="mt-3 wajib">
																	<label for="">Email Ibu<small><span style="color:red;"> *required</span></small></label>
																	<input type="hidden" id="emailvalidibu" value="false"></input>
																	<input class="form-control" value="<?php echo (!empty($user['emailibu'])) ? $user['emailibu'] : '' ?>" id="emailibu" name="emailibu" type="text" placeholder="" onkeyup="email_validation_ibu()" style="width:100%" required>
																	<span id='message_email_ibu' style="font-size:10px;font-weight:bold">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>


											<div class="col-md-12">
												<div class="card mb-3 w-100">
													<div class="card-header bgmerahhati text-white">
														Data Peserta
														<!--<button class="btn btn-light btn-sm text-uppercase text-dark float-right" onclick="tambah_peserta()">Tambah Anak</button>-->
													</div>
													<div class="card-body text-black">
														<div class="row" id="form_peserta">
															<div class="col-md-12">
																<!--<h5>Peserta 1</h5>-->
																<!--<div class="wajib">-->
																<!--	<label for="">Nama Lengkap<small><span style="color:red;"> *required</span></small></label>-->
																<!--	<input class="form-control" value="<?php echo (!empty($user['branchnamaanak'])) ? $user['branchnamaanak'] : '' ?>" id="catatan" name="catatan[0]" type="text" placeholder="" style="width:100%">-->
																<!--</div>-->

																<!--<div class="mt-3 wajib">-->
																<!--	<label>Usia anak<small><span style="color:red;"> *required</span></small></label>-->
																<!--	<input class="form-control numeric" value="<?php echo (!empty($user['umuranak'])) ? $user['umuranak'] : '' ?>" id="usiaanak" name="usiaanak[0]" type="text" placeholder="">-->
																<!--</div>-->

																<!--<div class="wajib">-->
																<!--	<label for="">No HP anak<small><span style="color:red;"> *required</span></small></label>-->
																<!--	<input class="form-control numeric" value="<?php echo (!empty($user['nohpanak'])) ? $user['nohpanak'] : '' ?>" id="nohpanak" name="nohpanak[0]" type="text" placeholder="" style="width:100%">-->
																<!--</div>-->


																<!--<div class="mt-3 wajib">-->
																<!--	<label for="">Email<small><span style="color:red;"> *required</span></small></label>-->
																<!--	<input class="form-control" value="<?php echo (!empty($user['emailanak'])) ? $user['emailanak'] : '' ?>" id="emailanak" name="emailanak[0]" type="text" placeholder="">-->
																<!--</div>-->
																<!--<small style="color: red;">Penting! Pastikan email ini AKTIF. Link kelas online akan di kirimkan ke email ini. 1 user = 1 email account. Email TIDAK BOLEH SAMA dengan peserta lain yang Anda daftarkan.</small>-->

																<!-- <div class="mt-3">
																	<label>Nama dan Usia Anak</label>
																	<input class="form-control" value="" id="catatan" name="catatan" type="text" placeholder="Contoh : Rizky (13 th), Tria (15 th)">
																	<small>Jika lebih dari satu anak, pisahkan dengan tanda koma</small>
																</div> -->
															</div>


														</div>
													</div>
												</div>
											</div>

											<div class="col-md-12">
												<div class="card mb-3 w-100">
													<div class="card-header bgmerahhati text-white">
														Data Alamat
														<!-- <a href="<?php echo base_url('cartprogramican/reset'); ?>" class="btn btn-light btn-sm text-uppercase text-dark float-right">Reset Form</a> -->
													</div>
													<div class="card-body text-black">
														<div class="row">
															<div class="col-md-6">

																<div class="wajib">
																	<label>Alamat<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control" id="alamat" name="alamat" type="text" placeholder="Jalan, nomor rumah, kelurahan, kecamatan" required>
																</div>
																<!--start here dest code-->
																<div class="mt-3 wajib">
																	<label>Pilih Kurir<small><span style="color:red;"> *required</span></small></label>
																	<select name="kurir" id="kurir" class="form-control" required>
																		<option value="" selected disabled>Kurir Pilihan</option>
																		<option value="jne">Ekspedisi JNE</option>
																		<option value="jnt">Ekspedisi J&T</option>
																	</select>
																</div>
																<!--end here dest code-->

																<div class="mt-3 wajib">
																	<label>Provinsi<small><span style="color:red;"> *required</span></small></label><button onclick="reload_harga()" class="btn-sm bgmerahhati text-white float-right">Refresh</button>
																	<select name="provinsi" id="provinsi" class="form-control" required>
																		<option value="">-Pilih Provinsi-</option>

																	</select>
																</div>

																<div class="mt-3 wajib">
																	<label>Kota<small><span style="color:red;"> *required</span></small></label>
																	<select name="kota" id="kota" class="form-control" required>
																		<option value="">-Pilih Kota-</option>

																	</select>
																</div>
															</div>

															<!-- kecamatan -->
															<!--<div class="mt-3">-->
															<!--                                  <label>Kecamatan</label>-->
															<!--                                  <select name="kecamatan" id="kecamatan" class="form-control">-->
															<!--                                      <option value="">-Pilih Kecamatan-</option>-->

															<!--                                  </select>-->
															<!--</div>-->
															<!-- kecamatan -->
															<div class="col-md-6">
																<!--start here dest code-->
																<div class="mt-3 waji" id="kurir_jnt" style="display:none">
																	<label>Kecamatan<small><span style="color:red;"> *required</span></small></label><img id="loader_kecamatan" style="display:none;" class="mx-2" src="<?= base_url('assets/loader.gif'); ?>" width='16px' height='16px'></img> <!-- start here loader -->
																	<select name="kecamatan" id="kecamatan" class="form-control wajib" required>
																		<option value="">-Pilih Kecamatan-</option>

																	</select>
																</div>

																<div class="mt-3 waji" id="kurir_jne">
																	<label>Kecamatan<small><span style="color:red;"> *required</span></small></label>
																	<select id="destination" name="destination" class="form-control select-destination wajib" required></select>
																	<!--<input type="text" class="form-control select-destination" id="destination" name="destination"></input>-->
																</div>
																<!--end here dest code-->

																<div class="mt-3 wajib">
																	<label>Kode Pos<small><span style="color:red;"> *required</span></small></label>
																	<select id="kode_pos" name="kode_pos" class="form-control wajib" required></select>
																</div>
																
																<div class="mt-3 wajib">
																	<label>Harga<small><span style="color:red;"> *required</span></small></label><button onclick="reload_ongkir()" class="btn-sm bgmerahhati text-white float-right">Reload Ongkir</button>
																	<select name="harga" id="harga" class="form-control wajib" required>
																		<option value="">-Pilih Harga-</option>

																	</select>
																</div>


															</div>
														</div>
													</div>
												</div>
											</div>




										</div>
										<div class="row">
											<div class="col-md-12">
												<div class="card mb-3 w-100">
													<div class="card-header bgmerahhati text-white">
														Pesanan Anda
														<a href="<?php echo base_url('cartprogramican/list_chart'); ?>" class="btn btn-light btn-sm text-uppercase text-dark float-right">Edit Keranjang</a>
													</div>
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
																	if (!empty($items)) {

																		foreach ($items as $row) {
																	?>
																			<tr>
																				<th scope="col"><?= $row['program_name'] ?></th>
																				<th scope="col">

																					<a href="<?= base_url('cartprogramican/remove_one/' . $row['id']); ?>" class="btn bgmerahhati text-white btn-sm">-</a>
																					<?= $row['quantity'] ?>
																					<a href="<?= base_url('cartprogramican/add_one/' . $row['id']); ?>" class="btn bgmerahhati text-white btn-sm">+</a>
																				</th>
																				<th scope="col">Rp. <?= number_format($row['price'] * $row['quantity']) ?></th>
																				<th scope="col"><a href="<?php echo site_url('cartprogramican/remove/' . $row['id']); ?>" style="color: red;">Hapus Program</a></th>
																			</tr>
																	<?php }
																	} ?>
																	<tr>
																		<th scope="col"><b>Subtotal</b></th>
																		<th scope="col"><b></b></th>
																		<td scope="col"><b>Rp. <?= number_format($total) ?></b></td>
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
																		<th scope="col" id="totalharga"><b>Rp. <?= number_format($total) ?></b></th>
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
																	<!-- <a href="<?= base_url('online_program'); ?>" class="btn btn-default btn-sm borbgmerahhati text-uppercase text-white">Tambahkan Extra Home Kit Untuk Anak Anda</a> -->
																	<button id="pay-button" class="btn btn-default btn-sm borbgmerahhati text-uppercase text-white float-right">Pesan Sekarang</button>
																	<!--<button id="test-button" class="btn btn-default btn-sm borbgmerahhati text-uppercase text-white float-right">Test</button>-->
																</div>
															</div>
															<small style="color: red;float:right;">mohon lengkapi data di kolom *required</small>
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
	<script src="<?= base_url(); ?>assets/js/intlTelInput.js"></script>
	<script type="text/javascript">
		$('.numeric').keyup(function(e) {
			if (/\D/g.test(this.value)) {
				this.value = this.value.replace(/\D/g, '');
			}
		});

		// 		international phone
		// var input = document.querySelector("#nohpanak");
		// window.intlTelInput(input, {
		// 	initialCountry: "id",
		// 	geoIpLookup: function(callback) {
		// 		$.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
		// 			var countryCode = (resp && resp.country) ? resp.country : "";
		// 			callback(countryCode);
		// 		});
		// 	},
		// 	utilsScript: "<?= base_url(); ?>assets/js/utils.js"
		// });
		var inputHpAyah = document.querySelector("#phoneayah");
		var noHpAyah = window.intlTelInput(inputHpAyah, {
			initialCountry: "id",
			geoIpLookup: function(callback) {
				$.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
					var countryCode = (resp && resp.country) ? resp.country : "";
					callback(countryCode);
				});
			},
			utilsScript: "<?= base_url(); ?>assets/js/utils.js"
		});

		var inputHpIbu = document.querySelector("#phoneibu");
		var noHpIbu = window.intlTelInput(inputHpIbu, {
			initialCountry: "id",
			geoIpLookup: function(callback) {
				$.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
					var countryCode = (resp && resp.country) ? resp.country : "";
					callback(countryCode);
				});
			},
			utilsScript: "<?= base_url(); ?>assets/js/utils.js"
		});

		function email_validation_ayah() {

			emailvalidayah = $('#emailvalidayah').val();
			var email = document.getElementById('emailayah');
			var message_email = document.getElementById('message_email_ayah');
			var goodColor = "#66cc66";
			var badColor = "#ff6666";

			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
				email.style.borderColor = goodColor;
				message_email.style.color = goodColor;
				message_email.innerHTML = "";
				$('#emailvalidayah').val('true');
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
			} else if (email.value.length == 0) {
				email.style.borderColor = badColor;
				message_email.style.color = badColor;
				message_email.innerHTML = "Email tidak boleh kosong"
				$('#emailvalidayah').val('false');
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
				return
			} else {
				email.style.borderColor = badColor;
				message_email.style.color = badColor;
				message_email.innerHTML = "Email Tidak Valid"
				$('#emailvalidayah').val('false');
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
				return
			}
		}

		function email_validation_ibu() {

			emailvalidibu = $('#emailvalidibu').val();
			var email = document.getElementById('emailibu');
			var message_email = document.getElementById('message_email_ibu');
			var goodColor = "#66cc66";
			var badColor = "#ff6666";

			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
				email.style.borderColor = goodColor;
				message_email.style.color = goodColor;
				message_email.innerHTML = "";
				emailvalidibu = "true";
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
			} else if (email.value.length == 0) {
				email.style.borderColor = badColor;
				message_email.style.color = badColor;
				message_email.innerHTML = "Email tidak boleh kosong"
				emailvalidibu = "false";
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
				return
			} else {
				email.style.borderColor = badColor;
				message_email.style.color = badColor;
				message_email.innerHTML = "Email Tidak Valid"
				emailvalidibu = "false";
				$('#lanjutkan').prop('disabled', true);
				$('#lanjutkan').css('cursor', 'not-allowed');
				return
			}
		}


		$(document).ready(function() {
			$('#form_data').trigger("reset");
			$('#modal_tambah').modal('show');
			// $('#pay-button').prop('disabled', true);
			fetch_provinsi();

			var items = <?= json_encode($items); ?>;
			console.log(items);

			// 			for(var i=0; i<jumlah; i++) {
			// 			    tambah_peserta();
			// 			}

			items.forEach(item => {
				if (item.kategori == 'digital-class') {
					for (i = 0; i < item.quantity; i++) {
						console.log(item.program_name);
						tambah_peserta(item.program_name);
					}
				}
			})

			// 			bonusSD();
			// 		bundlingLSS();
			// // bundlingMSD();
			// bundlingMRFK();
			// bundlingPoster();

			// start here dest code
			$(".select-destination").select2({
				placeholder: '--- Ketik Nama Kecamatan ---',
				ajax: {
					url: "<?php echo base_url('cart/destination'); ?>",
					dataType: 'json',
					delay: 250,
					processResults: function(data) {
						console.log(data);
						console.log("test");
						var data = JSON.parse(data);
						var detail = data.detail;
						console.log(detail);
						var myResults = [];
						$.each(detail, function(index, item) {
							// console.log(index, item);
							myResults.push({
								'id': item.code,
								'text': item.label
							});
						});
						return {
							results: myResults
						};
					},
					cache: true
				}
			});
			// end here dest code

			$('#kode_pos').select2({
				placeholder: '--- Ketik Nama Kelurahan atau Kode Pos ---',
				ajax: {
					url: "<?= base_url('cart/kode_pos'); ?>",
					dataType: 'json',
					delay: 250,
					processResults: function(data) {
						var results = [];
						$.each(data, function(index, item) {
							results.push({
								id: item.id,
								text: item.text + " - " + item.id
							});
						});
						return {
							results: results
						};
					},
					cache: true
				}
			});

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
			if ((msd != -1) && (mdd == -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 29, array);
			} else if ((msd == -1) && (mdd != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 29, array);
			} else if ((msd != -1) && (mdd != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 29, array);
			}
		}

		function bundlingLSS() {
			var msd = isExist(10);
			var lss = isExist(12);
			var paket = isExist(14);
			var array = [10, 12];
			var title = "Beli 2 lebih hemat!";
			var text = "Harga normal <strike><font color='red'>Rp. 1.000.000</font></strike>, jadi hanya <font color='green'>Rp. 900.000</font>";
			var imageUrl = "https://merryrianashop.com/assets/img/merchandise/banner-all.jpeg";
			console.log(msd);
			console.log(lss);
			console.log(paket);
			if ((msd != -1) && (lss == -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 14, array);
			} else if ((msd == -1) && (lss != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 14, array);
			} else if ((msd != -1) && (lss != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 14, array);
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
			if ((mrfk1 != -1) && (mrfk2 == -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 28, array);
			} else if ((mrfk1 == -1) && (mrfk2 != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 28, array);
			} else if ((mrfk1 != -1) && (mrfk2 != -1) && (paket == -1)) {
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
			if ((poster1 != -1) && (poster2 == -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 30, array);
			} else if ((poster1 == -1) && (poster2 != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 30, array);
			} else if ((poster1 != -1) && (poster2 != -1) && (paket == -1)) {
				swalPaket(title, text, imageUrl, 30, array);
			}
		}

		function bonusSD() {
			var totalharga = <?= $total ?>;
			var ada = isExist(23);
			console.log("hasil" + ada);
			if ((totalharga < 200000 - 35000) && (ada != -1)) {
				console.log("ke sini");
				removeItem(23);
				reload_page();
			} else if ((totalharga < 200000) && (ada == -1)) {
				var title = "Eits Tunggu Dulu...";
				var text = "Belanja lagi yuk biar dapet promo";
				var confirm = "Belanja lagi"
				swalertTawar(title, text, confirm);
			} else if ((totalharga >= 200000 - 35000) && (totalharga <= 200000 + 35000) && (ada != -1)) {
				// 			var title = "Selamat!";
				// 			var text = "Anda mendapatkan promo menarik";
				// 			var confirm = "Ambil"
				// 			swalertAmbil(title, text, confirm);
				console.log("ke sini");
				removeItem(23);
				reload_page();
			} else if ((totalharga >= 200000) && (ada == -1)) {
				var title = "Selamat!";
				var text = "Anda mendapatkan promo menarik";
				var confirm = "Ambil"
				swalertAmbil(title, text, confirm);
			}
		}

		function removeItem(id) {
			var id = id;
			$.ajax({
				url: "<?php echo base_url('cartprogram/remove/'); ?>" + id,
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
				confirmButtonText: 'Ambil',
				confirmButtonAriaLabel: 'Thumbs up, great!',
				cancelButtonText: 'Nanti Saja',
				cancelButtonAriaLabel: 'Thumbs down'
			}).then((result) => {
				if (result.value) {
					console.log('diambil');
					id_array.forEach(element => {
						removeItem(element);
						console.log(element + ' dihapus');
					});
					// removeItem(4)
					// removeItem(7)
					window.location.href = "<?= base_url('cartprogram/buy/'); ?>" + id;
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
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> ' + confirm,
				confirmButtonAriaLabel: 'Thumbs up, great!',
				cancelButtonText: '<i class="fa fa-thumbs-down"></i> Nanti Saja',
				cancelButtonAriaLabel: 'Thumbs down'
			}).then((result) => {
				if (result.value) {
					console.log(result);
					console.log(result.value);
					window.location.href = "<?php echo base_url('cartprogramican/buy/23'); ?>";
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
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> ' + confirm,
				confirmButtonAriaLabel: 'Thumbs up, great!',
				cancelButtonText: '<i class="fa fa-thumbs-down"></i> Nanti Saja',
				cancelButtonAriaLabel: 'Thumbs down'
			}).then((result) => {
				if (result.value) {
					console.log(result);
					console.log(result.value);
					window.location.href = "<?php echo base_url('online_program_ican'); ?>";
				} else {
					console.log('gak jadi');
				}
			});
		}


		// Validasi no HP Ayah
		function checkMobileAyah() {
			hpvalidayah = $('#hpvalidayah').val();
			var phone = document.getElementById('phoneayah');
			// var digit = phone.value.charAt(0);
			var message_mobile = document.getElementById('message_mobile_ayah');
			var goodColor = "#66cc66";
			var badColor = "#ff6666";

			console.log(phone.value);

			if (phone.value.length >= 8 && phone.value.length <= 12) {
				phone.style.borderColor = goodColor;
				message_mobile.style.color = goodColor;
				message_mobile.innerHTML = "";
				hpvalidayah = "true";
			} else if (phone.value.length == 0) {
				phone.style.borderColor = badColor;
				message_mobile.style.color = badColor;
				message_mobile.innerHTML = "<br>No handphone harus diisi"
				hpvalidayah = "false";
				return
			} else if (phone.value.length > 0 && phone.value.length < 8) {
				phone.style.borderColor = badColor;
				message_mobile.style.color = badColor;
				message_mobile.innerHTML = "<br>No handphone minimal 8 karakter"
				hpvalidayah = "false";
				return
			}
		}

		// Validasi no HP ibu
		function checkMobileIbu() {
			hpvalidibu = $('#hpvalidibu').val();
			var phone = document.getElementById('phoneibu');
			// var digit = phone.value.charAt(0);
			var message_mobile = document.getElementById('message_mobile_ibu');
			var goodColor = "#66cc66";
			var badColor = "#ff6666";

			console.log(phone.value);

			if (phone.value.length >= 8 && phone.value.length <= 12) {
				phone.style.borderColor = goodColor;
				message_mobile.style.color = goodColor;
				message_mobile.innerHTML = "";
				hpvalidibu = "true";
			} else if (phone.value.length == 0) {
				phone.style.borderColor = badColor;
				message_mobile.style.color = badColor;
				message_mobile.innerHTML = "<br>No handphone harus diisi"
				hpvalidibu = "false";
				return
			} else if (phone.value.length > 0 && phone.value.length < 8) {
				phone.style.borderColor = badColor;
				message_mobile.style.color = badColor;
				message_mobile.innerHTML = "<br>No handphone minimal 8 karakter"
				hpvalidibu = "false";
				return
			}
		}

		// start here tambah anak
		function getArray(element) {
			var result = new Array();
			$(element).find('input').each(function(i, e) {
				// extract path from name
				var path = $(e).attr('name').split('[');
				for (var key in path) {
					if (path[key].endsWith(']')) {
						path[key] = path[key].substr(0, path[key].length - 1);
					}
				}

				// create path inside result array
				var node = result;
				for (var depth in path) {
					if (depth == path.length - 1) {
						if (Number.isInteger(path[depth])) {
							node.splice(path[depth], 0, $(e).val());
						} else {
							node.push($(e).val());
						}
					} else {
						var found = false;
						for (var key in node) {
							if (node[key].name == path[depth]) {
								found = true;
								node = node[key].value;
								break;
							}
						}

						if (!found) {
							var obj = new Object();
							obj['name'] = path[depth];
							obj['value'] = new Array();
							node.push(obj);
							node = node[node.length - 1].value;
						}
					}
				}
			});
			return result;
		}

		var jumlah_anak = 0;
		//perubahan
		var inputHpAnak;
		var intelInputNumber;
		var arrayHpAnak = [];
		var arrayInputNumber = [];
		//perubahan

		function tambah_peserta(nama_program) {

			// <button id="` + jumlah_anak + `" class="btn btn-default btn-sm btn_remove borbgmerahhati text-uppercase text-white float-right">X</button>
			var form_anak_baru = `<div class="col-md-6 mt-3" id="head` + jumlah_anak + `">
														        <h5 style="display: inline">Peserta ` + (jumlah_anak + 1) + ` : ` + nama_program + `</h5>

																<div class="wajib">
																	<label for="">Nama Lengkap<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control" value="" id="catatan" name="catatan[` + jumlah_anak + `]" type="text" placeholder="" style="width:100%" required>
																</div>
																
																<div class="mt-3 wajib">
																	<label>Usia anak<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control numeric" value="" id="usiaanak" name="usiaanak[` + jumlah_anak + `]" type="number" maxlength="2" placeholder="" required>
																</div>

																<div class="wajib">
																	<label for="">No HP anak<small><span style="color:red;"> *required</span></small></label><br/>
																	<input class="form-control numeric hp-ke` + jumlah_anak + `" value="" id="nohpanak` + jumlah_anak +`" name="nohpanak[` + jumlah_anak + `]" type="text" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==12) return false;" placeholder="contoh : 8123456789" style="width:100%" required>
																    <br/><small class="hp-validation-ke` + jumlah_anak + `" style="color: red; display:none;">No HP Tidak Valid</small>
																</div>


																<div class="mt-3 wajib">
																	<label for="">Email<small><span style="color:red;"> *required</span></small></label>
																	<input class="form-control email-ke` + jumlah_anak + `" value="" id="emailanak" name="emailanak[` + jumlah_anak + `]" type="text" placeholder="" required>
																</div>
																<small class="email-validation-ke` + jumlah_anak + `" style="color: red; display:none;">Email Tidak Valid</small>
																<br/><small style="color: red;">Penting! Pastikan email ini AKTIF. Link kelas online akan di kirimkan ke email ini. 1 user = 1 email account. Email TIDAK BOLEH SAMA dengan peserta lain yang Anda daftarkan.</small>
															</div>`;

			$('#form_peserta').append(form_anak_baru);
			                                                //perubahan
															inputHpAnak = document.querySelector("#nohpanak" + jumlah_anak);
															arrayHpAnak.push(inputHpAnak);
															intelInputNumber = window.intlTelInput(arrayHpAnak[jumlah_anak], {
															    initialCountry: "id",
															    geoIpLookup: function(callback) {
															        $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
															            var countryCode = (resp && resp.country) ? resp.country : "";
															            callback(countryCode);
															        });
															    },
															    utilsScript: "js/utils.js"
															});
															arrayInputNumber.push(intelInputNumber);
															//perubahan

			jumlah_anak++;
		}

		$(document).on('click', '.btn_remove', function() {
			var button_id = $(this).attr("id");
			$('#head' + button_id + '').remove();

			jumlah_anak--;
		});


		$('#test-button').click(function(event) {
			var hasil = getArray($("#form_peserta"));
			console.log("hasil : " + hasil);
			hasil.forEach(function(item) {
				var string = "";
				console.log("string : " + string);
				key = item.name;
				console.log("key : " + key);
				value = item.value;
				console.log("value : " + value);
				value.forEach(item => {
					string += item + ", ";
					console.log("string : " + string);
				})
				console.log("string : " + string);
				Object.assign(dataCustomer, {
					[key]: string
				});
			});
			console.log(dataCustomer);
		})

		//end here tambah anak

		// start here dest code
		$('#destination').change(function() {
			console.log("ganti");
			fetch_cost();
			$('#harga').empty();
			$('#hargaongkir').empty();
			check_button();
		});

		$('#kurir').change(function() {
			if ($(this).val() == 'jne') {
				console.log('ini kurir jne');
				$('#kurir_jne').show();
				$('#kurir_jnt').hide();
			} else {
				console.log('ini kurir jnt');
				$('#kurir_jne').hide();
				$('#kurir_jnt').show();
			}

			$('#kecamatan').empty(); //kecamatan
			$('#harga').empty();
			$('#hargaongkir').empty();
			fetch_kecamatan(); // kecamatan
			fetch_harga_pro();
			check_button();
		});
		// end here dest code

		$('#showorder').click(function() {
			$('#form_data').trigger("reset");
			$('#modal_tambah').modal('show');
			fetch_provinsi();
		});

		function reload_harga() {
			// console.log("reload mulai");
			// fetch_harga_pro();
			// $('#harga').empty();
			// $('#hargaongkir').empty();
			// check_button();
			// console.log("reload selesai");
			$('#provinsi').empty();
			$('#provinsi').append('<option value="">-Pilih Provinsi-</option>');
			fetch_provinsi();
		}

		function reload_ongkir() {
			fetch_cost();
			$('#harga').empty();
			$('#hargaongkir').empty();
			check_button();
		}

		$('#provinsi').change(function() {
			fetch_kota();
			$('#kota').empty();
			$('#kecamatan').empty(); //kecamatan
			$('#harga').empty();
			$('#hargaongkir').empty();
			fetch_kecamatan(); // kecamatan
			fetch_harga_pro();
			check_button();
		});

		$('#kota').change(function() {
			fetch_kecamatan(); //kecamatan
			// 		fetch_harga(); //kecamatan
			$('#kecamatan').empty() //kecamatan
			$('#harga').empty();
			$('#hargaongkir').empty();
			check_button();
		});

		//kecamatan
		$('#kecamatan').change(function() {
			// fetch_harga(); //kecamatan
			fetch_harga_pro();
			$('#harga').empty();
			$('#hargaongkir').empty();
			check_button();
		});
		//kecamatan

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

			// if (empty || hargaongkir == null || hargaongkir == '') {
			// 	$('#pay-button').prop('disabled', true);
			// } else {
			// 	check_button();
			// }
		});

		function check_button() {
			var empty = false;
			$('.wajib input').each(function() {
				if ($(this).val().length == 0) {
					empty = true;
				}
			});

			// var hargaongkir = document.getElementById("hargaongkir").innerHTML;
			// if (hargaongkir == null || hargaongkir == '') {
			// 	if (empty) {
			// 		$('#pay-button').prop('disabled', true);
			// 	} else {
			// 		$('#pay-button').prop('disabled', true);
			// 	}
			// } else {
			// 	if (empty) {
			// 		$('#pay-button').prop('disabled', true);
			// 	} else {
			// 		$('#pay-button').prop('disabled', false);
			// 	}
			// }
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
					$('#kecamatan').append('<option value="">-Pilih Kecamatan-</option>'); //kecamatan
					$('#harga').append('<option value="">-Pilih Harga-</option>');
					$.each(result, function(index, item) {
						if (item.province_id == province_id) {
							$('#kota').append('<option value="' + item.city_id + '">' + item.city_name + '</option>');
							if (index == 0) {
								console.log("nol");
								// 			fetch_harga(); //kecamatan
								fetch_kecamatan(); //kecamatan
							}
						}
					});
				},
				error: function(e) {
					console.log(e);
				}
			})
		}

		//kecamatan
		function fetch_kecamatan() {
			var city_id = $('#kota').val();
			dataLokasi = {
				'city_id': city_id,
			};
			$.ajax({
				url: "http://merryriana.com/server_api/kecamatan",
				type: "POST",
				dataType: "json",
				data: JSON.stringify(dataLokasi),
				success: function(result) {
					console.log(result);
					$('#kecamatan').append('<option value="">-Pilih Kecamatan-</option>');
					$('#harga').append('<option value="">-Pilih Harga-</option>');
					$.each(result, function(index, item) {
						if (item.city_id == city_id) {
							$('#kecamatan').append('<option value="' + item.subdistrict_id + '">' + item.subdistrict_name + '</option>');
							if (index == 0) {
								console.log("nol");
								// fetch_harga();
								fetch_harga_pro();
							}
						}
					});
				},
				error: function(e) {
					console.log(e);
				}
			})
		}
		//kecamatan

		//kecamatan
		function fetch_harga_pro() {
			var city_id = $('#kota').val();
			var subdistrict_id = $('#kecamatan').val();
			var totalberat = <?php echo $totalberat ?>;
			dataBerat = {
				'berat': totalberat,
				'id_kecamatan_tujuan': subdistrict_id,
				'alamat_lengkap': "Grogol"
			};
			console.log(dataBerat);
			$.ajax({
				url: "http://merryriana.com/server_api/costpro",
				type: "POST",
				dataType: "json",
				data: JSON.stringify(dataBerat),
				success: function(result) {
					console.log(result);
					$('#harga').append('<option value="">-Pilih Harga-</option>');

					// $.each(result, function(index, item) {
					// 	$('#harga').append('<option value="' + item.cost[0].value + '">JNE ' + item.cost[0].etd + ' Hari | ' + item.cost[0].value + '</option>');
					// });

					for (let i = 0; i < result.length; i++) {
						var kurir = result[i];
						var kode = kurir.code.toUpperCase();
						for (let j = 0; j < kurir.costs.length; j++) {
							var layanan = kurir.costs[j];
							var nama_layanan = layanan.service;
							for (let k = 0; k < layanan.cost.length; k++) {
								var item = layanan.cost[k];
								var harga = item.value;
								var etd = item.etd;
								console.log(harga + " " + kode + " " + nama_layanan);
								// 			$('#harga').append('<option value="' + harga + '">' + kode + ' - ' + nama_layanan + ' | Rp. ' + parseInt(harga).toLocaleString()  + '</option>');
								if (kode == "J&T") { // start here dest code
									if (etd != '') {
										$('#harga').append('<option value="' + harga + '">' + kode + ' - ' + nama_layanan + ' | ' + etd + ' hari' + ' | Rp. ' + parseInt(harga).toLocaleString() + '</option>');
									} else {
										$('#harga').append('<option value="' + harga + '">' + kode + ' - ' + nama_layanan + ' | Rp. ' + parseInt(harga).toLocaleString() + '</option>');
									}
								} // end here dest code
							}
						}
					}

				},
				error: function(e) {
					console.log(e);
				}
			})
		}
		//kecamatan

		// start here dest code
		function fetch_cost() {
			console.log($('#destination').val());
			// console.log($('#total_berat').val());
			$.ajax({
				url: "<?= base_url('cart/cost') ?>",
				type: "POST",
				dataType: "json",
				data: {
					'total_berat': <?php echo $totalberat ?>,
					'destination_code': $('#destination').val(), // start here jne
				},
				beforeSend: function() {
					// Show image container
					$("#loader_harga").show();
				},
				success: function(result) {
					console.log(result);

					$('#harga').empty();
					$('#harga').append('<option value="">-Pilih Harga-</option>');

					var data = JSON.parse(result);
					var price = data.price;
					console.log(price);

					$.each(price, function(index, item) {
						if (item.service_display == "REG" || item.service_display == "YES" || item
							.service_display == "OKE" || item.service_display == "CTC" || item
							.service_display == "CTCYES") {
							$('#harga').append('<option value="' + item.price + '">' + 'JNE ' + item
								.service_display + " - Rp. " + item.price + '</option>');
						}
					});
				},
				complete: function(data) {
					// Hide image container
					$("#loader_harga").hide();
				},
				error: function(e) {
					console.log(e);
				}
			});
		}
		// end here dest code

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

		var emailvalidibu;
		var hpvalidayah;
		var hpvalidibu;
		var emailvalidayah;

		$('#pay-button').click(function(event) {

			console.log('pay-button');

			// event.preventDefault();
			// $('#pay-button').prop("disabled", true);
			// $('#pay-button').html('<i class="fas fa-spinner fa-pulse"></i> LOADING...');

			var nameayah = $('#nameayah').val();
// 			var phoneayah = $('#phoneayah').val();
			var phoneayah = noHpAyah.getNumber();
			var emailayah = $('#emailayah').val();
			var nameibu = $('#nameibu').val();
// 			var phoneibu = $('#phoneibu').val();
			var phoneibu = noHpIbu.getNumber();
			var emailibu = $('#emailibu').val();
			var catatan = $('#form_peserta').val();
			var alamat = $('#alamat').val();

			var prov = document.getElementById("provinsi");
			var provinsi = prov.options[prov.selectedIndex].text;

			var city = document.getElementById("kota");
			var kota = city.options[city.selectedIndex].text;
			
			var subdistrict;
			var kecamatan;
			var valueKecamatan;
			
			var destination_code;
			
			var jenisKurir = document.getElementById("kurir"); 
			var valueKurir = jenisKurir.options[jenisKurir.selectedIndex].value;

			// start here dest code
			if ($('#kurir option:selected').text() != "Kurir Pilihan") {
				if ($('#kurir').val() == 'jnt') {
					subdistrict = document.getElementById("kecamatan"); //Kecamatan
			        valueKecamatan = $('#destination').val();
				// 	kecamatan = subdistrict.options[subdistrict.selectedIndex].text;
					
					if(valueKecamatan == null || valueKecamatan == "") {
    					subdistrict.focus();
    				} else {
    					kecamatan = subdistrict.options[subdistrict.selectedIndex].text;
    				}

					destination_code = null;
				} else if ($('#kurir').val() == 'jne') {
					subdistrict = document.getElementById("destination"); //Kecamatan
			        valueKecamatan = $('#destination').val();
				// 	kecamatan = subdistrict.options[subdistrict.selectedIndex].text;
					
				// 	if(typeof subdistrict.options[subdistrict.selectedIndex] === 'undefined') {
					if(valueKecamatan == null || valueKecamatan == "") {
    					subdistrict.focus();
    				} else {
    					kecamatan = subdistrict.options[subdistrict.selectedIndex].text;
    				}

					destination_code = $('#destination').val();
				} else {
				    jenisKurir.focus();
				}
			} else {
				if ($('#kurir option:selected').text() == 'Kurir Pilihan') { //disini
					$("#kurir").focus();
				}
			}

			var element_kode_pos = document.getElementById("kode_pos");
			var kode_pos = $('#kode_pos').val();
			if(kode_pos == null) {
				element_kode_pos.focus();
			}
			// end here dest code

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

			// start here dest code
			var layanan;
			if (ekspedisi.includes("J&T")) {
				layanan = "J&T EZ";
			} else if (ekspedisi.includes("CTCYES")) {
				layanan = "JNE CTCYES";
			} else if (ekspedisi.includes("CTC")) {
				layanan = "JNE CTC";
			} else if (ekspedisi.includes("YES")) {
				layanan = "JNE YES";
			} else if (ekspedisi.includes("REG")) {
				layanan = "JNE REG";
			} else if (ekspedisi.includes("OKE")) {
				layanan = "JNE OKE";
			}
			// end here dest code

			var dataCustomer = {
				id_buku: "MSD_1, Ukuran M",
				name: nameayah + ' ' + phoneayah + ' ' + emailayah + ' ' + nameibu + ' ' + phoneibu + ' ' + emailibu,
				email: emailayah,
				phone: phoneayah,
				// phone: nohpanak + 'Usia Anak ' + usiaanak,
				// phone: null, //perubahan
				shipping_details: alamat + ' ' + kecamatan + ' ' + kota + ' ' + provinsi + ' ' + kode_pos + ' ' + layanan, // start here dest code
				// 			shipping_details: alamat + ' ' + kecamatan + ' ' + kota + ' ' + provinsi + ' ' + kode_pos + ' ' + ekspedisi,
				// 			shipping_details: alamat + ' ' + kecamatan + ' ' + kota + ' ' + provinsi + ' ' + kode_pos,
				// 			shipping_details: alamat + ' ' + kota + ' ' + provinsi + ' ' + ekspedisi,
				catatan: catatan,
				source: "op",
				code: "online_program",
				campaign: "online_program",
				aff: "<?php echo (!empty($user['aff'])) ? $user['aff'] : 'online_program'; ?>",
				order_id: "OP-" + (Math.floor(Math.random() * 10 ** 10)).toString()
			};



			var dataProduk = [];
			var dataProdukOngkir = [];
			var dataItems = <?= json_encode($items); ?>;
			var length = <?= count($items); ?>;
			var stringProduct = '';
			var stringProductDash = '';
			var detailSize = '';
			var detailJumlah = '';
			var total_berat = 0;
			var arrayItems = [];
			var objItem = {
				nama_produk: "",
				jumlah: null,
				harga: null
			}
			for (var i = 0; i < length; i++) {
				var item = {};
				stringProduct += dataItems[i]['program_name'] + ' ' + dataItems[i]['quantity'] + ', ';
				stringProductDash += dataItems[i]['program_name'] + ' - ' + dataItems[i]['quantity'] + ', ';
				detailSize += '0,';
				detailJumlah += dataItems[i]['quantity'] + ',';
				item.id = dataItems[i]['id'];
				item.judul = dataItems[i]['program_name'];
				item.gambar = dataItems[i]['img'];
				item.deskripsi = dataItems[i]['deskripsi'];
				item.kategori = "Kategori";
				item.harga = dataItems[i]['price'];
				item.jumlah = dataItems[i]['quantity'];
				item.berat = dataItems[i]['berat'];
				dataProduk.push(item);

				total_berat += parseInt(dataItems[i]['berat'] * dataItems[i]['quantity']);

				objItem.nama_produk = dataItems[i]['program_name'];
				objItem.jumlah = dataItems[i]['quantity'];
				objItem.harga = dataItems[i]['price'];
				arrayItems.push(objItem);
			}

			var detail_alamat = {
				kelurahan: alamat,
				kecamatan: kecamatan,
				kota: kota,
				provinsi: provinsi,
				kode_pos: kode_pos,
				ekspedisi: ekspedisi,
				total_berat: total_berat,
				ongkir: harga,
				destination_code: destination_code
			};

			dataProdukOngkir = dataProduk.slice();
			dataProdukOngkir.push(ongkir);
			// stringProduct += ekspedisi + ' ';
			stringProduct += catatan;
			dataCustomer.id_buku = stringProduct;

			// start here tambah anak
			var hasil = getArray($("#form_peserta"));
			console.log("hasil : " + hasil);
			hasil.forEach(function(item) {
				var string = "";
				console.log("string : " + string);
				key = item.name;
				console.log("key : " + key);
				// value = item.value;
				//perubahan
				if(key == 'nohpanak') {
					console.log(arrayInputNumber);
					var array = [];
					arrayInputNumber.forEach(item => {
						array.push(item.getNumber())
					});
					value = [];
					value.push(array);
				} else {
					value = item.value;
				}
				//perubahan
				console.log("value : " + value);
				value.forEach(item => {
					string += item + ", ";
					console.log("string : " + string);
				})
				console.log("string : " + string);
				Object.assign(dataCustomer, {
					[key]: string
				});
			});
			console.log(dataCustomer);

			var nama_peserta = dataCustomer.catatan;
			var usia_anak = dataCustomer.usiaanak;
			var hp_anak = dataCustomer.nohpanak;
			var email_anak = dataCustomer.emailanak;

			var string_peserta = 'Nama Peserta (' + nama_peserta + '), Usia (' + usia_anak + '), No HP (' + hp_anak + '), Email (' + email_anak + ')';
			dataCustomer.catatan = string_peserta;
// 			dataCustomer.phone = dataCustomer.nohpanak + 'Usia Anak ' + dataCustomer.usiaanak //perubahan
			// end here tambah anak

			var dataMerch = [];
			dataMerch.push(dataCustomer);
			dataMerch.push(dataProdukOngkir);

			console.log(dataMerch);
			
			var empty = false;
			
			$('.wajib input').each(function() {
                console.log($(this))
                console.log($(this).val())
				if ($(this).val() == "" || $(this).val() == null) {
					$(this).focus();
					empty = true;
					return false;
				} else {
				// 	empty = false;
				}
			});
			
			$('.wajib select').each(function() {
                console.log($(this))
                console.log($(this).val())
				if ($(this).val() == "" || $(this).val() == null) {
					$(this).focus();
					empty = true;
					return false;
				} else {
				    // console.log('MIDTRANS!!!');
				}
			});
			
			console.log('jumlah anak ' + jumlah_anak);
			
			for(let i=0; i<jumlah_anak; i++) {
			 //   var elementEmail = document.getElementsByClassName("email-ke" + i);
			    var checkEmail = $('.email-ke' + i).val();
			    console.log('cek email ' + checkEmail);
			    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var result = re.test(checkEmail);
                if(!result) {
                    // elementEmail.focus();
                    // document.getElementsByClassName("email-ke" + i).focus();
                    $('.email-ke' + i).first().focus();
                    empty = true;
                    $('.email-validation-ke' + i).show();
                } else {
                    $('.email-validation-ke' + i).hide();
                }
			}
			
			arrayInputNumber.forEach((item, index) => {
				var hp = item.getNumber();
			    console.log('cek hp dari array ' + hp);
			    if(hp == null || hp == "" || hp.length < 11) {
                    // elementHp.focus();
                    // document.getElementsByClassName("hp-ke" + i).focus();
                    $('.hp-ke' + index).first().focus();
                    empty = true;
                    $('.hp-validation-ke' + index).show();
                } else {
                    $('.hp-validation-ke' + index).hide();
                }
			});
			
// 			for(let i=0; i<jumlah_anak; i++) {
// 			    var elementHp = document.getElementsByClassName("hp-ke" + i);
// 			    var checkHP = elementHp.getNumber();
// 			 //   var checkHP = $('.hp-ke' + i).val();
// 			    console.log('cek hp ' + checkHP);
//                 if(checkHP == null || checkHP == "" || checkHP.length < 8) {
//                     // elementHp.focus();
//                     // document.getElementsByClassName("hp-ke" + i).focus();
//                     empty = true;
//                     $('.hp-validation-ke' + i).show();
//                 } else {
//                     $('.hp-validation-ke' + i).hide();
//                 }
// 			}
			
			console.log('empty ' + empty);
			
			if(!empty) {
				console.log('MIDTRANS!!!');
				$.ajax({
    				url: "https://merryriana.com/server_api/payment",
    				type: "POST",
    				data: JSON.stringify(dataMerch),
    				dataType: "json",
    				success: function(response) {
    					console.log(response);
    
    
    					$.ajax({
    						url: "<?php echo base_url('cartprogramican/clear'); ?>",
    						type: "GET",
    						success: function(res) {
    							console.log("Clear");
    							window.location.href = response;
    						}
    					})
    
    				},
    				error: function(e) {
    					console.log(e);
    				}
    			});
			}

//             $('.wajib input').each(function() {
//                 console.log($(this))
//                 console.log($(this).val())
// 				if ($(this).val() == "" || $(this).val() == null) {
// 					$(this).focus();
// 					return false;
// 				} else {
// 					$('.wajib select').each(function() {
//                         console.log($(this))
//                         console.log($(this).val())
// 						if ($(this).val() == "" || $(this).val() == null) {
// 							$(this).focus();
// 							return false;
// 						} else {
						    
// 						    console.log('MIDTRANS!!!');

// 				// 			$.ajax({
// 				// 				url: "https://merryriana.com/server_api/payment",
// 				// 				type: "POST",
// 				// 				data: JSON.stringify(dataMerch),
// 				// 				dataType: "json",
// 				// 				success: function(response) {
// 				// 					console.log(response);

// 				// 					$.ajax({
// 				// 						url: "<?php echo base_url('cartprogramican/clear'); ?>",
// 				// 						type: "GET",
// 				// 						success: function(res) {
// 				// 							console.log("Clear");
// 				// 							window.location.href = response;
// 				// 						}
// 				// 					})

// 				// 				},
// 				// 				error: function(e) {
// 				// 					console.log(e);
// 				// 				}
// 				// 			});

// 						}
// 					});
// 				}
// 			});

// 			$.ajax({
// 				url: "https://merryriana.com/server_api/payment",
// 				type: "POST",
// 				data: JSON.stringify(dataMerch),
// 				dataType: "json",
// 				success: function(response) {
// 					console.log(response);


// 					$.ajax({
// 						url: "<?php echo base_url('cartprogramican/clear'); ?>",
// 						type: "GET",
// 						success: function(res) {
// 							console.log("Clear");
// 							window.location.href = response;
// 						}
// 					})

// 				},
// 				error: function(e) {
// 					console.log(e);
// 				}
// 			});

			if (nameayah != '' && hpvalidayah == "true" && emailayah != '' && emailvalidayah == "true" && nameibu != '' && emailibu != '' && phoneibu != '' && hpvalidibu == "true" && emailvalidibu == "true" && alamat != '' && $('#provinsi option:selected').text() != "-Pilih Provinsi-" && kota != '-Pilih Kota-') {
				$.ajax({
					url: "https://leads.merryriana.com/post_data/input_merch_wordpress",
					type: "POST",
					data: {
						'id_buku': dataCustomer.id_buku,
						'name': nameayah,
						'email': emailayah,
						'phone': phoneayah,
						'shipping_details': dataCustomer.shipping_details + ' Ibu ' + nameibu + ' HPIbu ' + phoneibu + ' emialIbu ' + emailibu,
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


				if ((dataCustomer.aff != '') && (dataCustomer.aff != 'ads') && (dataCustomer.aff != 'LP') && (dataCustomer.aff != 'M1')) {
					var price = document.getElementById("harga");
					var harga = price.options[price.selectedIndex].value;
					var total = <?= $total; ?>;

					// $.ajax({
					//     url: "https://leads.merryriana.com/post_data/",
					//     type: 'POST',
					//     dataType: 'json',
					//     data: {
					//         'name': name,
					//         'email': email,
					//         'phone': phone,
					//         'branch': '-',
					//         'program_mr': '-',
					//         'source': dataCustomer.source,
					//         'code': dataCustomer.code,
					//         'campaign': dataCustomer.campaign,
					//         'referral': dataCustomer.aff
					//     },
					//     success: function(result) {
					//         console.log(result);
					//     },
					//     error: function(xhr, status, errorThrown) {
					//         // $("form").submit();
					//     }
					// });

					// for (let i = 0; i < dataProduk.length; i++) {
					const item = dataProduk[0];

					// 			$.ajax({
					// 			url: "https://m1.merryriana.com/merchandise/send_data_op",
					// 			type : "POST",
					// 			data: {
					// 						'merch_id': item.id,
					// 						'name': name,
					// 						'email': email,
					// 						'phone_redirect': phone,
					// 						'shipping_details': dataCustomer.shipping_details,
					// 						'source': dataCustomer.source,
					// 						'code': dataCustomer.code,
					// 						'campaign': dataCustomer.campaign,
					// 						'aff': dataCustomer.aff
					// 					},
					// 			dataType: "json",
					// 			success: function(response) {
					// 				console.log(response);			
					// 			},
					// 			});

					// 		}

					$.ajax({
						url: "https://m1.merryriana.com/post_data/update_address_op",
						type: "POST",
						data: {
							'id_buku': dataCustomer.id_buku + nama_peserta + 'Usia ' + usia_anak,
							'name': nameayah,
							'email': emailayah,
							'phone': phoneayah,
							'shipping_details': dataCustomer.shipping_details,
							'total': parseInt(harga) + parseInt(total),
							'ongkir': parseInt(harga),
							'json': JSON.stringify(arrayItems),
							'detail_alamat': JSON.stringify(detail_alamat),
							'detail_size': detailSize,
							'detail_jumlah': detailJumlah,
							'string_product': stringProductDash,
							'source': dataCustomer.source,
							'code': dataCustomer.code,
							'data_anak': string_peserta,
							'data_ibu': nameibu + ', ' + phoneibu + ', ' + emailibu,
							'data_ayah': nameayah + ', ' + phoneayah + ', ' + emailayah,
							'campaign': dataCustomer.campaign,
							'aff': dataCustomer.aff,
							'order_id': dataCustomer.order_id,
							'nama_anak': nama_peserta,
							'usia_anak': usia_anak,
							'id_op': item.id
						},
						dataType: "json",
						crossDomain: true,
						success: function(response) {
							console.log(response);
						},
					});

				}
			} else {
				if (nameayah == '') {
					$("#nameayah").focus();
				} else if (phoneayah == '') {
					$("#phoneayah").focus();
				} else if (hpvalidayah == "false") {
					$("#phoneayah").focus();
				} else if (emailayah == '') {
                    $("#emailayah").focus();
                } else if (emailvalidayah == "false") {
                    $("#emailayah").focus();
                } else if (nameibu == '') {
					$("#nameibu").focus();
				} else if (phoneibu == '') {
					$("#phoneibu").focus();
				} else if (hpvalidibu == "false") {
					$("#phoneibu").focus();
				} else if (emailibu == '') {
                    $("#emailibu").focus();
                } else if (emailvalidibu == "false") {
                    $("#emailibu").focus();
                } else if (alamat == '') {
					$("#alamat").focus();
				} else if (provinsi == '-Pilih Provinsi-') {
					$("#provinsi").focus();
				} else if (kota == '-Pilih Kota-') {
					$("#kota").focus();
				}
			}


		});

		function reload_page() {
			window.location.reload();
		}
	</script>
</body>

</html>