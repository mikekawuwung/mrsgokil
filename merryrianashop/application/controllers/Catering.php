<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Catering extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
	}

    public function index()
    {
        date_default_timezone_set('Asia/Jakarta');
        if(isset($_GET['Name']) || isset($_GET['Phone']) || isset($_GET['Email']) || isset($_GET['Ref']) || isset($_GET['Share']) || isset($_GET['Aff_id'])) {
            $name = isset($_GET['Name']) ? $_GET['Name'] : '';
            $name = str_replace("-", ' ', $name);
            $phone = isset($_GET['Phone']) ? substr($_GET['Phone'], 3) : '';
            $email = isset($_GET['Email']) ? $_GET['Email'] : '';
            $aff = isset($_GET['Aff']) ? $_GET['Aff'] : '';
            $ref = isset($_GET['Ref']) ? $_GET['Ref'] : '';
            $share = isset($_GET['Share']) ? $_GET['Share'] : '';
            $aff_id = isset($_GET['Aff_id']) ? $_GET['Aff_id'] : '';
        
            // if($aff == 'ads' || $aff == 'LP') {
            //     $aff = 'merryrianashop';
            // }

            $user = array(
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'aff' => $aff,
                'ref' => $ref,
                'share' => $share,
                'aff_id' => $aff_id
            );
            
            $this->session->set_userdata('user', serialize($user)); 
        }

        // if($this->session->has_userdata('user')) {
        //     $dataUser = array_values(unserialize($this->session->userdata('user')));
        //     if(!empty($dataUser['name']) && ($dataUser['name'] == '')) {
        //         $this->session->set_userdata('user', serialize($user));
        //     }
        // } else {
        //     $this->session->set_userdata('user', serialize($user));
        // }
        
        if($this->session->has_userdata('user')) {
            $data['user'] = unserialize($this->session->userdata('user'));
        } else {
            $data['user'] = [];
        }
        
        $data['products'] = array(
            array(
                'id' => 165,
                'nama' => 'Protein Booster',
                'id_produk' => 165,
                'nama_produk' => 'Healthy Box M Kitchen PROTEIN BOOSTER',
                'deskripsi' => 'Stir Fry Chili Egg Tempe + Brown Rice + Mix Vegetable',
                'harga' => 35000,
                'kalori' => '456 kcal',
                'berat' => 300,
                'gambar' => 'protein-booster.jpeg'
            ),
            array(
                'id' => 166,
                'nama' => 'Low Fat Salted Egg',
                'id_produk' => 166,
                'nama_produk' => 'Healthy Box M Kitchen LOW FAT SALTED EGG',
                'deskripsi' => 'Chicken Salted Egg + Brown Rice + Mix Vegetable',
                'harga' => 45000,
                'kalori' => '475 kcal',
                'berat' => 300,
                'gambar' => 'low-fat-salted-egg.jpeg'
            ),
            array(
                'id' => 167,
                'nama' => 'Diet Bolognese',
                'id_produk' => 167,
                'nama_produk' => 'Healthy Box M Kitchen DIET BOLOGNESE',
                'deskripsi' => 'Chicken Bolognese with Spaghetti + Broccoli',
                'harga' => 45000,
                'kalori' => '436 kcal',
                'berat' => 300,
                'gambar' => 'diet-bolognese.jpeg'
            ),
            array(
                'id' => 168,
                'nama' => 'Fit Curry',
                'id_produk' => 168,
                'nama_produk' => 'Healthy Box M Kitchen FIT CURRY',
                'deskripsi' => 'Japanese Chicken Curry + Brown Rice + Mix Vegetable',
                'harga' => 45000,
                'kalori' => '451 kcal',
                'berat' => 300,
                'gambar' => 'fit-curry.jpeg'
            ),
            array(
                'id' => 169,
                'nama' => 'Healthy Pindasaus',
                'id_produk' => 169,
                'nama_produk' => 'Healthy Box M Kitchen HEALTHY PINDASAUS',
                'deskripsi' => 'Chicken Pindasaus + Brown Rice + Brocolli',
                'harga' => 45000,
                'kalori' => '439 kcal',
                'berat' => 300,
                'gambar' => 'healthy-pindasaus.jpeg'
            ),
            array(
                'id' => 170,
                'nama' => 'Skinny Korean Bulgogi',
                'id_produk' => 170,
                'nama_produk' => 'Healthy Box M Kitchen SKINNY KOREAN BULGOGI',
                'deskripsi' => 'Korean Beef Bulgogi + Brown Rice + Brocolli',
                'harga' => 55000,
                'kalori' => '453 kcal',
                'berat' => 300,
                'gambar' => 'skinny-korean-bulgogi.jpeg'
            ),
            array(
                'id' => 171,
                'nama' => 'Lean Beef Bellpepper',
                'id_produk' => 171,
                'nama_produk' => 'Healthy Box M Kitchen LEAN BEEF BELLPEPPER',
                'deskripsi' => 'Fry Beef Bellpepper Oyster Sauce + Brown Rice + Mix Vegetable',
                'harga' => 55000,
                'kalori' => '470 kcal',
                'berat' => 300,
                'gambar' => 'lean-beef-bellpepper.jpeg'
            ),
        );

        // var_dump($array_product);
        
        // $data['catering'] = $this->db->get('catering')->result_array();
        // die($data['catering']);
        
        
        // $now = date("2020-10-25 11:00:00");
        // $timeNow = strtotime($now);
        $now = date("Y-m-d H:i:s");
        $this->db->where('cut_off_date >=', $now);
        $this->db->limit(1);
        $data['weekly'] = $this->db->get('catering')->result_array(); 
        
        $now = date("Y-m-d H:i:s");
        $this->db->where('cut_off_date >=', $now);
        $this->db->limit(4);
        $data['monthly'] = $this->db->get('catering')->result_array(); 
        

        $this->load->view('catering', $data);
    }

    public function get_provinsi() {

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => "http://merryriana.com/server_api/provinsi",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache",
            "postman-token: 33e4588d-9679-b896-8abd-62a7ac027f37"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
        echo "cURL Error #:" . $err;
        } else {
        var_dump($response);
        $array = json_decode($response);
        }

        foreach($array as $row) {
            $provinsi = array(
                'province_id' => $row->province_id,
                'province' => $row->province
            );
            $this->db->insert('province', $provinsi);
        }
    }

    public function get_kota($province_id) {

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => "http://merryriana.com/server_api/kota",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\n\t\"province_id\": " . $province_id . "\n}",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache",
            "content-type: application/json",
            "postman-token: 42031917-bddf-c827-05be-f345a41fcc89"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            // var_dump($response);
            $array = json_decode($response);
        }

        foreach($array as $row) {
            $kota = array(
                'city_id' => $row->city_id,
                'province_id' => $row->province_id,
                'province' => $row->province,
                'type' => $row->type,
                'city_name' => $row->city_name,
                'postal_code' => $row->postal_code
            );
            $this->db->insert('city', $kota);
        }
    }
    
    public function get_all_kota() {
        $array_province = $this->db->get('province')->result_array();
        // var_dump($array_kota);

        foreach($array_province as $province) {
            // echo $kota['city_id'] . ' ';
            $this->get_kota($province['province_id']);
        }
    }

    public function get_kecamatan() {
        $this->db->where('city_id >= 500');
        $array_kota = $this->db->get('city')->result_array();
        // var_dump($array_kota);

        foreach($array_kota as $kota) {
            // echo $kota['city_id'] . ' ';
            $this->fetch_kecamatan_from_api($kota['city_id']);
        }
    }

    public function fetch_kecamatan_from_api($city_id) {
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => "http://merryriana.com/server_api/kecamatan",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\n\t\"city_id\": " . $city_id . "\n}",
        CURLOPT_HTTPHEADER => array(
            "cache-control: no-cache",
            "content-type: application/json",
            "postman-token: 7e8f7595-cd78-82dd-8642-8020859a346e"
        ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
        echo "cURL Error #:" . $err;
        } else {
            // var_dump($response);
            $array = json_decode($response);
        }

        foreach($array as $row) {
            $kecamatan = array(
                'subdistrict_id' => $row->subdistrict_id,
                'province_id' => $row->province_id,
                'province' => $row->province,
                'city_id' => $row->city_id,
                'city' => $row->city,
                'type' => $row->type,
                'subdistrict_name' => $row->subdistrict_name
            );
            $this->db->insert('subdistrict', $kecamatan);
        }
    }

    public function fetch_provinsi() {
        $array_provinsi = $this->db->get('provinsi')->result_array();

        echo json_encode($array_provinsi);
    }

    public function fetch_kota() {
        $province_id = $this->input->post('province_id');
        $this->db->where('province_id', $province_id);
        $array_kota = $this->db->get('kota')->result_array();

        echo json_encode($array_kota);
    }

    public function fetch_kecamatan() {
        $city_id = $this->input->post('city_id');
        $this->db->where('city_id', $city_id);
        $array_kecamatan = $this->db->get('kecamatan')->result_array();

        echo json_encode($array_kecamatan);
    }

    public function fetch_ongkir() {
        $city_id = $this->input->post('city_id');
        $this->db->where('city_id', $city_id);
        $kota = $this->db->get('kota')->row_array();

        echo json_encode($kota);
    }
    
    public function list_kota() {
		$this->db->select('*');
		$kota = $this->db->get('list_kota')->result_array();

		echo json_encode($kota);
	}

	public function list_kecamatan() {
		$this->db->select('*');
		$kecamatan = $this->db->get('list_kecamatan')->result_array();

		echo json_encode($kecamatan);
	}

	public function list_kelurahan() {
		$this->db->select('*');
		$kelurahan = $this->db->get('list_kelurahan')->result_array();

		echo json_encode($kelurahan);
	}
}