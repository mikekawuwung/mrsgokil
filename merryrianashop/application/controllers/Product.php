<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Product extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('product_model');
	}

    public function index()
    {
        // $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        // $name = str_replace("-", ' ', $name);
        // $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
        // $email = isset($_GET['Email']) ? $_GET['Email'] : '';
        // $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
        
        // if($aff == 'ads' || $aff == 'LP') {
        //     $aff = 'merryrianashop';
        // }

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
        
        if(isset($_GET['Name']) || isset($_GET['Phone']) || isset($_GET['Email']) || isset($_GET['Aff'])) {
            $name = isset($_GET['Name']) ? $_GET['Name'] : '';
            $name = str_replace("-", ' ', $name);
            $phone = isset($_GET['Phone']) ? '+' . $_GET['Phone'] : '';
            $email = isset($_GET['Email']) ? $_GET['Email'] : '';
            $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
            
            if($aff == 'ads' || $aff == 'LP') {
                $aff = 'merryrianashop';
            }

            $user = array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'aff' => $aff,
            );

            $this->session->set_userdata('user', serialize($user));
            
        }
        
		$data['products'] = $this->product_model->findAll();
		$data['products_uptodate'] = $this->product_model->findUptoDate();
		$data['products_populer'] = $this->product_model->findPopuler();
        
        
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home', $data);
    }

    public function detail() {
        $id = $_GET['id'];
        if(isset($_GET['Name']) || isset($_GET['Phone']) || isset($_GET['Email']) || isset($_GET['Aff'])) {
            $name = isset($_GET['Name']) ? $_GET['Name'] : '';
            $name = str_replace("-", ' ', $name);
            $phone = isset($_GET['Phone']) ? '+' .  $_GET['Phone'] : '';
            $email = isset($_GET['Email']) ? $_GET['Email'] : '';
            $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
            
            if($aff == 'ads' || $aff == 'LP') {
                $aff = 'merryrianashop';
            }

            $user = array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'aff' => $aff,
            );

            $this->session->set_userdata('user', serialize($user));
        }
        
        $data['product'] = $this->product_model->find($id);
        $data['jumlah'] = $this->jumlah();

        $merch_id = $data['product']->merch_id;

        $ch = curl_init();

        $merchandiseData = array(
			'id' => $merch_id,
		);

        $postData = json_encode($merchandiseData);
        
	
        curl_setopt_array($ch, array(
            // CURLOPT_PORT => "10101", // start here jne
            CURLOPT_URL => "https://m1salesforce.com/api/mrshop/marketing_tools/", // end here jne
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: application/json"
            ),
        ));

        $result = curl_exec($ch);
        $err = curl_error($ch);

        $result_encode = json_decode($result);

        $data['photos'] = $result_encode->photos;
        $data['videos'] = $result_encode->videos;
        $data['merchandise'] = $result_encode->merchandise;

        $this->load->view('content_product_details', $data);
    }

    private function jumlah() {
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
            return count($items);
        } else {
            return 0;
        }
    }

}