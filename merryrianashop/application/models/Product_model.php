<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Product_model extends CI_Model
{

    function findAll()
    {   
        $this->db->where('display IS NULL');
        $this->db->order_by('merch_name', 'asc');
        $this->db->where('sts', 'aktif');
        return $this->db->get('merchandise')->result();
    }
    
    function findUptoDate()
    {   
        $this->db->order_by('id', 'desc');
        $this->db->limit('4');
        return $this->db->where('sts', 'aktif')->get('merchandise')->result();
    }
    
    function findPopuler()
    {   
        $this->db->where_in('id', array('37', '28', '4', '6'));
        $this->db->order_by('id', 'desc');
        $this->db->limit('4');
        return $this->db->where('sts', 'aktif')->get('merchandise')->result();
    }
    
    function findKategori($kategori)
    {
        if($kategori == 'produk-baru'){
	       $this->db->order_by('id', 'DESC');
	       $this->db->limit(4);
	   }elseif($kategori == 'terlaris'){
	       $this->db->where_in('id', array('19', '37', '4', '43'));
	       $this->db->order_by('merch_name', 'asc');
	   }
        
        return $this->db->where('sts', 'aktif')->get('merchandise')->result();
    }

    function find($id)
    {
        return $this->db->where('id', $id)->get('merchandise')->row();
        // $this->db->select('event_writting.id as id_content, merchandise.id as merch_id, event_writting.product as merchandise, merchandise.price, merchandise.link, merchandise.link_aff, merchandise.img as merch_image, event_writting.text_instagram, event_writting.text_merchandise, event_writting.photo_merchandise, event_writting.video_merchandise, event_writting.link_youtube');
        // $this->db->join('event_writting', 'merchandise.merch_name = event_writting.product', 'left');
        // $this->db->where('merchandise.id', $id);
        // return $this->db->get('merchandise')->row();
    }
}