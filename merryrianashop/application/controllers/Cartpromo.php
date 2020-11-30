<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cartpromo extends CI_Controller
{

    public function __construct()
	{
		parent::__construct();
		$this->load->model('promo_model');
    }
    
    public function index()
    {
        if($this->session->has_userdata('cart_promo')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_promo')));
        } else {
            $data['items'] = [];
        }
        
        if($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }
        
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        // $data['totalberat'] = $this->berat();
        $this->load->view('content_promo_checkout', $data);
    }
    
    public function set_user() {
        
    }

    public function list_chart()
	{
        if($this->session->has_userdata('cart_promo')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart_promo')));
        }
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
		$this->load->view('content_cart_promo', $data);
	}

    public function clear() {
        session_destroy();
    }
    
    // public function berat() {
    //     if($this->session->has_userdata('cart')) {
    //         $items = array_values(unserialize($this->session->userdata('cart')));
    //         $totalberat = 0;
    //         foreach ($items as $item) {
    //             $totalberat += $item['berat'] *$item['quantity'];
    //         }
    //         return $totalberat;
    //     } else {
    //         return 0;
    //     }
    // }

    public function buy($id)
    {
        $promo = $this->promo_model->find($id);
        $item = array(
            'id' => $promo->id,
            'promo_name' => $promo->promo_name,
            'img' => $promo->img,
            'price' => $promo->price,
            'quantity' => 1,
            'slug' => $promo->link_aff
        );
        if(!$this->session->has_userdata('cart_promo')) {
            $cart_promo = array($item);
            $this->session->set_userdata('cart_promo', serialize($cart_promo));
        } else {
            $index = $this->exists($id);
            $cart_promo = array_values(unserialize($this->session->userdata('cart_promo')));
            if($index == -1) {
                array_push($cart_promo, $item);
                $this->session->set_userdata('cart_promo', serialize($cart_promo));
            } else {
                $cart_promo[$index]['quantity']++;
                $this->session->set_userdata('cart_promo', serialize($cart_promo));
            }
        }
        redirect('cartpromo');
    }

    public function remove($id)
    {
        $index = $this->exists($id);
        $cart_promo = array_values(unserialize($this->session->userdata('cart_promo')));
        unset($cart_promo[$index]);
        $this->session->set_userdata('cart_promo', serialize($cart_promo));
        redirect('cartpromo');
    }

    public function removeitem($id)
    {
        $index = $this->exists($id);
        $cart_promo = array_values(unserialize($this->session->userdata('cart_promo')));
        unset($cart_promo[$index]);
        $this->session->set_userdata('cart_promo', serialize($cart_promo));
        redirect('cartpromo/list_chart');
    }

    private function exists($id)
    {
        $cart_promo = array_values(unserialize($this->session->userdata('cart_promo')));
        for ($i = 0; $i < count($cart_promo); $i ++) {
            if ($cart_promo[$i]['id'] == $id) {
                return $i;
            }
        }
        return -1;
    }

    private function total() {
        if($this->session->has_userdata('cart_promo')) {
            $items = array_values(unserialize($this->session->userdata('cart_promo')));
            $s = 0;
            foreach ($items as $item) {
                $s += $item['price'] * $item['quantity'];
            }
            return $s;
        } else {
            return 0;
        }
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