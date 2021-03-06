<?php

class PeepSoAdminMailQueue
{
	/** 
	 * DIsplays the table for managing the Mail queue.
	 */
	public static function administration()
	{
		if (isset($_GET['action']) && 'process-mailqueue' === $_GET['action']
			&& check_admin_referer('process-mailqueue-nonce')) {
			PeepSoMailQueue::process_mailqueue();

			$aProcessed = get_option('peepso_mailqueue_history');
			$aLastProcessed = end($aProcessed);

			if ($aLastProcessed['processed'] > 0) {
				$iCountProcessed = $aLastProcessed['processed'];
				$fElpasedTime = round($aLastProcessed['elapsed'], 2);

				PeepSoAdmin::get_instance()->add_notice(
					sprintf(__('%1$d %2$s sent in %3$d seconds', 'peepso'),
						$iCountProcessed,
						_n('email', 'emails', $iCountProcessed, 'peepso'),
						$fElpasedTime),
					'note');
			} else {
				PeepSoAdmin::get_instance()->add_notice(__('The Mail Queue is empty.', 'peepso'), 'note');
			}

			wp_redirect(admin_url('admin.php?page=peepso-mailqueue'));
			exit();
		}

		$oPeepSoListTable = new PeepSoMailqueueListTable();
		$oPeepSoListTable->prepare_items();

		echo '<h2><img src="', PeepSo::get_asset('images/logo.png'), '" width="150" />';
		echo ' v', PeepSo::PLUGIN_VERSION, ' ', __('Mail Queue Management', 'peepso'), '</h2>', PHP_EOL;

		echo '<form id="form-mailqueue" method="post">';
		wp_nonce_field('bulk-action', 'mailqueue-nonce');
		$oPeepSoListTable->display();
		echo '</form>';
	}
}