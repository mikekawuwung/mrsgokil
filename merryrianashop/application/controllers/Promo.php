<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Promo extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('promo_model');
	}

    public function index()
    {
        // $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        // $name = str_replace("-", ' ', $name);
        // $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
        // $email = isset($_GET['Email']) ? $_GET['Email'] : '';
        // $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';

        // $user = array(
        //     'name' => $name,
        //     'email' => $email,
        //     'phone' => $phone,
        //     'aff' => $aff,
        // );

        // if($this->session->has_userdata('user')) {
        //     $dataUser = array_values(unserialize($this->session->userdata('user')));
        //     if(!empty($dataUser['name']) && ($dataUser['name'] == '')) {
        //         $this->session->set_userdata('user', serialize($user));
        //     }
        // } else {
        //     $this->session->set_userdata('user', serialize($user));
        // }

        $data['promos'] = $this->promo_model->findAll();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home_promo', $data);
    }

    public function detail() {
        $id = $_GET['id'];
        // $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        // $name = str_replace("-", ' ', $name);
        // $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
        // $email = isset($_GET['Email']) ? $_GET['Email'] : '';
        // $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
        
        // $user = array(
        //     'name' => $name,
        //     'email' => $email,
        //     'phone' => $phone,
        //     'aff' => $aff,
        // );
        
        // if($this->session->has_userdata('user')) {
        //     $dataUser = array_values(unserialize($this->session->userdata('user')));
        //     if(!empty($dataUser['name']) && ($dataUser['name'] == '')) {
        //         $this->session->set_userdata('user', serialize($user));
        //     }
        // } else {
        //     $this->session->set_userdata('user', serialize($user));
        // }
        
        $data['promo'] = $this->promo_model->find($id);
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_promo_details', $data);
    }

    private function jumlah() {
        if($this->session->has_userdata('cart_promo')) {
            $items = array_values(unserialize($this->session->userdata('cart_promo')));
            return count($items);
        } else {
            return 0;
        }
    }

}