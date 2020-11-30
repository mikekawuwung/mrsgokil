<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Merry Riana Shop</title>
	<!-- plugins:css -->
	<link rel="stylesheet"
		href="<?php echo base_url(); ?>assets/src/assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css">
	<link rel="stylesheet"
		href="<?php echo base_url(); ?>assets/src/assets/vendors/iconfonts/puse-icons-feather/feather.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/src/assets/vendors/css/vendor.bundle.base.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/src/assets/vendors/css/vendor.bundle.addons.css">
	<!-- endinject -->
	<!-- plugin css for this page -->
	<!-- End plugin css for this page -->
	<!-- inject:css -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/src/assets/css/shared/style.css">
	<!-- endinject -->
	<!-- Layout styles -->
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/src/assets/css/demo_2/style.css">
	<!-- End Layout styles -->
	<link rel="shortcut icon" href="<?php echo base_url(); ?>assets/src/assets/images/favicon.png" />
</head>

<body>
	<div class="container-scroller" style="background:#f3f4fa">
		<!-- partial:partials/_horizontal-navbar.html -->
        <nav class="navbar horizontal-layout col-lg-12 col-12 p-0">
      <div class="container d-flex flex-row nav-top ">
      <div class="top-links-container ">
      <p>Selamat Datang Di Merry Riana Shop !</p>
			</div>
			<div class="top-links-container ml-auto">
				<div class="top-links container">
					<div class="top-links-area " style="margin-top: 3px;">
						<ul class="links" style="text-align:right;display:flex; list-style:none;">
							<li class="first pr-3"><a href="https://insight-unlimited.com/index.php/dailydeal/" title="Daily deal" style="color:red;">Daily deal</a></li>
							<li class="pr-3"><a href="https://insight-unlimited.com/index.php/customer/account/" title="Akun Saya">Akun Saya</a></li>
							<li class="pr-3"><a href="https://insight-unlimited.com/index.php/trackorder/index/" title="Lihat Status Order">Lihat Status Order</a></li>
							<li class="pr-3"><a href="https://insight-unlimited.com/index.php/wishlist/" title="Wishlist Saya">Wishlist Saya</a></li>
							<li class=" last pr-3"><a href="https://insight-unlimited.com/index.php/customer/account/login/" title="Masuk">Masuk</a></li>
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
              <img src="<?php echo base_url(); ?>assets/Logo_MRS_PNG-03.png" alt="logo" style="widht:175px; height:130px; margin-top: -40px" /> </a>
            <a class="navbar-brand brand-logo-mini" href="index.html">
              <img src="<?php echo base_url(); ?>assets/Logo_MRS_PNG-03.png" alt="logo" /> </a>
          </div>
          <div class="navbar-menu-wrapper d-flex align-items-center">
            <form action="form-action" class="d-none d-sm-block">
              <div class="input-group search-box">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="mdi mdi mdi-magnify"></i>
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Type to search…">
                <i class="mdi mdi mdi-close search-close"></i>
              </div>
            </form>
            <ul class="navbar-nav ml-auto">

              <li class="nav-item dropdown ml-4">
                <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                  <i class="mdi mdi-cart"></i>
                  <span class="count bg-success">4</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0" aria-labelledby="notificationDropdown">
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
                <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">Hello, Stephen <img class="img-xs rounded-circle ml-3" src="<?php echo base_url(); ?>assets/src/assets/images/faces/face8.jpg" alt="Profile image"> </a>
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
                  <i class="link-icon mdi mdi-airplay"></i>
                  <span class="menu-title">Dashboard</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="pages/samples/widgets.html" class="nav-link">
                  <i class="link-icon mdi mdi-apple-safari"></i>
                  <span class="menu-title">Widgets</span>
                </a>
              </li>
              <li class="nav-item mega-menu">
                <a href="#" class="nav-link">
                  <i class="link-icon mdi mdi-flag-outline"></i>
                  <span class="menu-title">UI Elements</span>
                  <i class="menu-arrow"></i>
                </a>
                <div class="submenu">
                  <div class="col-group-wrapper row">
                    <div class="col-group col-md-4">
                      <div class="row">
                        <div class="col-12">
                          <p class="category-heading">Basic Elements</p>
                        </div>
                        <div class="col-md-6">
                          <ul class="submenu-item">
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/accordions.html">Accordion</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/badges.html">Badges</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/breadcrumbs.html">Breadcrumbs</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/dropdowns.html">Dropdown</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/modals.html">Modals</a>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <ul class="submenu-item">
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/progress.html">Progress bar</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/pagination.html">Pagination</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/tabs.html">Tabs</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/typography.html">Typography</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/tooltips.html">Tooltip</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-group col-md-4">
                      <div class="row">
                        <div class="col-12">
                          <p class="category-heading">Advanced Elements</p>
                        </div>
                        <div class="col-md-6">
                          <ul class="submenu-item">
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/dragula.html">Dragula</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/carousel.html">Carousel</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/clipboard.html">Clipboard</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/context-menu.html">Context Menu</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/loaders.html">Loader</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/slider.html">Slider</a>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-6">
                          <ul class="submenu-item">
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/tour.html">Tour</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/popups.html">Popup</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="pages/ui-features/notifications.html">Notification</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-group col-md-2">
                      <p class="category-heading">Table</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/tables/basic-table.html">Basic Table</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/tables/data-table.html">Data Table</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/tables/js-grid.html">Js-grid</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/tables/sortable-table.html">Sortable Table</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-group col-md-2">
                      <p class="category-heading">Icons</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/icons/flag-icons.html">Flag Icons</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/icons/simple-line-icon.html">Simple Line Icons</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/icons/themify.html">Themify Icons</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item mega-menu">
                <a href="#" class="nav-link">
                  <i class="link-icon mdi mdi-content-copy"></i>
                  <span class="menu-title">Pages</span>
                  <i class="menu-arrow"></i>
                </a>
                <div class="submenu">
                  <div class="col-group-wrapper row">
                    <div class="col-group col-md-3">
                      <p class="category-heading">User Pages</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/login.html">Login</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/login-2.html">Login 2</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/register.html">Register</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/register-2.html">Register 2</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/lock-screen.html">Lockscreen</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-group col-md-3">
                      <p class="category-heading">Error Pages</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/error-400.html">400</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/error-404.html">404</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/error-500.html">500</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/error-505.html">505</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-group col-md-3">
                      <p class="category-heading">E-commerce</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/invoice.html">Invoice</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/pricing-table.html">Pricing Table</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/samples/orders.html">Orders</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item mega-menu">
                <a href="#" class="nav-link">
                  <i class="link-icon mdi mdi-chart-line"></i>
                  <span class="menu-title">Forms</span>
                  <i class="menu-arrow"></i>
                </a>
                <div class="submenu">
                  <div class="col-group-wrapper row">
                    <div class="col-group col-md-3">
                      <p class="category-heading">Basic Elements</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/advanced_elements.html">Advanced Elements</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/validation.html">Validation</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/wizard.html">Wizard</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/text_editor.html">Text Editor</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/forms/code_editor.html">Code Editor</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-group col-md-3">
                      <p class="category-heading">Charts</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/chartjs.html">Chart Js</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/morris.html">Morris</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/flot-chart.html">Flaot</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/google-charts.html">Google Chart</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/sparkline.html">Sparkline</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/c3.html">C3 Chart</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/chartist.html">Chartist</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/charts/justGage.html">JustGage</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-group col-md-3">
                      <p class="category-heading">Maps</p>
                      <ul class="submenu-item">
                        <li class="nav-item">
                          <a class="nav-link" href="pages/maps/mapeal.html">Mapeal</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/maps/vector-map.html">Vector Map</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="pages/maps/google-maps.html">Google Map</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="link-icon mdi mdi-cube-outline"></i>
                  <span class="menu-title ">Apps</span>
                  <i class="menu-arrow "></i>
                </a>
                <div class="submenu ">
                  <ul class="submenu-item ">
                    <li class="nav-item ">
                      <a class="nav-link " href="pages/apps/email.html ">Email</a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link " href="pages/apps/calendar.html ">Calendar</a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link " href="pages/apps/todo.html ">Todo List</a>
                    </li>
                    <li class="nav-item ">
                      <a class="nav-link " href="pages/apps/gallery.html ">Gallery</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <!-- section slider n promotion -->
		<div class="container" style="background:#f3f4fa">
			<div class="row">
				<div class="col-12 col-lg-8 p-4">
					<div id="carouselExampleControls" class="carousel slide mt-1" data-ride="carousel">
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img class="d-block w-100 " src="https://insight-unlimited.com/media/banner/cd-_-merch-avaliable1_1.jpg" alt="First slide" height="400">
							</div>
							<div class="carousel-item">
								<img class="d-block w-100 " src="https://insight-unlimited.com/media/banner/web-820x405_1__1.jpg" alt="Second slide" height="400">
							</div>
							<div class="carousel-item">
								<img class="d-block w-100 " src="https://insight-unlimited.com/media/banner/banner-web-820x405_5.jpg" alt="Third slide" height="400">
							</div>
						</div>
						<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>
        </div>
        
				<div class="col-12 col-lg-4 p-4">

				<div class="card card-statistics mt-1">
						<div class="card-body p-0">
            <img class="d-block w-100 img-fluid" src="https://insight-unlimited.com/media/banner/BANNER-PAKET-TWC-2019-305X130_1_.jpg" alt="First slide">
						</div>
          </div>

					<div class="card card-statistics mt-1">
						<div class="card-body p-0">
            <img class="d-block w-100 img-fluid" src="https://insight-unlimited.com/media/banner/SM-MERCH-VOL-3-305X130.jpg" alt="First slide">
						</div>
          </div>

          <div class="card card-statistics mt-1">
						<div class="card-body p-0">
            <img class="d-block w-100 img-fluid" src="https://insight-unlimited.com/media/banner/SM-MERCH-VOL-3-305X130.jpg" alt="First slide">
						</div>
          </div>

				</div>
			</div>
    </div>
    
    <!-- end section slider n promotion -->
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
        <div class="main-panel container">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-12 grid-margin d-none d-lg-block">
                <div class="intro-banner">
                  <div class="banner-image">
                    <img src="<?php echo base_url(); ?>assets/src/assets/images/dashboard/banner_img.png" alt="banner image">
                  </div>
                  <div class="content-area">
                    <h3 class="mb-0">Welcome back, Stephen!</h3>
                    <p class="mb-0">Need anything more to know more? Feel free to contact us at any point.</p>
                  </div>
                  <a href="#" class="btn btn-light">Subscribe Now</a>
                </div>
              </div>
            </div>
            <div class="row">
			<h1 class="title-text-home-line pb-2 "><span class="title-text-home"><a href="" title="New Release">NEW RELEASE</a></span></h1>
              <div class="col-md-3 grid-margin stretch-card">
                <div class="card card-statistics">
                  <div class="card-body pb-0">
					 <img class="img-fluid" src="<?php echo base_url(); ?>assets/src/assets/images/product_images/primerry-stripes-white.jpeg" height="400">
					 <h4 class="card-title pt-3 pb-3 text-center">Primerry Stripes White<br>Rp.295,000</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
			<h1 class="title-text-home-line pb-2 "><span class="title-text-home"><a href="" title="New Release">RECOMMENDED</a></span></h1>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                <div class="card card-statistics">
                  <div class="card-body pb-0">
                    <p class="text-muted">Total Invoice</p>
                    <div class="d-flex align-items-center">
                      <h4 class="font-weight-semibold">$65,650</h4>
                      <h6 class="text-success font-weight-semibold ml-2">+876</h6>
                    </div>
                    <small class="text-muted">This has been a great update.</small>
                  </div>
                  <canvas class="mt-2" height="40" id="statistics-graph-1"></canvas>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                <div class="card card-statistics">
                  <div class="card-body pb-0">
                    <p class="text-muted">Total expenses</p>
                    <div class="d-flex align-items-center">
                      <h4 class="font-weight-semibold">$65,650</h4>
                      <h6 class="text-danger font-weight-semibold ml-2">-43</h6>
                    </div>
                    <small class="text-muted">view statement</small>
                  </div>
                  <canvas class="mt-2" height="40" id="statistics-graph-3"></canvas>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                <div class="card card-statistics">
                  <div class="card-body pb-0">
                    <p class="text-muted">Unpaid Invoices</p>
                    <div class="d-flex align-items-center">
                      <h4 class="font-weight-semibold">$2,542</h4>
                      <h6 class="text-success font-weight-semibold ml-2">+876</h6>
                    </div>
                    <small class="text-muted">view history</small>
                  </div>
                  <canvas class="mt-2" height="40" id="statistics-graph-2"></canvas>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
                <div class="card card-statistics">
                  <div class="card-body pb-0">
                    <p class="text-muted">Amount Due</p>
                    <div class="d-flex align-items-center">
                      <h4 class="font-weight-semibold">$3450</h4>
                      <h6 class="text-success font-weight-semibold ml-2">+23</h6>
                    </div>
                    <small class="text-muted">65% lower growth</small>
                  </div>
                  <canvas class="mt-2" height="40" id="statistics-graph-4"></canvas>
                </div>
              </div>
            </div>

		</div>
          <!-- content-wrapper ends -->
          <!-- partial:partials/_footer.html -->
          <footer class="footer">
            <div class="container clearfix">
              <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2019 <a href="http://www.bootstrapdash.com/" target="_blank">Bootstrapdash</a>. All rights reserved.</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="mdi mdi-heart text-danger"></i>
              </span>
            </div>
          </footer>
          <!-- partial -->

	</div>
	<!-- main-panel ends -->
	</div>
	<!-- page-body-wrapper ends -->
	</div>
	<!-- container-scroller -->
	<!-- plugins:js -->
	<script src="<?php echo base_url(); ?>assets/src/assets/vendors/js/vendor.bundle.base.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/vendors/js/vendor.bundle.addons.js"></script>
	<!-- endinject -->
	<!-- Plugin js for this page-->
	<!-- End plugin js for this page-->
	<!-- inject:js -->
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/off-canvas.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/hoverable-collapse.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/misc.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/settings.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/todolist.js"></script>
	<!-- endinject -->
	<!-- Custom js for this page-->
	<script src="<?php echo base_url(); ?>assets/src/assets/js/shared/widgets.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/demo_2/dashboard.js"></script>
	<script src="<?php echo base_url(); ?>assets/src/assets/js/demo_2/script.js"></script>
	<!-- End custom js for this page-->
</body>

</html>
