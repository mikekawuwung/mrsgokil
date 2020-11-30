<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cart extends CI_Controller
{

    public function __construct()
	{
		parent::__construct();
		$this->load->model('product_model');
    }
    
    // start here mcookies
    public function searchForId($id, $array) {
        foreach ($array as $key => $val) {
            if ($val['id'] === $id) {
                return true;
            }
        }
        return false;
    }
    // end here cookies
    
    public function index()
    {
        if($this->session->has_userdata('cart')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart')));
        } else {
            $data['items'] = [];
        }
        
        if($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }
        
        // start here mcookies
        // if($this->session->has_userdata('cart')) {
        //     $items = array_values(unserialize($this->session->userdata('cart'))) != null ? array_values(unserialize($this->session->userdata('cart'))) : [];
        // }
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
        } else {
            $items = [];
        }
        if($items != null || $items != []) {
            $data['mcookies'] = $this->searchForId("46", $items);
        } else {
            $data['mcookies'] = false;
        }
        // end here mcookies
        
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        // $this->load->view('content_product_checkout', $data);
        $this->load->view('content_product_checkout_new', $data);
    }
    
    public function test()
    {
        if($this->session->has_userdata('cart')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart')));
        } else {
            $data['items'] = [];
        }
        
        if($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }
        
        // start here mcookies
        // if($this->session->has_userdata('cart')) {
        //     $items = array_values(unserialize($this->session->userdata('cart'))) != null ? array_values(unserialize($this->session->userdata('cart'))) : [];
        // }
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
        } else {
            $items = [];
        }
        if($items != null || $items != []) {
            $data['mcookies'] = $this->searchForId("46", $items);
        } else {
            $data['mcookies'] = false;
        }
        // end here mcookies
        
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
        $data['totalberat'] = $this->berat();
        $this->load->view('content_product_checkout_new', $data);
    }
    
    public function kode_pos() {
        $json = [];
		$this->load->database();
		if(!empty($this->input->get("q"))){
			$this->db->like('kelurahan', $this->input->get("q"));
            $this->db->or_like('kodepos', $this->input->get("q"));
			$query = $this->db->select('kodepos as id, kelurahan as text')->limit(10)->get("tbl_kodepos");
			$json = $query->result();
		}
        echo json_encode($json);
    }

    public function list_chart()
	{
        if($this->session->has_userdata('cart')) {
            $data['items'] = array_values(unserialize($this->session->userdata('cart')));
        }
        $data['total'] = $this->total();
        $data['jumlah'] = $this->jumlah();
		$this->load->view('content_cart_product', $data);
	}
	
	public function reset() {
        session_destroy();
        redirect(base_url('cart'));
    }

    public function clear() {
        session_destroy();
    }
    
    public function berat() {
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
            $totalberat = 0;
            foreach ($items as $item) {
                $totalberat += $item['berat'] *$item['quantity'];
            }
            return $totalberat;
        } else {
            return 0;
        }
    }

    public function buy($id)
    {
        $product = $this->product_model->find($id);
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $item = array(
            'id' => $product->id,
            'merch_name' => $product->merch_name,
            'img' => $product->img,
            'price' => $product->price,
            'berat' => $product->berat,
            'quantity' => 1,
            'slug' => $product->link_aff,
            'kategori' => $product->kategori, 
            'merch_id' => $product->merch_id,
            'size' => $size // end here size
        );
        if(!$this->session->has_userdata('cart')) {
            $cart = array($item);
            $this->session->set_userdata('cart', serialize($cart));
        } else {
            // $index = $this->exists($id);
            $index = $this->exists($id, $size);
            $cart = array_values(unserialize($this->session->userdata('cart')));
            if($index == -1) {
                array_push($cart, $item);
                $this->session->set_userdata('cart', serialize($cart));
            } else {
                $cart[$index]['quantity']++;
                $this->session->set_userdata('cart', serialize($cart));
            }
        }
        redirect('cart');
    }

    public function remove($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $index = $this->exists($id, $size);
        // $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart')));
        unset($cart[$index]);
        $this->session->set_userdata('cart', serialize($cart));
        redirect('cart');
    }

    public function removeitem($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $index = $this->exists($id, $size);
        // $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart')));
        unset($cart[$index]);
        $this->session->set_userdata('cart', serialize($cart));
        redirect('cart/list_chart');
    }

    private function exists($id, $size)
    {
        $cart = array_values(unserialize($this->session->userdata('cart')));
        for ($i = 0; $i < count($cart); $i ++) {
            if ($cart[$i]['id'] == $id && $cart[$i]['size'] == $size) {
            // if ($cart[$i]['id'] == $id) {
                return $i;
            }
        }
        return -1;
    }

    private function total() {
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
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
        if($this->session->has_userdata('cart')) {
            $items = array_values(unserialize($this->session->userdata('cart')));
            return count($items);
        } else {
            return 0;
        }
    }
    
    public function add_one($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $product = $this->product_model->find($id);
        $item = array(
            'id' => $product->id,
            'merch_name' => $product->merch_name,
            'img' => $product->img,
            'price' => $product->price,
            'berat' => $product->berat,
            'quantity' => 1,
            'slug' => $product->link_aff,
            'size' => $size
        );
        if(!$this->session->has_userdata('cart')) {
            $cart = array($item);
            $this->session->set_userdata('cart', serialize($cart));
        } else {
            $index = $this->exists($id, $size);
            // $index = $this->exists($id);
            $cart = array_values(unserialize($this->session->userdata('cart')));
            if($index == -1) {
                array_push($cart, $item);
                $this->session->set_userdata('cart', serialize($cart));
            } else {
                $cart[$index]['quantity']++;
                $this->session->set_userdata('cart', serialize($cart));
            }
        }
        redirect('cart/list_chart');
    }

    public function remove_one($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $index = $this->exists($id, $size);
        // $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart')));
        if($cart[$index]['quantity'] == 1) {
            unset($cart[$index]);
            $this->session->set_userdata('cart', serialize($cart));
        } else if($cart[$index]['quantity'] > 1) {
            $cart[$index]['quantity']--;
            $this->session->set_userdata('cart', serialize($cart));
        }
        redirect('cart/list_chart');
    }

    public function update() {
        $post = $this->input->post();
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        // var_dump($post);
        $jumlah = $post['jumlah'];
        
        for($i=0; $i<$jumlah; $i++) {
            $cart = array_values(unserialize($this->session->userdata('cart')));
            $item_count = $post['count' . $i];
            $item_size = $post['size' . $i]; // start here size
            $item_size_before = $post['sizeBefore' . $i]; // start here size
            $item_id = $post['id' . $i];
            // $index = $this->exists($item_id);
            $index = $this->exists($item_id, $item_size_before);
            $cart[$index]['quantity'] = $item_count;
            $cart[$index]['size'] = $item_size; // end here size
            $this->session->set_userdata('cart', serialize($cart));
        }
        redirect('cart/list_chart');
    }
    
    // start here qty
    public function add_one_red($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $product = $this->product_model->find($id);
        $item = array(
            'id' => $product->id,
            'merch_name' => $product->merch_name,
            'img' => $product->img,
            'price' => $product->price,
            'berat' => $product->berat,
            'quantity' => 1,
            'slug' => $product->link_aff,
            'size' => $size
        );
        if(!$this->session->has_userdata('cart')) {
            $cart = array($item);
            $this->session->set_userdata('cart', serialize($cart));
        } else {
            // $index = $this->exists($id);
            $index = $this->exists($id, $size);
            $cart = array_values(unserialize($this->session->userdata('cart')));
            if($index == -1) {
                array_push($cart, $item);
                $this->session->set_userdata('cart', serialize($cart));
            } else {
                $cart[$index]['quantity']++;
                $this->session->set_userdata('cart', serialize($cart));
            }
        }
        redirect('cart');
    }

    public function remove_one_red($id)
    {
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        $index = $this->exists($id, $size);
        // $index = $this->exists($id);
        $cart = array_values(unserialize($this->session->userdata('cart')));
        if($cart[$index]['quantity'] == 1) {
            unset($cart[$index]);
            $this->session->set_userdata('cart', serialize($cart));
        } else if($cart[$index]['quantity'] > 1) {
            $cart[$index]['quantity']--;
            $this->session->set_userdata('cart', serialize($cart));
        }
        redirect('cart');
    }

    public function update_red() {
        $post = $this->input->post();
        $size = isset($_GET['Ukuran']) ? $_GET['Ukuran'] : ''; // start here size
        // var_dump($post);
        $jumlah = $post['jumlah'];
        
        for($i=0; $i<$jumlah; $i++) {
            $cart = array_values(unserialize($this->session->userdata('cart')));
            $item_count = $post['count' . $i];
            $item_size = $post['size' . $i]; // start here size
            $item_size_before = $post['sizeBefore' . $i]; // start here size
            $item_id = $post['id' . $i];
            $index = $this->exists($item_id, $item_size_before);
            // $index = $this->exists($item_id);
            $cart[$index]['quantity'] = $item_count;
            $cart[$index]['size'] = $item_size; // end here size
            $this->session->set_userdata('cart', serialize($cart));
        }
        redirect('cart');
    }
    // end here qty
    
    // start here dest code
    public function destination() {
        
        $ch = curl_init();
    
    	curl_setopt_array($ch, array(
			CURLOPT_PORT => "10101",
    		CURLOPT_URL => "http://apiv2.jne.co.id:10101/tracing/api/dest/key/" . $this->input->get("q"),
    		CURLOPT_RETURNTRANSFER => true,
    		CURLOPT_ENCODING => "",
    		CURLOPT_MAXREDIRS => 10,
    		CURLOPT_TIMEOUT => 30,
    		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    		CURLOPT_CUSTOMREQUEST => "POST",
    		CURLOPT_POSTFIELDS => "username=MERRYRIANA&api_key=a8ce2585afb6346262831bc265f4beee", // start here jne
    		CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
    			"content-type: application/x-www-form-urlencoded"
    		),
    	));
    
    	$result = curl_exec($ch);
    	$err = curl_error($ch);
    
    	if ($err) {
			echo "cURL Error #:" . $err;
    	   // echo json_encode(array('error' => 'err'));
		} else {
    	    echo json_encode($result);
    	   // echo json_encode(array('querynya' => $this->input->get("q")));
    	   // echo $result;
    	}
    	curl_close($ch);
    }
    
    public function cost() {

		$berat = $this->input->post('total_berat');
		$destination_code = $this->input->post('destination_code'); // start here jne

		$kg = $berat/1000;
        
        $ch = curl_init();
    
    	curl_setopt_array($ch, array(
			CURLOPT_PORT => "10101",
    		CURLOPT_URL => "http://apiv2.jne.co.id:10101/tracing/api/pricedev",
    		CURLOPT_RETURNTRANSFER => true,
    		CURLOPT_ENCODING => "",
    		CURLOPT_MAXREDIRS => 10,
    		CURLOPT_TIMEOUT => 30,
    		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    		CURLOPT_CUSTOMREQUEST => "POST",
    		CURLOPT_POSTFIELDS => "username=MERRYRIANA&api_key=a8ce2585afb6346262831bc265f4beee&from=CGK10000&thru=" . $destination_code . "&weight=" . $kg, // end here jne
    		CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache",
    			"content-type: application/x-www-form-urlencoded"
    		),
    	));
    
    	$result = curl_exec($ch);
    	$err = curl_error($ch);
    
    	if ($err) {
			echo "cURL Error #:" . $err;
		} else {
    	    echo json_encode($result);
    	    // echo $result['detail'];
    	}
    	curl_close($ch);
    }
    // end here dest code
}