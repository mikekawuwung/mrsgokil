<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Online_program_ya extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('online_program_model_ya');
	}

    public function index()
    {
        redirect('https://merryrianadigitallearning.com/order');
        
        if(isset($_GET['Name']) || isset($_GET['Phone']) || isset($_GET['Email']) || isset($_GET['Anak']) || isset($_GET['Usia']) || isset($_GET['Aff']) || isset($_GET['Ref']) || isset($_GET['Share']) || isset($_GET['Aff_id'])) {
            
            $name = isset($_GET['Name']) ? $_GET['Name'] : '';
            // $name = str_replace("-", ' ', $name);
            $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
            $email = isset($_GET['Email']) ? $_GET['Email'] : '';
            $anak = isset($_GET['Anak']) ? $_GET['Anak'] : '';
            $usia = isset($_GET['Usia']) ? $_GET['Usia'] : '';
            $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
            // ref & share
            $ref = isset($_GET['Ref']) ? $_GET['Ref'] : '';
            $share = isset($_GET['Share']) ? $_GET['Share'] : '';
            $aff_id = isset($_GET['Aff_id']) ? $_GET['Aff_id'] : '';
            
            if($aff == 'ads' || $aff == 'LP') {
                $aff = 'online_program';
            }
    
    
            $user = array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'anak' => $anak,
                'usia' => $usia,
                'aff' => $aff,
                // ref & share
                'ref' => $ref,
                'share' => $share,
                'aff_id' => $aff_id
            );

            $this->session->set_userdata('user', serialize($user)); 
        }
        
        $data['products'] = $this->online_program_model_ya->findAll();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home_op_ya', $data);
    }

    public function detail() {
        
        redirect('https://merryrianadigitallearning.com/order');
        
        $id = $_GET['id'];
        
        if(isset($_GET['Name']) || isset($_GET['Phone']) || isset($_GET['Email']) || isset($_GET['Anak']) || isset($_GET['Usia']) || isset($_GET['Aff']) || isset($_GET['Ref']) || isset($_GET['Share']) || isset($_GET['Aff_id'])) {
            $name = isset($_GET['Name']) ? $_GET['Name'] : '';
            // $name = str_replace("-", ' ', $name);
            $phone = isset($_GET['Phone']) ? $_GET['Phone'] : '';
            $email = isset($_GET['Email']) ? $_GET['Email'] : '';
            $anak = isset($_GET['Anak']) ? $_GET['Anak'] : '';
            $usia = isset($_GET['Usia']) ? $_GET['Usia'] : '';
            $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
            // ref & share
            $ref = isset($_GET['Ref']) ? $_GET['Ref'] : '';
            $share = isset($_GET['Share']) ? $_GET['Share'] : '';
            $aff_id = isset($_GET['Aff_id']) ? $_GET['Aff_id'] : '';
            
            if($aff == 'ads' || $aff == 'LP') {
                $aff = 'online_program';
            }
    
            
            $user = array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'anak' => $anak,
                'usia' => $usia,
                'aff' => $aff,
                // ref & share
                'ref' => $ref,
                'share' => $share,
                'aff_id' => $aff_id
            );
        
            $this->session->set_userdata('user', serialize($user)); 
        }
        
        $data['product'] = $this->online_program_model_ya->find($id);
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_program_details_ya', $data);
    }

    private function jumlah() {
        if($this->session->has_userdata('cart_op')) {
            $items = array_values(unserialize($this->session->userdata('cart_op')));
            return count($items);
        } else {
            return 0;
        }
    }

}