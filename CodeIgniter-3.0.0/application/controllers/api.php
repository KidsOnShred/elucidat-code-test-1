<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class API extends CI_Controller {

	/**
	 * API v1 Controller
	 * Gets our data and returns in JSON format.
	 * @return	null
	 * @todo The page should implement some form of filter or display choice, and show the data in an interesting way
	 * @todo Documentation is important!
	 * @todo See the view for more instructions
	 */
	public function pages()
	{	
		// load the page model
		$this->load->model('page_model');

		// put the data in a useful for the view
		$page_data = array(
			'pages' => $this->page_model->get_pages()
		);
		
		$input = json_decode( $this->input->raw_input_stream );

		// Get pages with filter
		if ( isset( $input->filter ) && count( $input->filter ) > 0 ) {
			$pages = $this->page_model->get_pages( $input->filter );
		// Get pages withoout filter
		} else {
			$pages = $this->page_model->get_pages();
		}

		// We want to just output our data
		$json = json_encode( $pages );
	
		// Set our outputted content type
		header( 'Content-Type: application/json' );

		// Output our JSON
		echo $json;
		exit;
	}
}
