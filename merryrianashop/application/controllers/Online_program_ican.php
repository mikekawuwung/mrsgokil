<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Online_program_ican extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
		$this->load->model('online_program_model_ican');
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
        
        $data['products'] = $this->online_program_model_ican->findAll();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('home_op_ican', $data);
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
        
        $data['product'] = $this->online_program_model_ican->find($id);
        
        // start here schedule
        // $startSchedule =  date("Y-m-d", strtotime('+2 week', strtotime('saturday this week'))); 
        $today = date("Y-m-d");
        $timeToday = strtotime($today);
        $saturday =  date("Y-m-d", strtotime('saturday this week'));
        $timeSaturday = strtotime($saturday);
        $startSchedule =  date("Y-m-d", strtotime('+2 week', strtotime('saturday this week')));
        if($timeToday < $timeSaturday) {
            $startSchedule =  date("Y-m-d", strtotime('+1 week', strtotime('saturday this week')));
        } else {
            $startSchedule =  date("Y-m-d", strtotime('+2 week', strtotime('saturday this week')));
        }
        $this->db->where('program_date >=', $startSchedule);
        $this->db->limit($data['product']->jumlah_modul);
        $data['schedules'] = $this->db->get('program_schedule')->result_array();
        foreach($data['schedules'] as $key => $schedule) {
            $data['schedules'][$key]['program_date'] = $this->tanggal_indo($schedule['program_date']);
        }
        // end here schedule
        
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_program_details_ican', $data);
    }
    
    public function tanggal_indo($tanggal)
    {
        $bulan = array (1 =>   'Januari',
                    'Februari',
                    'Maret',
                    'April',
                    'Mei',
                    'Juni',
                    'Juli',
                    'Agustus',
                    'September',
                    'Oktober',
                    'November',
                    'Desember'
                );
        $split = explode('-', $tanggal);
        return $split[2] . ' ' . $bulan[ (int)$split[1] ] . ' ' . $split[0];
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