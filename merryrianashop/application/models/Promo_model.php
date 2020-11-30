<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Promo_model extends CI_Model
{

    function findAll()
    {
        return $this->db->get('promo')->result();
    }

    function find($id)
    {
        return $this->db->where('id', $id)->get('promo')->row();
    }

}