<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Carts extends CI_Controller {

	 
	 public function __construct() {
        parent::__construct();
		$this->load->helper('array');
		$this->load->helper('url');
    }


	public function index()
	{
		$cart_data = $this->cart->contents();
		$this->load->view('index',array('cart_data' => $cart_data));
	}
}
?>
