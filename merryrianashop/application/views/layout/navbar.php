<body>
	<div class="container-scroller" style="background:#f3f4fa">
		<!-- partial:partials/_horizontal-navbar.html -->
		<nav class="navbar horizontal-layout col-lg-12 col-12 p-0">
			<div class="container d-flex flex-row nav-top ">
				<div class="top-links-container ml-auto">
					<p>Selamat Datang Di Merry Riana Shop !</p>
				</div>
				<div class="top-links-container">
					<div class="top-links container">
						<div class="top-links-area " style="margin-top: 3px;">
							<ul class="links" style="text-align:right;display:flex; list-style:none;">
								<li class="first pr-3"><a href="https://insight-unlimited.com/index.php/dailydeal/" title="Daily deal"
										style="color:red;">Daily deal</a></li>
								<li class="pr-3"><a href="https://insight-unlimited.com/index.php/customer/account/"
										title="Akun Saya">Akun Saya</a></li>
								<li class="pr-3"><a href="https://insight-unlimited.com/index.php/trackorder/index/"
										title="Lihat Status Order">Lihat Status Order</a></li>
								<li class="pr-3"><a href="https://insight-unlimited.com/index.php/wishlist/"
										title="Wishlist Saya">Wishlist Saya</a></li>
								<li class=" last pr-3"><a href="https://insight-unlimited.com/index.php/customer/account/login/"
										title="Masuk">Masuk</a></li>
							</ul>
						</div>
						<!-- <p class="welcome-msg"><span class="pslogin-welcome-msg">Selamat Datang di INSIGHT UNLIMITED !</span> </p> -->
						<div class="clearer"></div>
					</div>
				</div>

			</div>
			<div class="container d-flex flex-row nav-top">
				<div class="text-center navbar-brand-wrapper d-flex align-items-top">
					<a class="navbar-brand brand-logo" href="index.html">
						<img src="<?php echo base_url(); ?>assets/Logo_MRS_PNG-03.png" alt="logo"
							style="widht:175px; height:130px; margin-top: -50px" /> </a>
					<a class="navbar-brand brand-logo-mini" href="index.html">
						<img src="<?php echo base_url(); ?>assets/Logo_MRS_PNG-03.png" alt="logo" /> </a>
				</div>
				<div class="navbar-menu-wrapper d-flex align-items-center">
        <div class='search-box mb-3'>
					<form action="form-action" class="d-none d-sm-block">
          <input class='form-control' placeholder='Pencarian...' type='text'>
          <button class='btn btn-link search-nav'>
          <i class="mdi mdi mdi-magnify" style="color:black"></i>
          </button>
          </form>
        </div>
					<ul class="navbar-nav ml-auto">

						<li class="nav-item dropdown ml-4">
							<a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#"
								data-toggle="dropdown">
								<i class="mdi mdi-cart"></i>
								<span class="count bg-danger"><?= $jumlah; ?></span>
							</a>
							<div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
								aria-labelledby="notificationDropdown">
								<a class="dropdown-item py-3 border-bottom">
									<p class="mb-0 font-weight-medium float-left">You have 4 new notifications </p>
									<span class="badge badge-pill badge-primary float-right">View all</span>
								</a>
								<a class="dropdown-item preview-item py-3">
									<div class="preview-thumbnail">
										<i class="mdi mdi-alert m-auto text-primary"></i>
									</div>
									<div class="preview-item-content">
										<h6 class="preview-subject font-weight-normal text-dark mb-1">Application Error</h6>
										<p class="font-weight-light small-text mb-0"> Just now </p>
									</div>
								</a>
								<a class="dropdown-item preview-item py-3">
									<div class="preview-thumbnail">
										<i class="mdi mdi-settings m-auto text-primary"></i>
									</div>
									<div class="preview-item-content">
										<h6 class="preview-subject font-weight-normal text-dark mb-1">Settings</h6>
										<p class="font-weight-light small-text mb-0"> Private message </p>
									</div>
								</a>
								<a class="dropdown-item preview-item py-3">
									<div class="preview-thumbnail">
										<i class="mdi mdi-airballoon m-auto text-primary"></i>
									</div>
									<div class="preview-item-content">
										<h6 class="preview-subject font-weight-normal text-dark mb-1">New user registration</h6>
										<p class="font-weight-light small-text mb-0"> 2 days ago </p>
									</div>
								</a>
							</div>
						</li>
						<li class="nav-item dropdown d-none d-xl-inline-block">
							<a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown"
								aria-expanded="false">Hello, Stephen <img class="img-xs rounded-circle ml-3"
									src="<?php echo base_url(); ?>assets/src/assets/images/faces/face8.jpg" alt="Profile image"> </a>
							<div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
								<a class="dropdown-item p-0">
									<div class="d-flex border-bottom">
										<div class="py-3 px-4 d-flex align-items-center justify-content-center">
											<i class="mdi mdi-bookmark-plus-outline mr-0 text-gray"></i>
										</div>
										<div class="py-3 px-4 d-flex align-items-center justify-content-center border-left border-right">
											<i class="mdi mdi-account-outline mr-0 text-gray"></i>
										</div>
										<div class="py-3 px-4 d-flex align-items-center justify-content-center">
											<i class="mdi mdi-alarm-check mr-0 text-gray"></i>
										</div>
									</div>
								</a>
								<a class="dropdown-item mt-2"> Manage Accounts </a>
								<a class="dropdown-item"> Change Password </a>
								<a class="dropdown-item"> Check Inbox </a>
								<a class="dropdown-item"> Sign Out </a>
							</div>
						</li>
					</ul>
					<button class="navbar-toggler align-self-center" type="button" data-toggle="minimize">
						<span class="mdi mdi-menu"></span>
					</button>
				</div>
			</div>
			<div class="nav-bottom">
				<div class="container">
					<ul class="nav page-navigation">
						<li class="nav-item">
							<a href="index.html" class="nav-link">
								<!-- <i class="link-icon mdi mdi-airplay"></i> -->
								<span class="menu-title">Home</span>
							</a>
						</li>
						<li class="nav-item">
							<a href="pages/samples/widgets.html" class="nav-link">
								<!-- <i class="link-icon mdi mdi-apple-safari"></i> -->
								<span class="menu-title">Book</span>
							</a>
						</li>
						<li class="nav-item mega-menu">
							<a href="#" class="nav-link">
								<!-- <i class="link-icon mdi mdi-flag-outline"></i> -->
								<span class="menu-title">Clothing</span>
							</a>
						</li>
						<li class="nav-item mega-menu">
							<a href="#" class="nav-link">
								<!-- <i class="link-icon mdi mdi-flag-outline"></i> -->
								<span class="menu-title">CD/DVD</span>
							</a>
						</li>
						<li class="nav-item mega-menu">
							<a href="#" class="nav-link">
								<!-- <i class="link-icon mdi mdi-flag-outline"></i> -->
								<span class="menu-title">F&B</span>
							</a>
						</li>
						<li class="nav-item mega-menu">
							<a href="#" class="nav-link">
								<!-- <i class="link-icon mdi mdi-flag-outline"></i> -->
								<span class="menu-title">Other Merch</span>
							</a>
						</li>
						<li class="nav-item mega-menu">
							<a href="#" class="nav-link">
								<!-- <i class="link-icon mdi mdi-flag-outline"></i> -->
								<span class="menu-title">Digital Learning</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>