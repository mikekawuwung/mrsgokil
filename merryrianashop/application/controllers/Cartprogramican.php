<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cartprogramican extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('online_program_model_ican');
    }

    public function ori()
    {
        if ($this->session->has_userdata('cart_op')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
        } else {
            $data['items'] = [];
        }

        if ($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }

        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        // $this->load->view('content_program_checkout', $data);
        $this->load->view('content_program_checkout_new_ican_dinamis', $data);
    }
    
    public function testing()
    {
        if ($this->session->has_userdata('cart_op')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
        } else {
            $data['items'] = [];
        }

        if ($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }

        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        // $this->load->view('content_program_checkout', $data);
        $this->load->view('content_program_checkout_new_ican_dinamis_testing', $data);
    }
    
    public function index()
    {
        redirect('https://merryrianadigitallearning.com/order');
        
        if ($this->session->has_userdata('cart_op')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
        } else {
            $data['items'] = [];
        }

        if ($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }

        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        // $this->load->view('content_program_checkout', $data);
        $this->load->view('content_program_checkout_new_ican_dinamis_testing_2', $data);
    }

    public function test()
    {
        if ($this->session->has_userdata('cart_op')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
        } else {
            $data['items'] = [];
        }

        if ($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }

        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        $this->load->view('content_program_checkout_new_ican', $data);
    }

    // public function ican()
    // {
    //     if ($this->session->has_userdata('cart_op')) {
    //         $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
    //     } else {
    //         $data['items'] = [];
    //     }

    //     if ($this->session->has_userdata('user')) {
    //         $data['user'] = unserialize($this->session->userdata('user'));
    //     } else {
    //         $data['user'] = [];
    //     }

    //     $data['total'] = $this->total();
    //     $data['jumlah'] = $this->jumlah();
    //     $data['totalberat'] = $this->berat();
    //     $this->load->view('content_program_checkout_new_ican', $data);
    // }

    public function kode_pos()
    {
        $json = [];
        $this->load->database();
        if (!empty($this->input->get("q"))) {
            $this->db->like('kelurahan', $this->input->get("q"));
            $query = $this->db->select('kodepos as id, kelurahan as text')->limit(10)->get("tbl_kodepos");
            $json = $query->result();
        }
        echo json_encode($json);
    }

    public function list_chart()
    {
        if ($this->session->has_userdata('cart_op')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_op')));
        }
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $this->load->view('content_cart_program_ican', $data);
    }

    public function reset()
    {
        session_destroy();
        redirect(base_url('cartprogramican'));
    }

    public function clear()
    {
        session_destroy();
    }

    public function berat()
    {
        if ($this->session->has_userdata('cart_op')) {
            $items = array_values(unserialize($this->session->userdata('cart_op')));
            $totalberat = 0;
            foreach ($items as $item) {
                $totalberat += $item['berat'] * $item['quantity'];
            }
            return $totalberat;
        } else {
            return 0;
        }
    }

    public function buy($id)
    {
        $product = $this->online_program_model_ican->find($id);
        
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
        $this->db->limit($product->jumlah_modul);
        $schedules = $this->db->get('program_schedule')->result_array();
        // end here schedule
        
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $item = array(
            'id' => $product->id,
            'program_name' => $product->program_name,
            'img' => $product->img,
            'price' => $product->price,
            'berat' => $product->berat,
            'quantity' => 1,
            'slug' => $product->link_aff,
            'kategori' => $product->kategori,
            'size' => $size, // end here size
            'schedules' => $schedules, // start here schedule
            // sub kategori id & product id
            'sub_kategori_id' => $product->sub_kategori_id,
            'product_id' => $product->product_id
        );
        if (!$this->session->has_userdata('cart_op')) {
            $cart = array($item);
            $this->session->set_userdata('cart_op', serialize($cart));
        } else {
            $index = $this->exists($id);
            $cart = array_values(unserialize($this->session->userdata('cart_op')));
            if ($index == -1) {
                array_push($cart, $item);
                $this->session->set_userdata('cart_op', serialize($cart));
            } else {
                $cart[$index]['quantity']++;
                $this->session->set_userdata('cart_op', serialize($cart));
            }
        }

        // if ($id == '35') {
        //     redirect('cartprogram/ican');
        // } else if ($id == '36') {
        //     redirect('cartprogram/ican');
        // } else {
        // }


            redirect('cartprogramican');
    }

    public function remove($id)
    {
        $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart_op')));
        unset($cart[$index]);
        $this->session->set_userdata('cart_op', serialize($cart));
        redirect('cartprogramican');
    }

    public function removeitem($id)
    {
        $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart_op')));
        unset($cart[$index]);
        $this->session->set_userdata('cart_op', serialize($cart));
        redirect('cartprogramican/list_chart');
    }

    private function exists($id)
    {
        $cart = array_values(unserialize($this->session->userdata('cart_op')));
        for ($i = 0; $i < count($cart); $i++) {
            if ($cart[$i]['id'] == $id) {
                return $i;
            }
        }
        return -1;
    }

    private function total()
    {
        if ($this->session->has_userdata('cart_op')) {
            $items = array_values(unserialize($this->session->userdata('cart_op')));
            $s = 0;
            foreach ($items as $item) {
                $s += $item['price'] * $item['quantity'];
            }
            return $s;
        } else {
            return 0;
        }
    }

    private function jumlah()
    {
        $counter = 0;
        if ($this->session->has_userdata('cart_op')) {
            $items = array_values(unserialize($this->session->userdata('cart_op')));
            foreach($items as $item) {
                $counter += $item['quantity'];
            }
            return $counter;
        } else {
            return $counter;
        }
    }

    public function add_one($id)
    {
        $product = $this->online_program_model_ican->find($id);
        
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
        $this->db->limit($product->jumlah_modul);
        $schedules = $this->db->get('program_schedule')->result_array();
        // end here schedule
        
        $item = array(
            'id' => $product->id,
            'program_name' => $product->program_name,
            'img' => $product->img,
            'price' => $product->price,
            'berat' => $product->berat,
            'quantity' => 1,
            'slug' => $product->link_aff,
            'kategori' => $product->kategori,
            // 'size' => $size // end here size
            'schedules' => $schedules, // start here schedule
            // sub kategori id & product id
            'sub_kategori_id' => $product->sub_kategori_id,
            'product_id' => $product->product_id
        );
        if (!$this->session->has_userdata('cart_op')) {
            $cart = array($item);
            $this->session->set_userdata('cart_op', serialize($cart));
        } else {
            $index = $this->exists($id);
            $cart = array_values(unserialize($this->session->userdata('cart_op')));
            if ($index == -1) {
                array_push($cart, $item);
                $this->session->set_userdata('cart_op', serialize($cart));
            } else {
                $cart[$index]['quantity']++;
                $this->session->set_userdata('cart_op', serialize($cart));
            }
        }
        redirect('cartprogramican');
    }

    public function remove_one($id)
    {
        $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart_op')));
        if ($cart[$index]['quantity'] == 1) {
            unset($cart[$index]);
            $this->session->set_userdata('cart_op', serialize($cart));
        } else if ($cart[$index]['quantity'] > 1) {
            $cart[$index]['quantity']--;
            $this->session->set_userdata('cart_op', serialize($cart));
        }
        redirect('cartprogramican');
    }

    public function update()
    {
        $post = $this->input->post();
        // var_dump($post);
        $jumlah = $post['jumlah'];

        for ($i = 0; $i < $jumlah; $i++) {
            $cart = array_values(unserialize($this->session->userdata('cart_op')));
            $item_count = $post['count' . $i];
            $item_size = $post['size' . $i]; // start here size
            $item_id = $post['id' . $i];
            $index = $this->exists($item_id);
            $cart[$index]['quantity'] = $item_count;
            $cart[$index]['size'] = $item_size; // end here size
            $this->session->set_userdata('cart_op', serialize($cart));
        }
        redirect('cartprogramican/list_chart');
    }
}
