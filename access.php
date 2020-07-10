<?php

class Access {
    
    private $btcUrl = "https://blockchain.info/";
    
    public function checkExchange($currency) {
        $exchange = json_decode($this->accessCurl($this->btcUrl."ticker"));
        
        if( array_key_exists($currency, $exchange) )
            return $exchange->{$currency};
        
        return false;
    }
    
    public function convertBTC($amount=0, $currency) {
        if( !$currency && !$amount ) return false;
        
        // $url = $this->btcUrl."tobtc?currency={$currency}&value={$amount}";
        $sell = $this->checkExchange($currency)->sell;
        $convert = $sell*$amount;

        return ['amount'=>$convert];
    }
    
    private function accessCurl($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $exec = curl_exec($ch);
        curl_close($ch);
        
        return $exec;
    }
}