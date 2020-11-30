<?php
class Cart extends CI_Model {
 public function __construct() {
        parent::__construct();
		$this->load->helper('array');
		$this->load->helper('url');
		$this->load->database('default');
    }
    
	function get_cart($id = ""){
	   
	   $data = array();
	   if(!empty($id)){
	   $this->db->where('id',$id);
	   }
       $query = $this->db->get('product');
       $res   = $query->result();        
       return $res;
		
    }
    
    function get_cart_kategori($kategori){
	   
	   $data = array();
	   
	   if($kategori == 'produk-baru'){
	       $this->db->order_by('id', 'DESC');
	       $this->db->limit(4);
	   }elseif($kategori == 'terlaris'){
	       $this->db->where_in('id', array('43', '37', '4', '5'));
	   }
       $query = $this->db->get('product');
       $res   = $query->result();        
       return $res;
		
    }
}
?>