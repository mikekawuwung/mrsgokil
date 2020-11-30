<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link rel="icon" href="<?= base_url('assets/img/merchandise/favicon.png') ?>" />

    <title>Cart Healthy Box M Kitchen - Merry Riana Group</title>

    <!-- Bootstrap core CSS -->
    <link href="<?= base_url(); ?>assets/hb/assets/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="<?= base_url(); ?>assets/hb/assets/form-validation.css" rel="stylesheet" />
    <link href="<?= base_url(); ?>assets/bower_components/select2/dist/css/select2.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://merryriana.com/BeTheGood-m1/build/css/intlTelInput.css">
    <style>
        .iti__flag {background-image: url("https://merryriana.com/BeTheGood-m1/build/img/flags.png");}
        
        .iti--allow-dropdown{
            margin-bottom:0px !important;    
        }
        
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .iti__flag {background-image: url("https://merryriana.com/BeTheGood-m1/build/img/flags@2x.png");}
        }
        
        .iti--allow-dropdown {
            width: 100%;
            /*margin-bottom: 25px;*/
        }
    </style>
    <script src="https://merryriana.com/BeTheGood-m1/build/js/intlTelInput.js"></script>
</head>

<body class="bg-light">
    <div class="container">
        <div class="py-5 text-center">
            <h2>Silakan Pilih Menu di Bawah Ini:</h2>
            <p class="lead">
                Minimal untuk menu yang Anda pesan adalah 3 Box. Silakan pesan.
            </p>
        </div>

        <div class="row">
            <?php foreach ($products as $produk) { ?>
                <div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="<?= base_url('assets/hb/assets/img/' . $produk['gambar']); ?>" alt="Card image cap" />
                        <div class="card-body">
                            <h5><?= $produk['nama']; ?></h5>
                            <p class="card-text">
                                <?= $produk['deskripsi'] ?>
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button id="produk<?= $produk['id']; ?>" type="button" class="btn btn-sm btn-outline-danger" onclick="add_to_cart(<?= $produk['id'] ?>)">
                                        Tambahkan ke Keranjang
                                    </button>
                                </div>
                                <small class="text-muted">Rp. <?= number_format($produk['harga']); ?></small>
                            </div>
                        </div>
                    </div>
                </div>
            <?php } ?>
        </div>

        <div class="row">
            <div class="col-md-6 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Pesanan Anda</span><small id="minimal" style="color: red !important; display:none;" class="text-muted">Minimal Pemesanan 3 pcs</small>
                    <span class="badge badge-secondary badge-pill" id="counter">3</span>
                </h4>
                <ul class="list-group mb-3" id="cart_list">
                </ul>
            </div>
            <div class="col-md-6 order-md-1">
                <h4 class="mb-3">Detail Pesanan</h4>
                <div class="needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-12 mb-3 wajib">
                            <label for="nama">Nama <small style="color: red;">*required</small></label>
                            <input type="text" class="form-control" name="nama" id="nama" placeholder="" value="<?php echo (!empty($user['name'])) ? $user['name'] : '' ?>" required />
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 wajib">
                        <label for="email">Email <small style="color: red;">*required</small></label>
                        <input type="email" class="form-control" name="email" id="email" placeholder="" value="<?php echo (!empty($user['email'])) ? $user['email'] : '' ?>" />
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>

                    <div class="mb-3 wajib">
                        <label for="phone">No HP <small style="color: red;">*required</small></label>
                        <input type="text" class="form-control numeric" name="phone" id="phone" placeholder="" value="<?php echo (!empty($user['phone'])) ? str_replace(' ', '', $user['phone']) : '' ?>" />
                    </div>

                    <!--<div class="mb-3">-->
                    <!--    <label for="catatan">Catatan (Optional)</label>-->
                    <!--    <input type="catatan" class="form-control" name="catatan" id="catatan" placeholder="" />-->
                    <!--    <div class="invalid-feedback">-->
                    <!--        Please enter a valid email address for shipping updates.-->
                    <!--    </div>-->
                    <!--</div>-->

                    <div class="mb-3 wajib">
                        <label for="address">Alamat <small style="color: red;">*required</small></label>
                        <input type="text" class="form-control" name="alamat" id="alamat" placeholder="" required />
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="country">Provinsi <small style="color: red;">*required</small></label><img id="loader_provinsi" style="display:none;" class="mx-2" src="<?= base_url('assets/25.gif'); ?>" width='16px' height='16px'></img>
                            <select class="custom-select d-block w-100" name="provinsi" id="provinsi" required>
                                <option value="">-Pilih Provinsi-</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="country">Kota <small style="color: red;">*required</small></label><img id="loader_kota" style="display:none;" class="mx-2" src="<?= base_url('assets/25.gif'); ?>" width='16px' height='16px'></img>
                            <select class="custom-select d-block w-100" name="kota" id="kota" required>
                                <option value="">-Pilih Kota-</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="country">Kecamatan <small style="color: red;">*required</small></label><img id="loader_kecamatan" style="display:none;" class="mx-2" src="<?= base_url('assets/25.gif'); ?>" width='16px' height='16px'></img>
                            <select class="custom-select d-block w-100" name="kecamatan" id="kecamatan" required>
                                <option value="">-Pilih Kecamatan-</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="country">Kode Pos <small style="color: red;">*required</small></label>
                            <select id="kode_pos" name="kode_pos" class="form-control"></select>
                            <input type="hidden" id="no_kode_pos" value=""></input>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                    </div>

                    <hr class="mb-4" />

                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">Subtotal</h6>
                            </div>
                            <span class="text-muted" id="subtotal"></span>
                        </li>
                        <li id="ongkos_kirim" class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">Ongkir</h6>
                            </div>
                            <span class="text-muted" id="ongkir"></span>
                        </li>
                        <li style="display:none !important;" id="free_ongkos_kirim" class="list-group-item d-flex justify-content-between bg-light">
                            <div class="text-success">
                                <h6 class="my-0">Free Ongkir</h6>
                            </div>
                            <span class="text-success" id="free_ongkir"></span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">Total</h6>
                            </div>
                            <span class="text-muted" id="total"></span>
                        </li>
                    </ul>

                    <button id="submit_button" class="btn btn-primary btn-lg btn-block" onclick="submit_data()" type="button">
                        Pesan Sekarang
                    </button>
                    <!-- <button id="disable_button" class="btn btn-primary btn-lg btn-block" type="button" disabled>
                        Continue
                    </button> -->
                </div>
            </div>
        </div>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="text-center" style="font-size:14px;">Copyright © 2020 PT Merry Riana
                                                Motivasi. All Rights Reserved.</p>
            <!-- <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul> -->
        </footer>
    </div>
    
    <!-- snap  -->
	<form id="payment-form-m1" method="post" action="https://m1salesforce.com/thanks/payment">
		<input type="hidden" name="<?= $this->security->get_csrf_token_name(); ?>" value="<?= $this->security->get_csrf_hash(); ?>" required>
		<input type="hidden" name="result_type" id="result-type-m1" value=""></div>
		<input type="hidden" name="result_data" id="result-data-m1" value=""></div>
	</form>
	
	<script type="text/javascript" src="https://app.midtrans.com/snap/snap.js" data-client-key="Mid-client-s37TjiIpP7nb5J1u"></script>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script> -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    <script>
        window.jQuery ||
            document.write(
                '<script src="' + '<?= base_url(); ?>assets/hb/' + 'assets/js/vendor/jquery-slim.min.js"><\/script>'
            );
    </script>
    <script src="<?= base_url(); ?>assets/hb/assets/js/vendor/popper.min.js"></script>
    <script src="<?= base_url(); ?>assets/hb/assets/dist/js/bootstrap.min.js"></script>
    <script src="<?= base_url(); ?>assets/hb/assets/js/vendor/holder.min.js"></script>
    <script src="<?= base_url(); ?>assets/bower_components/select2/dist/js/select2.full.min.js"></script>
    <script>
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function() {
            "use strict";

            window.addEventListener(
                "load",
                function() {
                    // Fetch all the forms we want to apply custom Bootstrap validation styles to
                    var forms = document.getElementsByClassName("needs-validation");

                    // Loop over them and prevent submission
                    var validation = Array.prototype.filter.call(forms, function(
                        form
                    ) {
                        form.addEventListener(
                            "submit",
                            function(event) {
                                if (form.checkValidity() === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                form.classList.add("was-validated");
                            },
                            false
                        );
                    });
                },
                false
            );
        })();
    </script>
    <script type="text/javascript">
        $(document).ready(function() {
            fetch_provinsi();
            update_ui();


            $('#submit_button').prop('disabled', true);

            $('#kode_pos').select2({
                placeholder: '--- Ketik Nama Kelurahan ---',
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
        
        var inputHp = document.querySelector("#phone");
            var intelInputNumber = window.intlTelInput(inputHp, {
              initialCountry: "id",
              separateDialCode: true,
              geoIpLookup: function(callback) {
                $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                  var countryCode = (resp && resp.country) ? resp.country : "";
                  callback(countryCode);
                });
              },
              utilsScript: "https://merryriana.com/BeTheGood-m1/js/utils.js"
            });

        var products = <?= json_encode($products) ?>;
        var cart = [];
        var free_ongkir = 0;
        var ongkir = 0;
        var bonus = 1;
        var jumlah_item = 0;
        var total_harga = 0;

        function add_to_cart(id) {

            var found = false;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].id == id) {
                    console.log(cart[i].id, id);
                    found = true;
                    break;
                }
            }

            var exist = found;
            console.log(exist);

            if (exist) {
                $.each(cart, function(index, value) {
                    if (value['id'] == id) {
                        value['jumlah'] += 1;
                    }
                });
            } else {
                $.each(products, function(index, value) {
                    if (value['id'] == id) {
                        value['jumlah'] = 1;
                        cart.push(value);
                    }
                });
            }

            console.log(cart);
            update_ui();
        }

        function get_total_harga() {
            total_harga = 0;
            $.each(cart, function(index, item) {
                total_harga += item['harga'] * item['jumlah'];
            });

            return total_harga;
        }

        function get_jumlah_item() {
            jumlah_item = 0;
            $.each(cart, function(index, item) {
                jumlah_item += item['jumlah'];
            });
            if (jumlah_item > 0) {
                return jumlah_item;
            } else {
                return 0;
            }
        }

        function update_ui() {
            $('#cart_list').empty();
            var jumlah_item = get_jumlah_item();

            if (cart.length == 0) {
                $('#cart_list').append(`<li class="list-group-item d-flex justify-content-center lh-condensed">
                        <div>
                            <p class="my-0 text-center">Keranjang Belanja Anda Kosong</p>
                        </div>
                    </li>`);
            } else {

                $.each(cart, function(index, item) {
                    $('#cart_list').append(`<li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="mb-1">` + item['nama'] + `</h6>
                                <button onclick="kurang(` + item['id'] + `)" type="button" class="btn btn-sm btn-outline-secondary">
                                    -
                                </button>
                                <small class="text-muted">` + item['jumlah'] + `</small>
                                <button type="button" onclick="tambah(` + item['id'] + `)" class="btn btn-sm btn-outline-secondary">
                                    +
                                </button>
                            </div>
                            <div>
                            
                            <h6 class="mb-1 text-right" onclick="hapus(` + item['id'] + `)" style="cursor:pointer">X</h6>
                            <span class="text-muted">Rp. ` + item['harga'].toLocaleString() + `</span>
                            </div>
                        </li>`);
                });

                var total_harga = get_total_harga();

                if (ongkir != 0) {
                    append_ongkir(ongkir);
                }

                if (jumlah_item >= 5 && jumlah_item <= 7) {
                    free_ongkir = (ongkir < 10000) ? ongkir : 10000;
                    // append_free_ongkir(free_ongkir)
                    $('#minimal').hide();
                } else if (jumlah_item >= 8 && jumlah_item <= 9) {
                    free_ongkir = (ongkir < 20000) ? ongkir : 20000;
                    // append_free_ongkir(free_ongkir)
                    $('#minimal').hide();
                } else if (jumlah_item >= 10) {
                    free_ongkir = (ongkir < 20000) ? ongkir : 20000;
                    // append_free_ongkir(free_ongkir)
                    append_bonus(bonus);
                    $('#minimal').hide();
                } else {
                    if (jumlah_item > 0 && jumlah_item < 3) {
                        $('#minimal').show();
                    } else if (jumlah_item == 0) {
                        $('#minimal').hide();
                        alert('Here'); 

                    } else {
                        $('#minimal').hide();
                    }
                    free_ongkir = 0;
                }

                $('#cart_list').append(`<li class="list-group-item d-flex justify-content-between">
                            <span>Subtotal</span>
                            <strong>Rp. ` + (total_harga).toLocaleString() + `</strong>
                        </li>`);

            }

            if (total_harga != null) {
                $('#subtotal').html('Rp. ' + total_harga.toLocaleString());
            }

            if (ongkir != 0) {
                $('#ongkir').html('Rp. ' + ongkir.toLocaleString());
            }

            if (free_ongkir != 0 && ongkir != 0) {
                $('#free_ongkir').html('-Rp. ' + free_ongkir.toLocaleString());
                $('#free_ongkos_kirim').show();
            } else {
                $('#free_ongkos_kirim').hide();
            }

            if (total_harga != null && ongkir != 0) {
                $('#total').html('Rp. ' + (total_harga + ongkir - free_ongkir).toLocaleString());
            }

            $('#counter').html(jumlah_item);

            // if(cart.length == 0) {
            // 	$('#submit-button').hide();
            // 	$('#disable-button').show();
            // } else {
            // 	$('#submit-button').show();
            // 	$('#disable-button').hide();
            // }

            check_button();

        }

        function append_ongkir(ongkir) {
            $('#cart_list').append(`<li class="list-group-item d-flex justify-content-between bg-light">
                            <div>
                                <h6 class="my-0">Ongkir</h6>
                            </div>
                            <span>Rp. ` + ongkir.toLocaleString() + `</span>
                        </li>`);
        }

        function append_free_ongkir(free_ongkir) {
            $('#cart_list').insertAfter(`<li class="list-group-item d-flex justify-content-between bg-light">
                            <div class="text-success">
                                <h6 class="my-0">Free Ongkir</h6>
                            </div>
                            <span class="text-success">-Rp. ` + free_ongkir.toLocaleString() + `</span>
                        </li>`);
        }

        function append_bonus(bonus) {
            console.log("bonus " + bonus);
            $('#cart_list').append(`<li class="list-group-item d-flex justify-content-between bg-light">
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Bonus</label>
            </div>
            <select class="custom-select" id="bonus">
                <option value="165" ` + ((bonus == 165) ? 'selected' : 'selected') + ` >Protein Booster</option>
                <option value="166" ` + ((bonus == 166) ? 'selected' : '') + ` >Low Fat Salted Egg</option>
                <option value="167" ` + ((bonus == 167) ? 'selected' : '') + ` >Diet Bolognese</option>
                <option value="168" ` + ((bonus == 168) ? 'selected' : '') + ` >Fit Curry</option>
                <option value="169" ` + ((bonus == 169) ? 'selected' : '') + ` >Healthy Pindasaus</option>
            </select>
            </div>
        </li>`);
        }

        $(document).on('change', 'select', function() {
            bonus = $(this).val();
            console.log(bonus);
        });

        $('.wajib input').keyup(function() {
            check_button();
        });

        $('.numeric').keyup(function(e) {
            if (/[^+\d]/g.test(this.value)) {
				this.value = this.value.replace(/[^+\d]/g, '');
			}
        });

        function check_button() {
            var empty = false;
            $('.wajib input').each(function() {
                if ($(this).val().length == 0) {
                    empty = true;
                }
            });
            
            console.log(cart.length);
            
            var itemCount = get_jumlah_item();

            var provinsi = $('#provinsi').val();
            var kota = $('#kota').val();
            var kecamatan = $('#kecamatan').val();
            var kode_pos = $('#kode_pos').val();
            console.log(provinsi, kota, kecamatan, kode_pos);
            if (empty || kode_pos == null || kode_pos == '' || provinsi == null || provinsi == '' || kota == null || kota == '' || kecamatan == null || kecamatan == '' || cart.length == 0 || itemCount < 3) {
                if (empty) {
                    console.log('1');
                    $('#submit_button').prop('disabled', true);
                } else {
                    console.log('2');
                    $('#submit_button').prop('disabled', true);
                }
                console.log('empty');
            } else {
                if (empty) {
                    console.log('3');
                    $('#submit_button').prop('disabled', true);
                    console.log('empty');
                } else {
                    console.log('4');
                    $('#submit_button').prop('disabled', false);
                    console.log('not empty');
                }
            }
        }
        
        // snap 
		function showSnap(token, source) {
			snap.pay(token, {
				onSuccess: function(result){
					changeResult('success', result, source);
				},
				onPending: function(result){
					changeResult('pending', result, source);
				},
				onError: function(result){
					changeResult('error', result, source);
				}
			});
		}

		// snap 
		function changeResult(type, data, source){
			if(source == 'm1') {
				$("#result-type-m1").val(type);
				$("#result-data-m1").val(JSON.stringify(data));
				$("#payment-form-m1").submit();
			} else {
				$("#result-type-mrg").val(type);
				$("#result-data-mrg").val(JSON.stringify(data));
				$("#payment-form-mrg").submit();
			}
		}

        function submit_data() {

            $('#submit_button').prop('disabled', true);
            $('#submit_button').html('Mohon tunggu...');
            
            var countryData = intelInputNumber.getSelectedCountryData();
            var phone = "+" + countryData.dialCode + $('#phone').val();
            
            // data pembeli
    		var dataPembeli = {
    			nama: $('#nama').val(),
    			hp: phone,
    			email: $('#email').val()
    		};

            var prov = document.getElementById("provinsi");
            var provinsi = prov.options[prov.selectedIndex].text;

            var city = document.getElementById("kota");
            var kota = city.options[city.selectedIndex].text;

            var subdistrict = document.getElementById("kecamatan"); //Kecamatan
            var kecamatan = subdistrict.options[subdistrict.selectedIndex].text;

            var kode_pos = $('#kode_pos').val();

            var dataCustomer = {
                id_buku: "",
                name: $('#nama').val(),
                email: $('#email').val(),
                phone: phone,
                shipping_details: $('#alamat').val() + ' ' + kecamatan + ' ' + kota + ' ' + provinsi + ' ' + kode_pos,
                catatan: '-',
                source: "m1",
                code: "healthybox",
                campaign: "healthybox-mkitchen",
                aff: "<?php echo (!empty($user['aff'])) ? $user['aff'] : 'merryrianashop'; ?>",
                order_id: "MERCH-M1-" + (Math.floor(Math.random() * 10 ** 10)).toString()
            };

            console.log(dataCustomer, cart, ongkir, free_ongkir, total_harga);

            var dataProduk = [];
            var dataProdukOngkir = [];
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
            
    		// data product
    		var arrayProduct = [];

            var ongkos = {
                id: "ONGKIR",
                judul: "ONGKOS KIRIM",
                gambar: null,
                deskripsi: null,
                kategori: null,
                harga: ongkir - free_ongkir,
                jumlah: 1,
                berat: 0
            }

            for (var i = 0; i < cart.length; i++) {
                var item = {};

                stringProduct += cart[i]['nama_produk'] + ' ' + cart[i]['jumlah'] + ', ';

                stringProductDash += cart[i]['nama_produk'] + ' - ' + cart[i]['jumlah'] + ' - ' + '0' + ', ';
                detailSize += '0,';

                detailJumlah += cart[i]['jumlah'] + ',';
                total_berat += parseInt(cart[i]['berat'] * cart[i]['jumlah']);

                item.id = cart[i]['id'];
                item.judul = cart[i]['nama'];
                item.harga = cart[i]['harga'];
                item.jumlah = cart[i]['jumlah'];
                dataProduk.push(item);

                objItem.nama_produk = cart[i]['nama_produk'];
                objItem.jumlah = cart[i]['jumlah'];
                objItem.harga = cart[i]['harga'];
                arrayItems.push(objItem);
                
    			// data product
    			var objectProduct = {
    				id: cart[i]['id'],
    				productName: cart[i]['nama_produk'],
    				jumlah: cart[i]['jumlah'],
    				berat: cart[i]['berat'],
    				harga: cart[i]['harga'],
    			}
    			arrayProduct.push(objectProduct);
    			
            }

            if (jumlah_item >= 10) {
                var bonus = document.getElementById("bonus");
                var nama_bonus = bonus.options[bonus.selectedIndex].text;
                var id_bonus = bonus.options[bonus.selectedIndex].value;

                var item = {};
                item.id = parseInt(id_bonus);
                item.judul = "BONUS " + nama_bonus;
                stringProduct += item.judul + ', ';
                item.harga = 0;
                item.jumlah = parseInt(1);
                dataProduk.push(item);
                
    			// data product
    			var objectProduct = {
    				id: parseInt(id_bonus),
    				productName: "BONUS " + nama_bonus,
    				jumlah: parseInt(1),
    				berat: 300,
    				harga: 0,
    			}
    			arrayProduct.push(objectProduct);
            }

            var detail_alamat = {
                kelurahan: $('#alamat').val(),
                kecamatan: kecamatan,
                kota: kota,
                provinsi: provinsi,
                kode_pos: kode_pos,
                ekspedisi: "Paxel",
                total_berat: total_berat,
                ongkir: ongkir - free_ongkir,
                destination_code: null
            };
            
            // data pengiriman
    		var objectPengiriman = {
    			kelurahan: $('#alamat').val(),
    			destinationCode: null,
    			kecamatanId: null,
    			kecamatan: kecamatan,
    			kota: kota,
    			provinsi: provinsi,
    			kodePos: kode_pos,
    			namaEkspedisi: "Paxel",
    			layananEkspedisi: "",
    			ongkir: ongkir - free_ongkir,
    			orderId: dataCustomer.order_id,
    			aff: "<?php echo (!empty($user['ref'])) ? $user['ref'] : null; ?>",
    			share: "<?php echo (!empty($user['share'])) ? $user['share'] : 'copy'; ?>",
    			aff_id: "<?php echo (!empty($user['aff_id'])) ? $user['aff_id'] : null; ?>",
    		};
    		
    		if(objectPengiriman.aff.length > 4) {
                var item = {};
    			item.id = "ADMIN";
                item.judul = "BIAYA ADMIN";
                item.harga = 5000;
                item.jumlah = 1;
                dataProduk.push(item);
    		}

            dataProdukOngkir = dataProduk.slice();
            dataProdukOngkir.push(ongkos);

            stringProduct += $('#catatan').val();
            dataCustomer.id_buku = stringProduct;

            var dataMerch = [];
            dataMerch.push(dataCustomer);
            dataMerch.push(dataProdukOngkir);

            console.log(dataMerch);
            
            // data gabungan
    		var dataTransaksi = {
    			dataPembeli: dataPembeli,
    			dataProduct: arrayProduct,
    			dataPengiriman: objectPengiriman
    		}
    		console.log('data transaksi');
    		console.log(dataTransaksi);

		    if(objectPengiriman.aff == "" || objectPengiriman.aff == null) {
		        
                $.ajax({
                    // url: "https://merryriana.com/server_api/payment_m1sf",
        				url: "https://merryriana.com/server_api/payment_snap", // snap
                    type: "POST",
                    data: JSON.stringify(dataMerch),
                    dataType: "json",
                    success: function(response) {
                        console.log(response);
                        var link = response
                        
        					var linkPembayaran = response.redirect_url; //snap
                		dataTransaksi.dataPengiriman.url = linkPembayaran;
                		
							showSnap(response.token, 'm1'); // snap 
                        
                        // ajax kiriman
                		$.ajax({
                			url: "https://m1salesforce.com/receive_data_mrshop",
            				type: "POST",
            				data: JSON.stringify(dataTransaksi),
            				dataType: "json",
                			success: function(response) {
                				console.log(response);    
            				// 	window.location.href = link;
                                $('#submit_button').prop('disabled', false);
                                $('#submit_button').html('Pesan Sekarang');
            				},
            				error: function(e) {
                				console.log(e);
                			}
                		});
    
                        // window.location.href = response;
    
    
                    }
                });
            
		    } else {
		        
		        $.ajax({
        				url: "https://merryriana.com/server_api/payment_snap", // snap
                    type: "POST",
                    data: JSON.stringify(dataMerch),
                    dataType: "json",
                    success: function(response) {
                        console.log(response);
                        var link = response
                        
        					var linkPembayaran = response.redirect_url; //snap
                		dataTransaksi.dataPengiriman.url = linkPembayaran;
                		
							showSnap(response.token, 'm1'); // snap 
                        
                        // ajax kiriman
                		$.ajax({
                			url: "https://m1salesforce.com/receive_data_mrshop",
            				type: "POST",
            				data: JSON.stringify(dataTransaksi),
            				dataType: "json",
                			success: function(response) {
                				console.log(response);    
            				// 	window.location.href = link;
                                $('#submit_button').prop('disabled', false);
                                $('#submit_button').html('Pesan Sekarang');
            				},
            				error: function(e) {
                				console.log(e);
                			}
                		});
    
                        // window.location.href = response;
    
    
                    }
                });
                
		    }

            $.ajax({
                url: "https://leads.merryriana.com/post_data/input_merch_wordpress",
                type: "POST",
                data: {
                    'id_buku': dataCustomer.id_buku,
                    'name': dataCustomer.name,
                    'email': dataCustomer.email,
                    'phone': dataCustomer.phone,
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

        function tambah(id) {
            $.each(cart, function(index, value) {
                if (value['id'] == id) {
                    value['jumlah'] += 1;
                }
            });
            update_ui();
            update_ongkir()
        }

        function hapus(id) {
            $.each(cart, function(index, value) {
                if (value['id'] == id) {
                    cart.splice(index, 1);
                }
            });
            // if (cart.length == 1 && cart[0].jumlah < 3) {
            //     cart[0].jumlah = 1;
            // }
            update_ui();
            update_ongkir()
        }

        function kurang(id) {
            $.each(cart, function(index, value) {
                if (value['id'] == id) {
                    value['jumlah'] -= 1;
                    if (value['jumlah'] == 0) {
                        cart.splice(index, 1);
                    }
                }
            });
            update_ui();
            update_ongkir()
        }

        function update_ongkir() {
            var city_id = $('#kota').val();
            if (city_id != null) {
                fetch_ongkir(city_id);
            }
        }

        $('#provinsi').change(function() {
            fetch_kota();
            $('#kota').empty();
            $('#kecamatan').empty(); //kecamatan
            fetch_kecamatan(); // kecamatan
            check_button();
        });

        $('#kota').change(function() {
            fetch_kecamatan(); //kecamatan
            $('#kecamatan').empty() //kecamatan
            var city_id = $(this).val();
            fetch_ongkir(city_id);
            check_button();
        });

        //kecamatan
        $('#kecamatan').change(function() {
            // fetch_harga(); //kecamatan
            check_button();
        });

        $('#kode_pos').change(function() {
            // 		$('#no_kode_pos').empty();
            // 		set_kode_pos();
            console.log('change kode pos');
            check_button();
        });

        function fetch_provinsi() {
            $.ajax({
                url: "<?= base_url('healthybox/fetch_provinsi'); ?>",
                type: "GET",
                dataType: "json",
                // start here loader
                beforeSend: function() {
                    $("#loader_provinsi").show();
                },
                success: function(result) {
                    console.log(result);
                    $.each(result, function(index, item) {
                        $('#provinsi').append('<option value="' + item.province_id + '">' + item.province + '</option>');
                    });

                },
                complete: function(data) {
                    $("#loader_provinsi").hide();
                },
                // end here loader
                error: function(e) {
                    console.log(e);
                }
            })
        }

        function fetch_kota() {
            var province_id = $('#provinsi').val();
            $.ajax({
                url: "<?= base_url('healthybox/fetch_kota'); ?>",
                type: "POST",
                dataType: "json",
                data: {
                    'province_id': province_id
                },
                beforeSend: function() {
                    // Show image container
                    $("#loader_kota").show();
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
                                // fetch_harga();
                                fetch_kecamatan(); //kecamatan
                            }
                        }
                    });
                },
                complete: function(data) {
                    // Hide image container
                    $("#loader_kota").hide();
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }

        function fetch_kecamatan() {
            var city_id = $('#kota').val();
            console.log(city_id);
            dataLokasi = {
                'city_id': city_id,
            };
            $.ajax({
                url: "<?= base_url('healthybox/fetch_kecamatan'); ?>",
                type: "POST",
                dataType: "json",
                data: dataLokasi,
                beforeSend: function() {
                    // Show image container
                    $("#loader_kecamatan").show();
                },
                success: function(result) {
                    console.log(result);
                    $('#kecamatan').append('<option value="">-Pilih Kecamatan-</option>');
                    $.each(result, function(index, item) {
                        // if(item.city_id == city_id){	
                        $('#kecamatan').append('<option value="' + item.subdistrict_id + '">' + item.subdistrict_name + '</option>');
                        if (index == 0) {
                            console.log("nol");
                        }
                        // }
                    });
                },
                complete: function(data) {
                    // Hide image container
                    $("#loader_kecamatan").hide();
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }

        function fetch_ongkir(city_id) {
            console.log(city_id);
            dataLokasi = {
                'city_id': city_id,
            };
            $.ajax({
                url: "<?= base_url('healthybox/fetch_ongkir'); ?>",
                type: "POST",
                dataType: "json",
                data: dataLokasi,
                success: function(result) {
                    console.log(result);
                    if (jumlah_item <= 8) {
                        ongkir = parseInt(result.medium);
                    } else if (jumlah_item >= 9 && jumlah_item < 10) {
                        ongkir = parseInt(result.large);
                    } else if (jumlah_item >= 10 && jumlah_item < 16) {
                        ongkir = parseInt(2 * result.medium);
                    } else if (jumlah_item >= 16 && jumlah_item < 19) {
                        ongkir = parseInt(2 * result.large);
                    } else if (jumlah_item >= 20) {
                        kelipatan = Math.ceil((jumlah_item + 1) / 10);
                        ongkir = parseInt(kelipatan * result.large);
                    }
                    update_ui();
                    console.log(ongkir);
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    </script>
</body>

</html>