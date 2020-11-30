<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

class Online_program_model_ya extends CI_Model
{

    function findAll()
    {
        $this->db->where('sts', 'aktif');
        $this->db->order_by('urutan', 'asc');
        return $this->db->get('online_program_ya')->result();
    }

    function find($id)
    {
        return $this->db->where('id', $id)->get('online_program_ya')->row();
    }

}