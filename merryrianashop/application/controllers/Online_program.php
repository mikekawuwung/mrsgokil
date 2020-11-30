<?php
defined('BASEPATH') or exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class Online_program extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('online_program_model');
	}

    public function index()
    {
        $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        $name = str_replace("-", ' ', $name);
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
        
        $data['products'] = $this->online_program_model->findAll();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home_op', $data);
    }

    public function detail() {
        $id = $_GET['id'];
        $name = isset($_GET['Name']) ? $_GET['Name'] : '';
        $name = str_replace("-", ' ', $name);
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
        
        $data['product'] = $this->online_program_model->find($id);
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_program_details', $data);
    }

    private function jumlah() {
        if($this->session->has_userdata('cart_op')) {
            $items = array_values(unserialize($this->session->userdata('cart_op')));
            return count($items);
        } else {
            return 0;
        }
    }
    
    public function post_data_digital_class() {
        
         $post = json_decode(file_get_contents('php://input'), true);
         
         if($post['id'] == '38'){
            //  ICAN
            $result =  $this->db->query("SELECT * FROM online_program_ican WHERE sub_kategori_id= ".$post['id']." ORDER BY FIELD(id, 36, 40, 39, 38, 37, 35)")->result_array();
         }else{
              $result = $this->db->where('sub_kategori_id', $post['id'])->get('online_program_ican')->result_array();
        }
         
         echo json_encode($result);
    }

}