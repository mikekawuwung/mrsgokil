<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Online_program_ican_upgrade extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('online_program_model_ican_upgrade');
	}

    public function index()
    {
        $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        // $name = str_replace("-", ' ', $name);
        $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
        $email = isset($_GET['Email']) ? $_GET['Email'] : '';
        $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
        
        if($aff == 'ads' || $aff == 'LP') {
            $aff = 'online_program';
        }


        $user = array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'aff' => $aff,
        );

        if($this->session->has_userdata('user')) {
            $dataUser = array_values(unserialize($this->session->userdata('user')));
            if(!empty($dataUser['name']) && ($dataUser['name'] == '')) {
                $this->session->set_userdata('user', serialize($user));
            }
        } else {
            $this->session->set_userdata('user', serialize($user));
        }
        
        $data['products'] = $this->online_program_model_ican_upgrade->findAll();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home_op_ican_upgrade', $data);
    }

    public function detail() {
        $id = $_GET['id'];
        $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        // $name = str_replace("-", ' ', $name);
        $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
        $email = isset($_GET['Email']) ? $_GET['Email'] : '';
        $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
        
        if($aff == 'ads' || $aff == 'LP') {
            $aff = 'online_program';
        }

        
        $user = array(
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'aff' => $aff,
        );
        
        if($this->session->has_userdata('user')) {
            $dataUser = array_values(unserialize($this->session->userdata('user')));
            if(!empty($dataUser['name']) && ($dataUser['name'] == '')) {
                $this->session->set_userdata('user', serialize($user));
            }
        } else {
            $this->session->set_userdata('user', serialize($user));
        }
        
        $data['product'] = $this->online_program_model_ican_upgrade->find($id);
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_program_details_ican_upgrade', $data);
    }

    private function jumlah() {
        if($this->session->has_userdata('cart_op_upgrade')) {
            $items = array_values(unserialize($this->session->userdata('cart_op_upgrade')));
            return count($items);
        } else {
            return 0;
        }
    }

}