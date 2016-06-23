<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends CI_Controller {

	/**
	 * public function index
	 * Gets all our pages for display
	 */
	public function index( )
	{	
		// load the page model
		$this->load->model('page_model');
		// put the data in a useful for the view
		$page_data = array(
			'pages' => $this->page_model->get_pages()
		);
		// and load the view
		$this->load->view('pages_view', $page_data);
	}
}
